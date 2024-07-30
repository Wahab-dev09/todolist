import './App.css'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [itemsarray, setitemsarray] = useState(() => {
    const savedItems = JSON.parse(sessionStorage.getItem('items'));
    return savedItems || [];
  });
  const [editingItem, setEditingItem] = useState(null);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(itemsarray);
  const [totalItems, setTotalItems] = useState(0);
  const [completedItems, setCompletedItems] = useState(0);
  const [remainingItems, setRemainingItems] = useState(0);
  const [showsum, setshowsum] = useState(false)
  const formRef = useRef(null);
  const [hidediv, sethidediv] = useState(false);
  const [errors, setErrors] = useState({ item: '', desc: '' });
  const [showModal, setShowModal] = useState(false);
  const [showclearall, setshowclearall] = useState(false)
  const [fade, setfade] = useState(false)
  const [delitem, setdelitem] = useState(null);

  useEffect(() => {
    sessionStorage.setItem('items', JSON.stringify(itemsarray));
  }, [itemsarray]);

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    const newitem = new FormData(e.target);
    const itemobj = Object.fromEntries(newitem.entries());

    let newErrors = { item: '', desc: '' };

    // Check if fields are empty
    if (!itemobj.item) {
      newErrors.item = 'Item is required';
    }
    if (!itemobj.desc) {
      newErrors.desc = 'Description is required';
    }

    if (newErrors.item || newErrors.desc) {
      setErrors(newErrors);
      return;
    }

    if (editingItem) {
      // Update existing item
      const updatedArray = itemsarray.map(item =>
        item.uniqueId === editingItem.uniqueId
          ? { ...item, item: itemobj.item, desc: itemobj.desc }
          : item
      );
      setitemsarray(updatedArray);
      setEditingItem(null);
      sethidediv(false);
    }
    else {
      const Item = {
        uniqueId: generateUniqueId(),
        item: itemobj.item,
        desc: itemobj.desc,
        checked: false
      }
      const newarray = [...itemsarray, Item];
      setitemsarray(newarray);
    }
    e.target.reset(); // Reset form
    setErrors({ item: '', desc: '' }); // Clear error messages
  }
  const handledelete = (itemid) => {
    setfade(true)
    setdelitem(itemid);
    setShowModal(true);
  }
  const confirmDelete = () => {
    const newarray = [...itemsarray];
    const updatedarray = newarray.filter((item => item.uniqueId !== delitem));
    setitemsarray(updatedarray);
    setdelitem(null);
    setfade(false);
    setTimeout(() => {
      setShowModal(false);
    }, 600);
  };

  const handleEdit = (item) => {
    sethidediv(true);
    setEditingItem(item);
  };
  const handlecancel = () => {
    sethidediv(false);
    setEditingItem(null);
    if (formRef.current) {
      formRef.current.reset(); // Reset form
    }
  };
  const handleClearAll = (e) => {
    e.preventDefault();
    setfade(true)
    setshowclearall(true)
  };
  const handleconfirmclearall = () => {
    setitemsarray([]);
    setfade(false)
    setTimeout(() => {
      setshowclearall(false)
    }, 600);
  };
  const handlecancelclearall = () => {
    setfade(false)
    setTimeout(() => {
      setshowclearall(false)
    }, 600);
  };
  const handlecheck = (itemid) => {
    const updatedArray = itemsarray.map(item =>
      item.uniqueId === itemid
        ? { ...item, checked: !item.checked }
        : item
    );
    setitemsarray(updatedArray);
  };
  const handlehidecheck = () => {
    setHideCompleted(prevState => !prevState);
  };
  useEffect(() => {
    setDisplayedItems(hideCompleted
      ? itemsarray.filter(item => !item.checked)
      : itemsarray
    );
  }, [itemsarray, hideCompleted]);

  useEffect(() => {
    const total = itemsarray.length;
    const completed = itemsarray.filter(item => item.checked).length;
    const remaining = total - completed;

    setTotalItems(total);
    setCompletedItems(completed);
    setRemainingItems(remaining);
  }, [itemsarray]);

  useEffect(() => {
    console.log(itemsarray)
  }, [itemsarray])

  const cancelDelete = () => {
    setdelitem(null);
    setfade(false)
    setTimeout(() => {
      setShowModal(false);
    }, 600);
  };


  return (
    <div className="fullscreen">
      {showModal && (
        <div className={`modal-box ${fade ? "modal-fade-in" : "modal-fade-out"}`}>
          <div className={`conf-box ${fade ? "box-popin" : "box-popout"}`}>
            <h1>Delete Task</h1>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="cta-buttons">
              <button onClick={confirmDelete} className='ctad'>Delete</button>
              <button onClick={cancelDelete} className='ctac'>No, wait</button>
            </div>
          </div>
        </div>
      )}
      {showclearall && (
        <div className={`modal-box ${fade ? "modal-fade-in" : "modal-fade-out"}`}>
          <div className={`conf-box ${fade ? "box-popin" : "box-popout"}`}>
            <h1>Clear All ? </h1>
            <p>Are you sure you want to delete all the tasks? This action cannot be undone.</p>
            <div className="cta-buttons">
              <button onClick={handleconfirmclearall} className='ctad'>Clear All</button>
              <button onClick={handlecancelclearall} className='ctac'>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="inner-frame">
        <form ref={formRef} onSubmit={HandleSubmit} className='top'>
          <div className="top-inner">
            <h1>Todo List</h1>
            <div className='fieldbox'>
              <p>Task name :</p>
              <input className={`input-f ${errors.item? 'err':'no-err'}`} type="text" placeholder='Enter todo' name='item' defaultValue={editingItem ? editingItem.item : ''}/>
            </div>
            <div className='fieldbox'>
              <p>Description :</p>
              <textarea className={`textarea-f ${errors.desc? 'err':'no-err'}`} placeholder='Enter description' name='desc' defaultValue={editingItem ? editingItem.desc : ''}></textarea>
            </div>
            <div className="btns">
              <button className='btn1' type='submit' value='submit'>{editingItem ? 'Update' : 'Add'}</button>
              {editingItem && <button className='btn3' type="button" onClick={handlecancel}>Cancel</button>}
              <button className='btn2' onClick={handleClearAll}>Clear All</button>
              <div className={hidediv ? 'hide-hide-div' : 'hide'}>
                <span onClick={handlehidecheck} className={hideCompleted ? 'checked-circle' : 'empty-circlee'}></span>
                <span>Hide completed</span>
              </div>
            </div>
          </div>
        </form>
        <div className='bottom'>
          <div className="bottom-inner">
            <div className='list-heading'>
              <span></span>
              <h2>Task List</h2>
              <button onClick={() => { setshowsum(!showsum) }}><img className='arrow-img' src={import.meta.env.BASE_URL + "/images/arrow.png"} alt="" /></button>
              <div className={`summary-box ${showsum ? "sum-show" : "sum-hide"}`}>
                <div className="summary-inner">
                  <h1>Summary</h1>
                  <div className="total-item"><span className='sum-txt'>Total Items</span><span className='sum-num'>{totalItems}</span></div>
                  <div className="comp-item"><span className='sum-txt'>Completed items</span><span className='sum-num'>{completedItems}</span></div>
                  <div className="rem-item"><span className='sum-txt'>Remaining items</span><span className='sum-num'>{remainingItems}</span></div>
                </div>
              </div>
            </div>
            <div className="items">
              <div className='items-box'>
                {displayedItems.map((iteme) => {
                  return (
                    <div key={iteme.uniqueId} className={`item ${iteme.checked ? "green-bg" : "white-bg"}`}>
                      <div className="item-inner">
                        <div className="item-head">
                          <div className='item-heading-name'>
                            <div>
                              {iteme.checked ?
                                <img onClick={() => handlecheck(iteme.uniqueId)} className='check-svg' src={import.meta.env.BASE_URL + "/images/chek6.png"} alt="" /> :
                                <span onClick={() => handlecheck(iteme.uniqueId)} className='empty-circle'></span>}
                            </div>
                            <h3 className={iteme.checked ? "line" : ""}>{iteme.item}</h3>
                          </div>
                          <div className='ed-del-btns'>
                            <button onClick={() => handleEdit(iteme)}><svg className='svgs' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#686868" ><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" /></svg></button>
                            <button onClick={() => { handledelete(iteme.uniqueId) }}><svg className='svgs' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fd5353"><path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" /></svg></button>
                          </div>
                        </div>
                        <div className={`item-description ${iteme.checked ? "line" : ""}`}>
                          {iteme.desc}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="side-box">
                <div className="summary-boxe">
                  <div className="summary-innere">
                    <h1>Summary</h1>
                    <div className="total-item"><span className='sum-txt'>Total Items</span><span className='sum-num'>{totalItems}</span></div>
                    <div className="comp-item"><span className='sum-txt'>Completed Items</span><span className='sum-num'>{completedItems}</span></div>
                    <div className="rem-item"><span className='sum-txt'>Remaining Items</span><span className='sum-num'>{remainingItems}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

# Todo List App

<p align="center">
  <img src="https://github.com/user-attachments/assets/25b848e4-eae0-4b98-a1c2-f18dc4136ba1" alt="Todo Screenshot 1" width="32%" />
  <img src="link-to-your-image-2" alt="Todo Screenshot 2" width="32%" />
  <img src="link-to-your-image-3" alt="Todo Screenshot 3" width="32%" />
</p>

## Overview

Welcome to the Todo List app! This application is designed to help you manage your tasks efficiently. It allows you to add, edit, and delete tasks, as well as keep track of completed and remaining items. It also features a responsive design and various functionalities to enhance your task management experience.

## Features

- **Add Tasks**: Easily add new tasks with a name and description.
- **Edit Tasks**: Modify existing tasks with updated information.
- **Delete Tasks**: Remove tasks with a confirmation modal to prevent accidental deletions.
- **Clear All Tasks**: Remove all tasks at once with a confirmation modal.
- **Toggle Task Completion**: Mark tasks as completed or pending with a click.
- **Hide Completed Tasks**: Option to hide tasks that are marked as completed.
- **Summary View**: View a summary of total, completed, and remaining tasks.
- **Responsive Design**: The application is fully responsive and works well on different devices.

## Usage

- **Add New Task**: Fill in the task name and description in the form at the top and click "Add" to create a new task.
- **Edit Existing Task**: Click the "Edit" button on a task to modify its details.
- **Delete Task**: Click the "Delete" button on a task to remove it. Confirm the deletion in the modal.
- **Clear All Tasks**: Click "Clear All" to delete all tasks. Confirm the action in the modal.
- **Toggle Completion**: Click the checkbox or circle next to a task to mark it as completed or pending.
- **Hide Completed Tasks**: Click the "Hide completed" checkbox to toggle visibility of completed tasks.
- **View Summary**: Click the arrow button to show or hide the summary of total, completed, and remaining tasks.

## Code Overview

- **State Management**: Uses React hooks (`useState`, `useEffect`, `useRef`) to manage and update the app's state.
- **Form Handling**: Form submission is handled with validation and error messages.
- **Modal Dialogs**: Confirmation dialogs are used for delete and clear-all actions.
- **Responsive Design**: CSS styles are used to ensure the app is responsive and user-friendly.

## Technologies Used

- **React**: For building the user interface and managing state.
- **CSS**: For styling and ensuring a responsive design.
- **Session Storage**: For persisting tasks across page reloads.

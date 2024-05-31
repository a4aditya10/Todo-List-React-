# React To-Do List

This project is a simple To-Do List application built with React. It allows users to add, remove, and mark tasks as complete. The application also provides features for sorting, filtering tasks, and saving the task list to `localStorage` for persistence across sessions.

## Features

- **Add Tasks**: Users can add tasks with a name and due date.
- **Remove Tasks**: Users can delete tasks from the list.
- **Mark as Complete**: Users can mark tasks as complete.
- **Sorting**: Tasks can be sorted by due date, creation date (new to old, old to new).
- **Filtering**: Tasks can be filtered to show all tasks, pending tasks, completed tasks, or tasks due today.
- **Persistence**: Task list is saved to `localStorage` and persists across browser sessions.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/react-todo-list.git
cd react-todo-list
```
2. **Install dependencies:**

```bash
npm install
```
3. **Start the development server:**

```bash
git clone https://github.com/your-username/react-todo-list.git
cd react-todo-list
```

## Usage
1. Adding a Task:

- Enter a task name and select a due date.
- Click the Add button to add the task to the list.

2.Marking a Task as Complete:

- Click the Mark as Complete button next to the task.

3.Removing a Task:

- Click the delete icon next to the task.

4.Filtering Tasks:

- Use the filter buttons to view all tasks, pending tasks, completed tasks, or today's tasks.

5.Sorting Tasks:

- Use the sort dropdown to sort tasks by by date , new to old, or old to new.


# Testing Guidance:
## Unit test:
1. Set up testing envirnment :
   -Install necessary dependencies for testing if not already installed:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```
2.Writing Tests:

 -Create test files in the src directory alongside your components, named with the .test.js suffix.
 An example test file:
 ```js
   // src/components/AddTodo.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';

test('renders AddTodo component', () => {
    render(<AddTodo tasks={[]} setTasks={() => {}} />);
    expect(screen.getByPlaceholderText('Task name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Due date')).toBeInTheDocument();
});

test('validates input fields', () => {
    render(<AddTodo tasks={[]} setTasks={() => {}} />);
    fireEvent.click(screen.getByText('ADD'));
    expect(screen.getByText('Task name is required')).toBeInTheDocument();
    expect(screen.getByText('Due date is required')).toBeInTheDocument();
});

test('adds a new task', () => {
    const setTasksMock = jest.fn();
    render(<AddTodo tasks={[]} setTasks={setTasksMock} />);
    
    fireEvent.change(screen.getByPlaceholderText('Task name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Due date'), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText('ADD'));

    expect(setTasksMock).toHaveBeenCalledWith(expect.any(Function));
});

   ```

## Running tests:
Run Tests:
Use the following command to run the tests:
```bash
npm test
```

## Manual Testing
1. Adding Tasks:
Open the application in your browser.
Try adding tasks with valid and invalid inputs to ensure validation works.
Verify that tasks appear in the list after being added.

2. Marking Tasks as Complete:
Click the Mark as Complete button next to a task and verify that the task is marked as completed.

3. Removing Tasks:
Click the delete icon next to a task and ensure that it is removed from the list.

4. Filtering Tasks:
Use the filter buttons to switch between all tasks, pending tasks, completed tasks, and today's tasks. Verify that the list updates accordingly.

5. Sorting Tasks:
Use the sort dropdown to sort tasks by due date, new to old, or old to new. Verify that the tasks are sorted correctly.


## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Submit a pull request


### License
This project is licensed under the MIT License. See the LICENSE file for more details.

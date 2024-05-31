import '../css/AddTodo.css'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function AddTodo({ tasks, setTasks }) {
    const [minDateTime, setMinDateTime] = useState('');
    const [newTask, setNewTask] = useState({
        taskName: "",
        dueDate: "",
    });
    const [errorMsg, setErrorMsg] = useState({
        taskNameError: "",
        dueDateError: ""
    });
    const [isTouched, setIsTouched] = useState({
        taskName: false,
        dueDate: false
    });

    const produceError = () => {
        setErrorMsg({
            taskNameError: newTask.taskName.trim() === "" ? "Task name is required" : "",
            dueDateError: newTask.dueDate.trim() === "" ? "Due date is required" : ""
        });
    }

    const addNewTask = () => {
        if (newTask.taskName.trim() === "" || newTask.dueDate.trim() === "") {
            setIsTouched({
                taskName: true,
                dueDate: true
            });
            produceError();
        } else {
            const currentTime = new Date();
            setTasks((prevTasks) => [...prevTasks, {
                id: uuidv4() + currentTime,
                taskName: newTask.taskName,
                dueDate: newTask.dueDate,
                isDone: false,
                isTimeOver: false,
                createdAt: new Date()
            }]);
            toast.success("🚀 Task successfully added");
            setNewTask({
                taskName: "",
                dueDate: "",
            });
            setIsTouched({
                taskName: false,
                dueDate: false
            });
            setErrorMsg({
                taskNameError: "",
                dueDateError: ""
            });
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setIsTouched({
            ...isTouched,
            [name]: true
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    }

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day}`;
        setMinDateTime(formattedDateTime);
    }, []);

    return (
        <div className='add-todo-container'>
            <label>
                <span className='placeholder'>Task Name</span>
                <input type='text' placeholder='Task name' name='taskName' value={newTask.taskName} onChange={handleChange} onBlur={handleBlur} />
                {errorMsg.taskNameError && isTouched.taskName && <span className='error'>{errorMsg.taskNameError}</span>}
            </label>

            <label>
                <span className='placeholder'>Due date</span>
                <input type="date" min={minDateTime} placeholder='Due date' name='dueDate' value={newTask.dueDate} onChange={handleChange} onBlur={handleBlur} />
                {errorMsg.dueDateError && isTouched.dueDate && <span className='error'>{errorMsg.dueDateError}</span>}
            </label>

            <button type='button' className='add-btn' onClick={addNewTask}>ADD</button>
        </div>
    )
}

export default AddTodo;

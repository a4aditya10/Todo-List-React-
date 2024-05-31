import '../css/DisplayTask.css'
import React, { useEffect, useState } from 'react'
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import { MdDelete } from "react-icons/md";
import emptyLogo from '../asset/empty_logo.png'
import { toast } from 'react-toastify';

function DisplayTask({ tasks, setTasks }) {
  const [displayTask, setDisplayTask] = useState([]);
  const [filterState, setFilterState] = useState("all");
  const sortingCriteria = localStorage.getItem("sorting_criteria");

  const updateTaskCompleteStatus = (taskId) => {
    setTasks(prevTasks => prevTasks.map((task) => {
      if (taskId === task.id) {
        return { ...task, isDone: true };
      }
      return task;
    }));
    toast.success("Congratulations, you completed a task!");
  };

  const deleteATask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task successfully deleted");
  };

  const clearAllFilter = () => {
    setFilterState("all");
  };

  const pendingTaskFilter = () => {
    setFilterState("pending");
  };

  const completedTaskFilter = () => {
    setFilterState("completed");
  };

  const todayTaskFilter = () => {
    setFilterState("today");
  };

  const sortTaskArray = (sortBy = "dueDate", array = displayTask) => {
    let sortedArray = []
    if (sortBy === "dueDate") {
      sortedArray = [...array].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    else if(sortBy==="newToOld"){
      sortedArray = [...array].sort((a, b) => new Date(b.createdAt)-new Date(a.createdAt));
    }
    else if(sortBy==="oldToNew"){
      sortedArray = [...array].sort((a, b) => new Date(a.createdAt)-new Date(b.createdAt))

    }
    return sortedArray;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      localStorage.setItem("sorting_criteria", selectedValue);
      setFilterState(filterState);
    }
  };

  useEffect(() => {
    let filterTask = tasks;

    switch (filterState) {
      case "pending":
        filterTask = tasks.filter((task) => !task.isDone);
        break;
      case "completed":
        filterTask = tasks.filter((task) => task.isDone);
        break;
      case "today":
        const localDate = new Date().toLocaleDateString();
        const [month, day, year] = localDate.split('/');
        const todayDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        filterTask = tasks.filter((task) => task.dueDate.split("T")[0] === todayDate);
        break;
      case "all":
      default:
        filterTask = tasks;
    }

    const filterSortedTask = sortingCriteria ? sortTaskArray(sortingCriteria, filterTask) : filterTask;
    setDisplayTask(filterSortedTask);
  }, [tasks, filterState, sortingCriteria]);

  useEffect(() => {
    if (sortingCriteria) {
      const sortedArray = sortTaskArray(sortingCriteria, tasks);
      setDisplayTask(sortedArray);
    } else {
      setDisplayTask(tasks);
    }
  }, [sortingCriteria, tasks]);

  return (
    <div className='display-container'>
      <div className='filter-btn-container'>
        <button className={`${filterState === "all" ? "applied-filter-btn" : "filter-btn"}`} onClick={clearAllFilter}>All</button>
        <button className={`${filterState === "pending" ? "applied-filter-btn" : "filter-btn"}`} onClick={pendingTaskFilter}>Pending</button>
        <button className={`${filterState === "completed" ? "applied-filter-btn" : "filter-btn"}`} onClick={completedTaskFilter}>Completed</button>
        <button className={`${filterState === "today" ? "applied-filter-btn" : "filter-btn"}`} onClick={todayTaskFilter}>Today Task</button>
        <label>
          <select className='sorted-criteria-select' defaultValue={sortingCriteria || "DueDate"} onChange={handleSelectChange} >
            <option value="DueDate">Due Date</option>
            <option value="New To Old">New To Old</option>
            <option value="Old To New">Old To New</option>
          </select>
        </label>
      </div>
      {displayTask && displayTask.length > 0 ? (
        <>
          {displayTask.map((task, index) => (
            <div key={task.id} className="task-container">
              {task.isTimeOver && <p className='time-over-cut'></p>}
              <p className='task-name'>{task.taskName}</p>
              <p className='due-date'>{task.dueDate.split("T")[0]}</p>
              <p className='due-time'>{task.dueDate.split("T")[1]}</p>
              <p className='is-done-icon-para'>{task.isDone ? <IoCheckmarkDoneCircle className='completed-icon' /> : <MdPendingActions className='pending-icon' />}</p>
              <button className='mark-complete-btn' disabled={task.isDone || task.isTimeOver} onClick={() => updateTaskCompleteStatus(task.id)}>{task.isDone ? "Completed" : "Mark as Complete"}</button>
              <p><MdDelete className='delete-btn' onClick={() => deleteATask(task.id)} /></p>
            </div>
          ))}
        </>
      ) : (
        <>
          <img src={emptyLogo} alt="No tasks available" />
          <h2 className='empty-heading'>No tasks available</h2>
        </>
      )}
    </div>
  );
}

export default DisplayTask;

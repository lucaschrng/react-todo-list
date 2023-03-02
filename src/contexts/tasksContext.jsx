import {createContext, useState, useEffect} from "react";
import Fuse from 'fuse.js';

const TasksContext = createContext();

const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  let fuse;

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const addImportantTask = (newTask) => {
    setTasks([{...newTask, important: true}, ...tasks]);
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const deleteAll = () => {
    setTasks([]);
  }

  const search = (searchTerm) => {
    // Classic sorting
    // return tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Fuzzy sorting
    return fuse.search(searchTerm).map((result) => result.item);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fuse = new Fuse(tasks, {
      keys: ['title']
    })
  }, [tasks]);

  return (
      <TasksContext.Provider value={{tasks, addTask, addImportantTask, deleteTask, deleteAll, search}}>
        {children}
      </TasksContext.Provider>
  );
};

export {TasksContext, TasksProvider};

import {createContext, useState, useEffect, ReactNode} from "react";
import Fuse from 'fuse.js';
import {Task} from "../types/types";

type TasksContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  addImportantTask: (newTask: Task) => void;
  deleteTask: (taskId: number) => void;
  deleteAll: () => void;
  search: (searchTerm: string) => Task[];
};

type TasksProviderProps = {
  children: ReactNode;
};

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  addImportantTask: () => {},
  deleteTask: () => {},
  deleteAll: () => {},
  search: () => [],
});

const TasksProvider = ({children}: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));
  let fuse: Fuse<Task>;

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const addImportantTask = (newTask: Task) => {
    setTasks([{...newTask, important: true}, ...tasks]);
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== taskId));
  };

  const deleteAll = () => {
    setTasks([]);
  }

  const search = (searchTerm: string) => {
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

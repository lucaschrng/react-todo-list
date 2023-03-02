import { createContext, useState, useEffect } from "react";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksProvider };

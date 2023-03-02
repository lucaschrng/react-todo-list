import {useContext, useState} from "react";
import './App.css'
import { TasksContext } from "./contexts/tasksContext";

function App() {
  const { tasks, addTask, deleteTask } = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState("");

  const handleChange = (e) => {
    setTaskTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), title: taskTitle });
    setTaskTitle("");
  }

  return (
    <div className="App">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={"Task title"} value={taskTitle} onChange={handleChange}/>
        <button type={"submit"}>Add</button>
      </form>
      <ul>
          {tasks.map((task) => (
              <li key={task.id}>
                  {task.title}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
          ))}
      </ul>
    </div>
  )
}

export default App

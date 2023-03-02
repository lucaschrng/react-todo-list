import {useContext, useState} from "react";
import { TasksContext } from "./contexts/tasksContext";

function App() {
  const { tasks, addTask, deleteTask, deleteAll } = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState("");

  const handleChange = (e) => {
    setTaskTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.length <= 50 && taskTitle.length > 0) {
      addTask({id: Date.now(), title: taskTitle});
      setTaskTitle("");
    }
  }

  return (
    <div className="App flex flex-col gap-3 px-2">

      <h1 className={"text-3xl font-bold pt-24"}>Tasks</h1>

      <form onSubmit={handleSubmit}>
        <div className={"flex p-1 bg-white/10 rounded"}>
          <input className={"w-full ml-1 bg-transparent outline-0"} type="text" placeholder={"Task title"} value={taskTitle} onChange={handleChange}/>
          <button type={"submit"} className={"p-1 bg-black/30 text-white/90 font-semibold rounded hover:bg-black/40"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </button>
        </div>
          <p className={(taskTitle.length > 50 ? "text-red-400 ":"text-transparent") + " mt-1 ml-1 transition"}>Task title must be under 50 characters</p>
      </form>

      <ul className={"flex flex-col mt-6"}>
        {tasks.length > 0 ? tasks.map((task) => (
          <li key={task.id} className={"relative flex gap-3 py-2 max-w-full after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[1px] after:bg-white/20"}>
            <button onClick={() => deleteTask(task.id)} className={"min-w-[1.5rem] h-6 flex justify-center items-center border border-white/30 text-transparent hover:bg-white/10 hover:text-white/70 rounded-full"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            </button>
            <span>{task.title}</span>
          </li>
        )) : <li className={"text-center text-white/50"}>No tasks</li>}
      </ul>

      <button onClick={deleteAll} className={"bg-white/20 p-2 rounded font-semibold mt-6"}>Delete all</button>

    </div>
  )
}

export default App

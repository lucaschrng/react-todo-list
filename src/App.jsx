import {useContext, useEffect, useState} from "react";
import {TasksContext} from "./contexts/tasksContext";

function App() {
  const {tasks, addTask, addImportantTask, deleteTask, deleteAll, search} = useContext(TasksContext);
  const [displayedTasks, setDisplayedTasks] = useState(tasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [important, setImportant] = useState(false);

  useEffect(() => {
    setDisplayedTasks(tasks);
  }, [tasks]);

  const handleChange = (e) => {
    setTaskTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.length <= 50 && taskTitle.length > 0) {
      if (important) addImportantTask({id: Date.now(), title: taskTitle});
      else addTask({id: Date.now(), title: taskTitle});
      setTaskTitle("");
      setImportant(false);
    }
  }

  useEffect(() => {
    if (searchTerm === "") setDisplayedTasks(tasks);
    else setDisplayedTasks(search(searchTerm));
  }, [searchTerm])

  return (
      <div className="App flex flex-col gap-3 px-2">

        <h1 className={"text-3xl font-bold pt-24"}>Tasks</h1>

        {/* Search bar */}
        <div className={"flex items-center p-1 border-b-2 border-white/20"}>

          <input className={"w-full ml-1 bg-transparent outline-0"} type="text" placeholder={"Search for a task"}
                 value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <button onClick={() => setSearchTerm("")}
                  className={"p-1 text-white/90 font-semibold rounded hover:bg-white/10"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

        </div>

        {/* Add task */}
        <form onSubmit={handleSubmit}>

          <div className={"flex gap-2 p-1 bg-white/10 rounded"}>

            <input className={"w-full ml-1 bg-transparent outline-0"} type="text" placeholder={"Add task"}
                   value={taskTitle} onChange={handleChange}/>

            <button type={"button"} className={(important ? 'text-red-400' : 'text-white/30') + ' hover:text-red-400 transition'} onClick={() => setImportant(!important)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
            </button>

            <button type={"submit"}
                    className={"p-1 bg-black/30 text-white/90 font-semibold rounded hover:bg-green-500/50 transition"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
            </button>

          </div>

          <p className={(taskTitle.length > 50 ? "text-red-400 " : "text-transparent") + " mt-1 ml-1 transition"}>Task
            title must be under 50 characters</p>

        </form>

        {/* Display tasks */}
        <ul className={"flex flex-col mt-6"}>
          {displayedTasks.length > 0 ? displayedTasks.map((task) => (
              <li key={task.id}
                  className={"relative flex gap-3 py-2 max-w-full after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[1px] after:bg-white/20"}>

                <button onClick={() => deleteTask(task.id)}
                        className={"min-w-[1.5rem] h-6 flex justify-center items-center border border-white/30 text-transparent hover:bg-white/10 hover:text-white/70 rounded-full transition peer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                </button>

                {task.important &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 text-white/20">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>}

                <span className={"peer-hover:line-through"}>{task.title}</span>

              </li>
          )) : <li className={"text-center text-white/50"}>No tasks</li>}
        </ul>

        <button onClick={deleteAll}
                className={"flex justify-center items-center gap-2 bg-white/20 p-2 rounded font-semibold mt-6 hover:bg-red-400/80 transition"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
          </svg>
          Delete all
        </button>

      </div>
  )
}

export default App

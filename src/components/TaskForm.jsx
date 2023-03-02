import {useContext, useState} from "react";
import {TasksContext} from "../contexts/tasksContext.jsx";

const TaskForm = () => {
  const {addTask, addImportantTask} = useContext(TasksContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [important, setImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.length <= 50 && taskTitle.length > 0) {
      if (important) addImportantTask({id: Date.now(), title: taskTitle});
      else addTask({id: Date.now(), title: taskTitle});
      setTaskTitle("");
      setImportant(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className={"flex gap-2"}>

        <input className={"w-full p-1 pl-2 bg-white/10 rounded bg-transparent outline-0"} type="text"
               placeholder={"Add task"}
               value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>

        <button type={"button"}
                className={(important ? 'bg-red-500/70' : 'bg-white/10') + " p-1 text-white/90 font-semibold hover:opacity-90 rounded transition"}
                onClick={() => setImportant(!important)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
        </button>

        <button type={"submit"}
                className={"p-1 bg-white/10 text-white/90 font-semibold rounded hover:bg-green-500/50 transition"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
        </button>

      </div>

      <p
        className={(taskTitle.length > 50 ? "text-red-400" : "text-transparent") + " select-none mt-1 ml-1 transition"}>Task
        title must be under 50 characters</p>

    </form>
  );
}

export default TaskForm;
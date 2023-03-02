import React, {useContext, useEffect, useState} from "react";
import {TasksContext} from "../contexts/tasksContext";
import {Task} from "../types/types";

type UpdateTasks = (tasks: Task[]) => void;

interface SearchBarProps {
    updateTasks: UpdateTasks;
}

const SearchBar: React.FC<SearchBarProps> = ({updateTasks}) => {
  const {tasks, search} = useContext(TasksContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") updateTasks(tasks);
    else updateTasks(search(searchTerm));
  }, [searchTerm])

  return (
    <div className={"flex items-center p-1 border-b-2 border-white/20"}>

      <input className={"w-full ml-1 bg-transparent outline-0"} type="text" placeholder={"Search tasks"}
             value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

      <button onClick={() => setSearchTerm("")}
              className={"p-1 text-white/90 font-semibold rounded hover:bg-white/10"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

    </div>
  )
}
export default SearchBar;
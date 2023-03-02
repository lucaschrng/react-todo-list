import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TasksProvider} from "./contexts/tasksContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>,
)

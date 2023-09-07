import { useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";

function App() {
  const [trigger, setTrigger] = useState(false);
  return (
    <div className="App">
      <h1> Task Management App</h1>
      <ToastContainer />
      <Task setTrigger={setTrigger} />
      <TaskList trigger={trigger} />
    </div>
  );
}

export default App;

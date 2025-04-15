"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect (() => {
    fetchTasks();
  },[]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <div className="max-w-xl mx-auto bg-slate-500 shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-slate-700">
          📝 Daily Tasks Tracker
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded border-b-black border-t-black "
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded border-b-black border-t-black"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded  "
          >
            Add Task
          </button>
        </div>

        <div className="mt-6">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task._id} className="p-4 bg-gray-50 rounded shadow">
                  <h2 className="text-lg font-semibold text-slate-500">
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

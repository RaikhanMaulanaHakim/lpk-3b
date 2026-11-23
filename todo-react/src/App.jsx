import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import "./App.css";

export default function App() {
  // Mengambil data langsung dari localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Gagal membaca data:", error);
      return [];
    }
  });

  // Menyimpan data setiap kali todos berubah
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const tambah = (teks) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        teks: teks,
        selesai: false,
      },
    ]);
  };

  const hapus = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)),
    );
  };

  return (
    <div className="app">
      <h1>📝 To-Do List React</h1>

      <TodoForm onTambah={tambah} />

      <TodoStats todos={todos} />

      <TodoList todos={todos} onHapus={hapus} onToggle={toggle} />
    </div>
  );
}
import { Routes, Route } from "react-router-dom";
import TodoListComponent from "@/components/TodoList";
import { TeamIdProvider } from "@/contexts/TeamIdContext";
import "./App.css";

function App() {
  return (
    <TeamIdProvider>
      <div className="App">
        <h1>Manage Todos</h1>
        <Routes>
          <Route path="/" element={<TodoListComponent />} />
        </Routes>
      </div>
    </TeamIdProvider>
  );
}

export default App;

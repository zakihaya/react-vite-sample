import { Routes, Route } from "react-router-dom";
import TodosPage from "@/pages/Todos";
import AboutPage from "@/pages/About";
import NoMatchPage from "@/pages/NoMatch";
import { TeamIdProvider } from "@/contexts/TeamIdContext";
import "./App.css";

function App() {
  return (
    <TeamIdProvider>
      <div className="App">
        <h1>Manage Todos</h1>
        <Routes>
          <Route path="/" element={<TodosPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </TeamIdProvider>
  );
}

export default App;

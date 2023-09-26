import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodosPage from "@/pages/Todos";
import PersonsPage from "@/pages/Persons";
import AboutPage from "@/pages/About";
import NoMatchPage from "@/pages/NoMatch";
import { TeamIdProvider } from "@/contexts/TeamIdContext";
import "./App.css";

function App() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TeamIdProvider>
        <div className="App">
          <div className="menu">
            <Link to="/">Todos</Link>
            &nbsp; &nbsp;
            <Link to="/persons">Persons</Link>
            &nbsp; &nbsp;
            <Link to="/about">About</Link>
          </div>
          <h1>Manage Todos</h1>
          <Routes>
            <Route path="/" element={<TodosPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/persons" element={<PersonsPage />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </TeamIdProvider>
    </QueryClientProvider>
  );
}

export default App;

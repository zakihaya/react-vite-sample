import TodoListComponent from "@/components/TodoList";
import { TeamIdProvider } from "@/contexts/TeamIdContext";
import "./App.css";

function App() {
  return (
    <TeamIdProvider>
      <div className="App">
        <TodoListComponent />
      </div>
    </TeamIdProvider>
  );
}

export default App;

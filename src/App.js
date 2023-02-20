import Homepage from "./components/Homepage";
import TodoProvider from "./contexts/Todo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  return (
    <div>
      <TodoProvider>
        <Homepage />
      </TodoProvider>
    </div>
  );
}

export default App;

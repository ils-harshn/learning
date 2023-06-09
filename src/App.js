import InputForm from "./Components/InputForm";
import TasksList from "./Components/TasksList";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h3>Application</h3>
      </div>
        <InputForm />
        <TasksList />
    </div>
  );
}

export default App;

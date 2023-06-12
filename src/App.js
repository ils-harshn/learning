import './App.css';
import files from "./files.json";
import Directory from './Components/Directory';


function App() {
  return (
    <Directory files={files} />
  );
}

export default App;

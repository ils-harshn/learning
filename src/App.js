import './App.css';
import { useState } from 'react';
import files from "./files.json";

const Directory = ({ files }) => {
  const [isExpanded, toggleExpanded] = useState(false);
  if (files.type === "file") {
    return (
      <li className='file-name'>{files.name}</li>
    )
  }
  return (
    <div className='folder'>
      <input type='checkbox' checked={isExpanded}></input>
      <h2 className='folder-title' onClick={() => toggleExpanded(!isExpanded)}>{files.name}</h2>
      <ul>
        {
          isExpanded && files.items.map((item, index) => <Directory files={item} key={index} />)
        }
      </ul>
    </div>
  )
}

function App() {
  return (
    <Directory files={files} />
  );
}

export default App;

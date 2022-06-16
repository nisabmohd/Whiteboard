import './App.css';
import socketIOClient from "socket.io-client";
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    const ENDPOINT = "http://localhost:8080";
    const socket = socketIOClient(ENDPOINT);
    socket.emit('getposition',{
      x:87.545,
      y:2.8784
    })
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;

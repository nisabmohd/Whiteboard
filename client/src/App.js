import React, { useCallback, useEffect, useRef, useState } from 'react';
import Bar from './Bar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import io from "socket.io-client";
const socket = io(`localhost:8080`)

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedColor, setSelectedColor] = useState('black');
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [bold, setBold] = useState(3)
  useEffect(() => {
    socket.on('sendposition', data => {
      console.log(data);
      setPosition({ x: data.x, y: data.y })
      setBold(data.pen)
      setSelectedColor(data.color)
      draw()
    })
  }, [])
  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);
  // useEffect(() => {
  //   socket.emit('getposition', {
  //     x: lastPosition.x,
  //     y: lastPosition.y,
  //     pen: bold,
  //     color: selectedColor
  //   })
  // }, [bold, lastPosition.x, lastPosition.y, selectedColor])



  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = bold;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      })
    }
  }, [bold, lastPosition.x, lastPosition.y, mouseDown, selectedColor])

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    socket.emit('getposition', {
      x: lastPosition.x,
      y: lastPosition.y,
      pen: bold,
      color: selectedColor
    })
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App" style={{ width: '100vw', height: '100vh' }}>

        <canvas
          style={{
            height: `100% - 90px`
          }}
          width={document.body.clientWidth}
          height={document.body.clientHeight - 90}
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        />
        <br />
        <div className="container">
          <Bar setBold={setBold} setSelectedColor={setSelectedColor} download={download} clear={clear} />
        </div>
        {/* <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {
          colors.map(
            color => <option key={color} value={color}>{color}</option>
          )
        }
      </select>
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
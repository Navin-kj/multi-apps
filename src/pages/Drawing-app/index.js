import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const handleUndoRedo = (e) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        redo();
      }
    };

    window.addEventListener("keydown", handleUndoRedo);

    return () => {
      window.removeEventListener("keydown", handleUndoRedo);
    };
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");

    ctx.strokeStyle = "#000"; // Set your preferred stroke color here

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    // Save the current canvas state for undo/redo
    const canvasCopy = canvasRef.current.toDataURL();
    setUndoStack([...undoStack, canvasCopy]);
    setRedoStack([]); // Clear the redo stack
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const canvasCopy = undoStack.pop();
      setRedoStack([...redoStack, canvasRef.current.toDataURL()]);
      const image = new Image();
      image.src = canvasCopy;
      image.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(image, 0, 0);
      };
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const canvasCopy = redoStack.pop();
      setUndoStack([...undoStack, canvasRef.current.toDataURL()]);
      const image = new Image();
      image.src = canvasCopy;
      image.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(image, 0, 0);
      };
    }
  };
  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className={`${theme === "dark" ? "dark-theme drawing-div" : "drawing-div"}`}>
      <div>
        <button
          className="draw-btn"
          onClick={undo}
        >
          Undo
        </button>
        <button className="draw-btn" onClick={redo}>
          Redo
        </button>
        <button className="draw-btn" onClick={() => clearCanvas()}>
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
      ></canvas>
    </div>
  );
};

export default DrawingApp;

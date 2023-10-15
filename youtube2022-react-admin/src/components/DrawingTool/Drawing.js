import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import './Drawing.css'

const DrawingTool = () => {
  const [canvas, setCanvas] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#000') // Default color

  useEffect(() => {
    // Function to initialize the canvas
    const initializeCanvas = () => {
      const canvas = new fabric.Canvas('canvas', {
        isDrawingMode: false,
      })

      // Initialize the canvas with some options
      canvas.setWidth(800) // Set the canvas width
      canvas.setHeight(600) // Set the canvas height
      canvas.freeDrawingBrush.color = selectedColor // Set default brush color
      canvas.freeDrawingBrush.width = 5 // Set default brush width

      setCanvas(canvas)
    }

    // Initialize the canvas when the component mounts
    initializeCanvas()
  }, [])

  const handleColorChange = (color) => {
    setSelectedColor(color)
    if (canvas) {
      canvas.freeDrawingBrush.color = color
    }
  }

  const toggleDrawingMode = () => {
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode
    }
  }

  const drawRectangle = () => {
    if (canvas) {
      canvas.isDrawingMode = false
      canvas.on('mouse:down', (event) => {
        const pointer = canvas.getPointer(event.e)
        const rect = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 100,
          height: 50,
          fill: selectedColor,
        })
        canvas.add(rect)
      })
    }
  }

  const drawCircle = () => {
    if (canvas) {
      canvas.isDrawingMode = false
      canvas.on('mouse:down', (event) => {
        const pointer = canvas.getPointer(event.e)
        const circle = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 50,
          fill: selectedColor,
        })
        canvas.add(circle)
      })
    }
  }

  return (
    <div className="DrawingTool">
      <div className="ColorButtons">
        <button
          onClick={() => handleColorChange('red')}
          className="ColorButton"
          style={{ background: 'red' }}
        ></button>
        <button
          onClick={() => handleColorChange('green')}
          className="ColorButton"
          style={{ background: 'green' }}
        ></button>
        <button
          onClick={() => handleColorChange('blue')}
          className="ColorButton"
          style={{ background: 'blue' }}
        ></button>
        <button
          onClick={() => handleColorChange('black')}
          className="ColorButton"
          style={{ background: 'black' }}
        ></button>
        <button
          onClick={() => handleColorChange('white')}
          className="ColorButton"
          style={{ background: 'white' }}
        ></button>
      </div>
      <button onClick={toggleDrawingMode} className="EnableDrawingButton">
        {canvas?.isDrawingMode ? 'Disable Drawing' : 'Enable Drawing'}
      </button>
      <button onClick={drawRectangle} className="DrawShapeButton">
        Draw Rectangle
      </button>
      <button onClick={drawCircle} className="DrawShapeButton">
        Draw Circle
      </button>
      <div className="canvas-container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}

export default DrawingTool

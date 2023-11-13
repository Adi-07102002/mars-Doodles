import React from 'react'
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react'
import rough from 'roughjs'
const roughGenerator = rough.generator();
const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  Fillcolor,
  strokeSize,
}) => {

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = strokeSize;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  })

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
    ctxRef.current.fillStyle = Fillcolor;
    ctxRef.current.strokeWidth= strokeSize;
  }, [color,Fillcolor,strokeSize]);


  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    elements.forEach((element) => {
    
      if (element.type === "rec") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth:element.strokeSize,
              roughness: 0,
              fill:element.Fillcolor,
              fillStyle: 'solid',
            }
          )
        );
      }
      else if (element.type === "pencil") {
        roughCanvas.linearPath(element.path, {
          stroke: element.stroke,
          strokeWidth: element.strokeSize,
          roughness: 0
        });
      }
      else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {
            stroke: element.stroke,
            strokeWidth: element.strokeSize,
            roughness: 0
          })
        );
      }
      else if (element.type === "ellipse") {
        roughCanvas.draw(
          roughGenerator.ellipse(element.offsetX, element.offsetY, element.width, element.height, {
            stroke: element.stroke,
            strokeWidth: element.strokeSize,
            roughness: 0,
            fill:element.Fillcolor,
            fillStyle: 'solid',
          })
        );
      }
      else if (element.type === "eraser") {
        roughCanvas.draw(
          roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {
            stroke: element.stroke,
            strokeWidth: element.strokeSize,
            roughness: 0
          })
        );
      }
    })
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,

        },
      ]);
    }
    else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        }
      ]);
    }
    else if (tool === "rec") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rec",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        }
      ]);
    }
    else if (tool === "ellipse") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "ellipse",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        }
      ]);
    }
    else if (tool === "eraser") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: 'white',
        },
      ]);
    }
    setIsDrawing(true);
  }

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      //pencil by default

      if (tool === "pencil"  || tool==="eraser") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
                strokeSize:strokeSize
              }
            }
            else
              return ele;
          })
        )
      }
      else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
                strokeSize:strokeSize
              };
            }
            else
              return ele;
          })
        )
      }
      else if (tool === "rec") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                Fillcolor: Fillcolor,
                strokeSize:strokeSize
              };
            }
            else
              return ele;
          })
        )
      }
      else if (tool === "ellipse") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                Fillcolor: Fillcolor,
                strokeSize:strokeSize
              };
            }
            else
              return ele;
          })
        )
      }
    }
  }

  const handleMouseUp = (e) => {
    //const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(false);
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className='border border-dark border-3 h-100 w-100 overflow-hidden '
    >
      
      <canvas
        height="1000%"
        width="1500%"
        ref={canvasRef}
      />
    </div>
  )
}

export default WhiteBoard
import React, { useEffect, useRef, useState } from "react";
import { UNSAFE_DataRouterContext } from "react-router-dom";
import WhiteBoard from '../../Components/Whiteboard/Whiteboard';
import "./RoomPage.css"

const RoomPage = () => {
    const canvas = useRef(null);
    const ctx = useRef(null)

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("#000000");
    const [Fillcolor, setFillColor] = useState("#ffffff");
    const [strokeSize, setStrokeSize] = useState("5");
    const [elements, setElements] = useState([]);
    const [history,setHistory]=useState([]);

    const handleClearCanvas=()=>{
        const canvasRef=canvas.current;
        const ctx=canvasRef.getContext("2d");
        ctx.fillRect="white";
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        setElements([]);
    }

    const undo=()=>{
        setHistory((prevHistory)=>[...prevHistory,elements[elements.length-1]]);
        setElements(
            (prevElements)=>prevElements.slice(0,prevElements.length-1)
        )
    }
    const redo=()=>{
        setElements((prevElements)=>[...prevElements,history[history.length-1]]);
        setHistory(
            (prevHistory)=>prevHistory.slice(0,prevHistory.length-1)
        )
    }
    return (
        <div className='row'>
            <h1 className='text-center py-4'>White board Sharing App<span className='text-primary'>[ Users online:0 ]</span></h1>
            <div className='col-md-10 gap-3 mx-auto mt-2 mb-3 d-flex align-items-center justify-content-center'>
                <div className='d-flex col-md-4 justify-content-center gap-2'>
                    <div className='d-flex gap-1 align-items-center justify-content-center'>
                        <label htmlFor="pencil">
                            Pencil
                        </label>
                        <input type="radio" checked={tool === "pencil"} name="tool" className='mt-1' id="pencil" value="pencil" onChange={(e) => setTool(e.target.value)} />
                    </div>

                    <div className='d-flex gap-1 align-items-center'>
                        <label htmlFor="line">
                            Line
                        </label>
                        <input type="radio" checked={tool === "line"} name="tool" className='mt-1' id="line" value="line" onChange={(e) => setTool(e.target.value)} />
                    </div>

                    <div className='d-flex gap-1 align-items-center'>
                        <label htmlFor="rec">
                            Rectangle
                        </label>
                        <input type="radio" checked={tool === "rec"} name="tool" className='mt-1' id="rec" value="rec" onChange={(e) => setTool(e.target.value)} />
                    </div>

                    <div className='d-flex gap-1 align-items-center'>
                        <label htmlFor="ellipse">
                        Ellipse
                        </label>
                        <input type="radio" checked={tool === "ellipse"} name="tool" className='mt-1' id="ellipse" value="ellipse" onChange={(e) => setTool(e.target.value)} />
                    </div>

                    <div className='d-flex gap-1 align-items-center'>
                        <label htmlFor="eraser">
                        Eraser
                        </label>
                        <input type="radio" checked={tool === "eraser"} name="tool" className='mt-1' id="eraser" value="eraser" onChange={(e) => setTool(e.target.value)} />
                    </div>

                    {/* <input type="radio" name="tool" value="poly" onChange={(e)=>setTool(e.target.value)}/> */}
                </div>

                <div className='col-md-2 mx-auto'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='color'>Select color for stroke:</label>
                        <input type="color" id="color" className='mt-1 ms-3' value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                </div>

                <div className='col-md-2 mx-auto'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='color'>Select color for fill:</label>
                        <input type="color" id="color" className='mt-1 ms-3' value={Fillcolor} onChange={(e) => setFillColor(e.target.value)} />
                    </div>
                </div>

                <div className='col-md-2 mx-auto'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='stroke'>Select color for fill:</label>
                        <input type="number" id="stroke" className='mt-1 ms-3' value={strokeSize} onChange={(e) => setStrokeSize(e.target.value)} />
                    </div>
                </div>

                <div className='col-md-3 d-flex gap-2'>
                    <button className='btn btn-primary mt-1'
                    disabled={elements.length===0}
                    onClick={()=>undo()}>Undo</button>
                    <button className='btn btn-outline-primary mt-1'
                    disabled={history.length<1}
                    onClick={()=>redo()}>Redo</button>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-danger" onClick={handleClearCanvas}>Clear canvas</button>
                </div>
            </div>
            <div className='col-md-10  mx-auto mt-4 canvas-box '>
                <WhiteBoard 
                    canvasRef={canvas} 
                    ctxRef={ctx}
                    elements={elements}
                    setElements={setElements}
                    color={color}
                    Fillcolor={Fillcolor}
                    tool={tool}
                    strokeSize={strokeSize}
                />
            </div>

        </div>
    )
}

export default RoomPage

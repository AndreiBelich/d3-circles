import React from "react";
import "./MyFirstComponent.css";
import rd3 from 'react-d3-library';
import useGraph from "../../hooks/useGraph";

const RD3Component = rd3.Component;

const MyFirstComponent = () => {
    const { node, data, addCircle: handler } = useGraph("data.json");
    return (
        <>
            <button onClick={handler}>Add circle</button>
            <div>
                <RD3Component data={node.getNode()}/>
            </div>

            <span>
                {JSON.stringify(data)}
            </span>
        </>
    )
}

export default MyFirstComponent;
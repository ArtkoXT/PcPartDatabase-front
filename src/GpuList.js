import React from "react";

const GpuList = ({gpu}) => {

    return (
        <li key={gpu.id}>
            <span>{gpu.manufacturer_name} {gpu.model}</span>
        </li>
    );
};

export default GpuList;
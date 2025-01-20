import React from "react";

const CpuList = ({cpu}) => {

    return (
        <li key={cpu.id}>
            <span>{cpu.manufacturer_name} {cpu.model}</span>
        </li>
    );
};

export default CpuList;
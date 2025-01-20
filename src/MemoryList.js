import React from "react";

const MemoryList = ({ram}) => {

    return (
        <li key={ram.id}>
            <span>{ram.manufacturer_name} {ram.model}</span>
        </li>
    );
};

export default MemoryList;
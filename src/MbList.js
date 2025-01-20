import React from "react";

const MbList = ({mb}) => {

    return (
        <li key={mb.id}>
            <span>{mb.manufacturer_name} {mb.model}</span>
        </li>
    );
};

export default MbList;
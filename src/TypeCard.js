import React from "react";
import './TypeCard.css';
import { Link } from "react-router-dom";

const TypeCard = ( {item} ) => {

    const catNames = {
        CPU: "cpus",
        GPU: "graphic cards",
        RAM: "memory",
        MOTHERBOARD: "motherboards"
    }

    return (

        <li key={item.id} className="item">
            <Link to={`/${catNames[item]}/all`} className='item-button'>
                <img src={item.imageUrl} alt={item} className="item-image"/>
            </Link>
            <span className='item-name'>{item}</span>
        </li>
    );
};


export default TypeCard;
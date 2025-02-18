import React from "react";
import './pages/styles/CategoryCards.css';
import { Link } from "react-router-dom";

const TypeCard = ( {item} ) => {

    const catNames = {
        CPU: "cpus",
        GPU: "graphic_cards",
        RAM: "memory",
        MOTHERBOARD: "motherboards"
    }

    return (

        <li key={item.id} className="item">
            <Link to={`components/${catNames[item]}`} className='item-button'>
                <img src={item.imageUrl} alt={item} className="item-image"/>
            </Link>
            <span className='item-name'>{item}</span>
        </li>
    );
};


export default TypeCard;
import React from "react";
import './TypeCard.css';
import { Link, useNavigate } from "react-router-dom";

const TypeCard = ( {item} ) => {

    const navigate = useNavigate();
    const routeChange = () => {
        const path = '/'+ item.toLowerCase() +'/all'
        navigate(path)
    }

    return (

        <li key={item.id} className="item">
            <Link to={`/${item.categoryName}`} className='item-button' onClick={routeChange}>
                <img src={item.imageUrl} alt={item} className="item-image"/>
            </Link>
            <span className='item-name'>{item.categoryName}</span>
        </li>
    );
};


export default TypeCard;
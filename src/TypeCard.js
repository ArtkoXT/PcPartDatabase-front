import React from "react";
import './TypeCard.css';
import RemoveAndEditButtons from "./RemoveAndEditButtons";
import { useNavigate } from "react-router-dom";

const TypeCard = ( {item, deleteType, debugView} ) => {

    const navigate = useNavigate();
    const routeChange = () => {
        const path = '/'+ item.typeName.toLowerCase() +'/all'
        navigate(path)
    }

    return (

        <li key={item.id} className="item">
            <button className='item-button' onClick={routeChange}>
                <img src={item.imageUrl} alt={item.typeName} className="item-image"/>
            </button>
            <div>
                {debugView ? 
                <RemoveAndEditButtons 
                    deleteType={deleteType} 
                    item={item} /> 
                : null}
            </div>
            <span className='item-name'>{item.typeName}</span>
        </li>
    );
};


export default TypeCard;
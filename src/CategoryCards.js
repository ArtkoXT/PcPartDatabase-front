import React from "react";
import './pages/styles/CategoryCards.css';
import { Link } from "react-router-dom";

const TypeCard = ( {item} ) => {

    const catMapping = {
        CPU: {path:"cpus", imageUrl: "https://t3.ftcdn.net/jpg/00/81/24/72/360_F_81247213_OYvGTCn5mnQQ2c0gWJ1U5ixcbmNBaMOp.jpg"},
        GPU: {path:"graphic_cards", imageUrl: "https://media.istockphoto.com/id/1180632542/photo/game-graphics-card-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=jgLiheKNlcuB4_D0ZGO9GdjouRQWPmPsIjP7jh-ivCk="},
        RAM: {path:"memory", imageUrl: "https://st2.depositphotos.com/2454597/9931/i/950/depositphotos_99312556-stock-photo-modern-ram-memory-modules-with.jpg"},
        MOTHERBOARD: {path:"motherboards", imageUrl: "https://static.trackalacker.com/cdn-cgi/image/fit=pad,width=600,height=600,quality=85,format=auto/uploads/products/listings/photo_item/photo/102179/asus-pro-ws-w680-ace-ipmi-lga-1700-atx-motherboard.jpeg"}
    }

    return (

        <li key={catMapping[item]} className="item">
            <Link to={`components/${catMapping[item].path}`} className='item-button'>
                <img src={catMapping[item].imageUrl} alt={item} className="item-image"/>
            </Link>
            <span className='item-name'>{item}</span>
        </li>
    );
};


export default TypeCard;
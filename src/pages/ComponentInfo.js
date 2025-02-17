import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from '../AxiosConfig';
import "./styles/ComponentInfo.css"

export default function ComponentInfo() {

    const [component, setComponent] = useState({})

    const { id } = useParams();

    useEffect( () => {
        fetchComponent();
    }, []);
    
    const fetchComponent = async () => {
        try {
            const response = await axios.get(`/components/${id}`);
            setComponent(response.data);
        } catch (error) {
            console.error('Error when retrieving component: ', error)
        }
    }

    const keyMapping = {
        name: "Name",
        manufacturer_name: "Manufacturer",
        category: "Category",
        price: "Price",
        properties: "Specifications"
    }


    return (
        <div className="info-container">
            <h1 style={{color:'#c4c4c4'}}>{component.manufacturer_name} {component.name}</h1>
            <ul className="info-list">
                {Object.entries(component).slice(1).map(([key, value]) => 
                    <li key={key} className="info-li">
                        <strong>{keyMapping[key] || key}:</strong><span >{" "}</span>
                        {typeof value === "object" ? (
                            <ul>
                                {Object.entries(value).map(([subKey, subValue]) => (
                                    <li key={subKey} className="info-li">
                                        <strong>{subKey}: </strong> <span style={{fontWeight:"normal"}}>{subValue}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span style={{fontWeight:"normal"}} >{key === 'price' ? `${value} €` : value}</span>
                        )}
                    </li>
                )}
            </ul>
            <Link to={`/component/edit/${id}`} className='add-button'>Edit</Link>
        </div>
    )
}
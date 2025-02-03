import { useEffect, useState } from 'react';
import axios from '../AxiosConfig';
import TypeCard from '../TypeCard';
import './Home.css'

export default function Home() {
    const [types, setTypes] = useState([]);

    useEffect( () => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/components/categories');
            console.log(response.data);
            setTypes(response.data);
        } catch (error) {
            console.error('Error when retrieving categories: ', error)
        }
    }
    
    return (
        <div className='page-background'>
            <div className="item-container">
            <h1 style={{color: "#c4c4c4"}}>Welcome to the PcPartDatabase.</h1>
            <ul className='item-list'>
                {types.map( (e) => (
                    <TypeCard 
                    item={e}
                    />
                ))}
                </ul>
            </div>
        </div>
    );
};
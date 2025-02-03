import { useEffect, useState } from 'react';
import axios from '../AxiosConfig';
import TypeCard from '../TypeCard';
import AddTypeForm from '../AddTypeForm';
import './Home.css'

export default function Home() {
    const [types, setTypes] = useState([]);

    const [debugView, setDebugView] = useState(false);

    const [showForm, setShowForm] = useState(false);

    useEffect( () => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/components/categories');
            console.log(response.data);
            setTypes(response.data);
        } catch (error) {
            console.error('Error when retrieving categories: ', error)
        }
    }

    const addNewType = () => {
        const name = prompt('Enter a name');
        if (name !== null && name !== "") {
        const newItem = {
            id: Math.random(),
            typeName: name
        };
        setTypes((prevList) => [...prevList, newItem]);
        };
    };

    const deleteType = (key) => {
        setTypes((prevList) => prevList.filter((item) => item.id !== key));
    };
    
    return (
        <div className='page-background'>
            <div className="item-container">
            <h1 style={{color: "#c4c4c4"}}>Welcome to the PcPartDatabase.</h1>
            <ul className='item-list'>
                {types.map( (e) => (
                    <TypeCard 
                    item={e}
                    deleteType={deleteType}
                    debugView={debugView}
                    />
                ))}
                </ul>
            </div>
        </div>
    );
};
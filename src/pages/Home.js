import { useEffect, useState } from 'react';
import TypeCard from '../TypeCard';
import config from '../config';
import AddTypeForm from '../AddTypeForm';

export default function Home() {
    const [types, setTypes] = useState([]);

    const [debugView, setDebugView] = useState(false);

    const [showForm, setShowForm] = useState(false);

    useEffect( () => {
        fetch( config.API_ROOT_PATH+"/productTypes/all" )
        .then( response => response.json())
        .then( json => setTypes(json))
        .catch( e => console.error(e));
    }, [] );

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
        <div className="item-container">
        <h1>Welcome to PcPartDatabase.</h1>
        <button 
            className='debug-button' 
            onClick={() => debugView ? 
            setDebugView(false) 
            : setDebugView(true)}
            >
                Debug View
            </button>
        <ul className='item-list'>
            {types.map( (e) => (
                <TypeCard 
                item={e}
                deleteType={deleteType}
                debugView={debugView}
                />
            ))}
            </ul>
            <button 
            className='button-addnew'
            onClick={() => showForm ? setShowForm(false) : setShowForm(true)}
            >
            Add new product type</button>
            <div>
                {showForm ? <AddTypeForm addNewType={addNewType} /> : null}
            </div>
        </div>
    );
};
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../AxiosConfig";
import './tableStyle.css';



const ComponentList = ( {category} ) => {

    const columns = [
        {header: "Manufacturer", key: "manufacturer_name", bold: true},
        {header: "Model", key: "name", bold: true, link: true},
        {header: "Price", key: "price"}
    ]

    const [componentList, setComponentList] = useState([])

    useEffect( () => {
        fetchComponents();
    });

    const fetchComponents = async () => {
        try {
            const response = await axios.get(`/components/categories/${category}`);
            setComponentList(response.data);
        } catch (error) {
            console.error('Error when retrieving components: ', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/components/${id}`);
        } catch (error) {
            console.error('Error trying to delete component: ', error)
        }
    }

    return (
        <div className='table-container'>
            <h1 style={{color: 'rgb(196, 196, 196)'}}>{category} List</h1>
            <table className='table-style'>
                <thead className='table-head'>
                    <tr className='table-head'>
                        {columns.map((col) => (
                            <th key={col.key} className="table-head-items">
                                {col.header}
                            </th>
                        ))}
                        
                    </tr>
                </thead>
                <tbody>
                    {componentList.map( (c) => (
                        <tr key={c.id} className='table-tr'>
                            {columns.map(({key, bold, link}) => (
                                <td key={key} 
                                    className="table-item"
                                    style={ bold ? {fontWeight: 'bold'} : {}}
                                    >
                                    {link ? (
                                        <Link to={`/component/${c.id}`} className="link-style">
                                            {c[key]}
                                        </Link>
                                    ) : (
                                    c?.[key] ?? 'N/A'
                                    )}
                                </td>
                            ))}
                            <td>
                                <button className='remove-button' onClick={ () => handleDelete(c.id)}>Delete</button>
                                <button className='remove-button'>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="add-button">Add</Link>
        </div>
    )
};

export default ComponentList;
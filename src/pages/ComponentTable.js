import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../AxiosConfig";
import './tableStyle.css';



const ComponentList = ( {category} ) => {

    const columns = [
        {header: "Manufacturer", key: "manufacturer_name", bold: true},
        {header: "Name", key: "name", bold: true, link: true},
        {header: "Price", key: "price"}
    ]

    const [componentList, setComponentList] = useState([])

    useEffect( () => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        try {
            const response = await axios.get('/components/all', {withCredentials: true});
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
                <thead>
                    <tr className='table-head'>
                        {columns.map((col) => (
                            <th key={col.key} className="table-head-items">
                                {col.header}
                            </th>       
                        ))}
                        <th className="table-head-items"> </th>
                    </tr>
                </thead>
                <tbody>
                    {componentList.filter(c => c.category === category).map( (c) => (
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
                                        key === 'price' ? `${c[key]} €` : c[key]
                                        )
                                    }
                                </td>
                            ))}
                            <td>
                                <Link className='remove-button' onClick={ () => handleDelete(c.id)}>Delete</Link>
                                <Link to={`/component/edit/${c.id}`} className='remove-button'>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/component/add"} className="add-button">Add</Link>
        </div>
    )
};

export default ComponentList;
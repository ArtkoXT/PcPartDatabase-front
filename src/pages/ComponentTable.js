import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../AxiosConfig";
import './styles/tableStyle.css';
import AuthService from "../AuthService";



const ComponentList = ( {category} ) => {

    const user = AuthService.getCurrentUser();

    const [isAdmin, setIsAdmin] = useState(false);

    const [searchText, setSearchText] = useState("");


    const columns = [
        {header: "Manufacturer", key: "manufacturer_name", bold: true},
        {header: "Name", key: "name", bold: true, link: true},
        {header: "Price", key: "price"}
    ]

    const [componentList, setComponentList] = useState([])

    useEffect( () => {
        fetchComponents();
        checkIfAdmin();
    }, []);

    const checkIfAdmin = () => {
        if( user && user.roles.includes("ROLE_ADMIN")) {
            setIsAdmin(true)
        }
    }

    const fetchComponents = async () => {
        try {
            const response = await axios.get('/components/all', {withCredentials: true});
            setComponentList(response.data);
        } catch (error) {
            console.error('Error when retrieving components: ', error)
        }
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this?")) {
            try {
                await axios.delete(`/components/${id}`);
                fetchComponents();
                alert('Deleted Successfuly!')
            } catch (error) {
                console.error('Error trying to delete component: ', error)
            }
        }
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    const filteredItems = componentList.filter( (component) => 
        component.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
        component.manufacturer_name.toLowerCase().includes(searchText.toLocaleLowerCase())
    );

    return (
        <div className='table-container'>
            <h1 style={{color: 'rgb(196, 196, 196)'}}>{category} List</h1>
            <div className="search-box-container">
                <label>Search</label>
                <input
                    className="search-box"
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                ></input>
            </div>
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
                    {filteredItems.filter(c => c.category === category).map( (c) => (
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
                            {isAdmin ? 
                            <>
                                <Link className='remove-button' onClick={ () => handleDelete(c.id)}>Delete</Link>
                                <Link to={`/component/edit/${c.id}`} className='remove-button'>Edit</Link>
                            </>
                                : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isAdmin? 
            <Link to={"/component/add"} className="add-button">Add</Link>
            : null
            }
        </div>
    )
};

export default ComponentList;
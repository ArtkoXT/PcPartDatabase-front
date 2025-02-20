import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../AxiosConfig";
import './styles/tableStyle.css';
import AuthService from "../AuthService";



const ComponentList = ( {category} ) => {

    const user = AuthService.getCurrentUser();

    const [isAdmin, setIsAdmin] = useState(false);

    const [searchText, setSearchText] = useState("");

    function getColumns(category) {
        const baseColumns = [
            {header: "Manufacturer", key: "manufacturer_name", bold: true},
            {header: "Name", key: "name", bold: true, link: true},
        ]

        let propertyColumns = []

        switch (category) {
            case "CPU":
                propertyColumns = [...baseColumns, 
                    { header: "Cores", key: "coreCount" }, 
                    { header: "Threads", key: "threadCount" }, 
                    { header: "Clock Speed", key: "coreClock" }, 
                    {header: "Boost Clock", key: "boostClock"}
                ];
                break;
            case "GPU":
                propertyColumns = [...baseColumns, 
                    { header: "VRAM", key: "memorySize" }, 
                    { header: "Clock Speed", key: "baseClock" },
                    {header: "Boost Clock", key: "boostClock"}
                ];
                break;
            case "RAM":
                propertyColumns = [...baseColumns, 
                    { header: "Speed", key: "speed" },
                    { header: "Capacity", key: "size" },
                    { header: "CAS Latency", key: "casLatency" }
                ];
                break;
            case "MOTHERBOARD":
                propertyColumns = [...baseColumns, 
                    { header: "Socket", key: "socket" },
                    { header: "Form Factor", key: "formFactor" },
                    { header: "Memory Max", key: "memoryMax" },
                    { header: "Memory Slots", key: "memorySlots" }
                ];
                break;
        }

        return [...propertyColumns, {header: "Price", key: "price"}]
    }

    const [componentList, setComponentList] = useState([])

    useEffect( () => {
        fetchComponents();
        checkIfAdmin();
        console.log(category)
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
            <h1 style={{color: '#c4c4c4'}}>{category} List</h1>
                <div className="table-actions-container">
                    <div className="search-box-container">
                        <label className="search-box-label">Search</label>
                        <input
                            className="search-box"
                            type="text"
                            placeholder="Enter name"
                            value={searchText}
                            onChange={handleSearch}
                        ></input>
                    </div>
                {isAdmin &&( 
                    <Link to={"/component/add"} className="add-button">Add New</Link>
                )}
            </div>
            <table className='table-style'>
                <thead>
                    <tr className='table-head'>
                        {getColumns(category).map((col) => (
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
                            {getColumns(category).map(({key, bold, link}) => (
                                <td key={key} 
                                    className="table-item"
                                    style={ bold ? {fontWeight: 'bold'} : {}}
                                    >
                                    {link ? (
                                        <Link to={`/component/${c.id}`} className="link-style">
                                            {c[key]}
                                        </Link>
                                    ) : (
                                        key === 'price' ? `${c[key]} €` : c[key] || c.properties[key]
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
        </div>
    )
};

export default ComponentList;
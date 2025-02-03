import { Link } from 'react-router-dom';
import '../tableStyle.css';
import React from "react";

const CpuList = ( {cpuList, handleDelete} ) => {

    const cpuColumns = [
        {header: "Manufacturer", key: "manufacturer_name", bold: true, sort: true},
        {header: "Model", key: "model", bold: true, link: true},
        {header: "Core Clock", key: "coreClock"},
        {header: "Boost Clock", key: "boostClock"},
        {header: "Core Count", key: "coreCount"},
        {header: "Thread Count", key: "threadCount"},
        {header: "TDP", key: "tdp"},
    ]

    return (
        <div className='table-container'>
            <h1 style={{color: 'rgb(196, 196, 196)'}}>List of All CPUs</h1>
            <table className='table-style'>
                <thead className='table-head'>
                    <tr className='table-head'>
                        {cpuColumns.map((col) => (
                            <th key={col.key} className='table-head-items'>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cpuList.map( (cpu) => (
                        <tr key={cpu.id} className='table-tr'>
                            {cpuColumns.map( ( {key,bold,link} ) => (
                                <td key={key} 
                                    className='table-item' 
                                    style={ bold ? { fontWeight: "bold"} : {} }>
                                    {link ? (
                                        <Link to={`/cpus/${cpu.id}`} className='link-style'>
                                            {cpu[key]}
                                        </Link>
                                    ) : (
                                        cpu[key]
                                        )
                                    }
                                </td>
                                ))}
                            <td>
                                <button onClick={ () => handleDelete(cpu.id)} className='remove-button'>Delete</button>
                                <button className='remove-button'>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/cpus/add" className="add-button">Add CPU</Link>
        </div>
    );
};

export default CpuList;
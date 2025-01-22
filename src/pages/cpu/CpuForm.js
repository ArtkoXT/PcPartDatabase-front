import React, { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";

function CpuForm( {onSubmit} ) {

    const [cpuData, setCpuData] = useState({
        model: "",
        manufacturer: {
            id: ""
        },
        productType: {
            id: 1
        },
        coreClock: "",
        boostClock: "",
        tdp: "",
        intergratedGraphics: "",
        architecture: "",
        socket: "",
        coreCount: "",
        threadCount: "",
        l2cache: "",
        l3cahce: ""
    });

    const [manufacturers, setManufacturers] = useState([]);


    useEffect( () => {
        fetchManufacturers();
    }, [] );

    const fetchManufacturers = async () => {
        try {
        const response = await axios.get("/manufacturers/all");
        setManufacturers(response.data);
        } catch (error) {
            console.error("Error fetching manufacturers: ", error);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(cpuData);
            alert('CPU added successfully!')
            navigate('/cpus/all')
        } catch (error) {
            console.error("Error when submiting form: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add CPU</h2>
            <div>
                <label htmlFor="manufacturer-select">Manufacturer:</label>
                <select
                    id="manufacturer-select"
                    value={cpuData.manufacturer.id}
                    onChange={ (e) => {
                        console.log(e.target.value);
                        setCpuData({...cpuData, manufacturer: {id: e.target.value}});
                        }
                    }
                    required
                    >
                        <option value="">Select Manufacturer</option>
                        {manufacturers.map( (m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                                </option>
                        ))}
                    </select>
            </div>
            <div>
                <label htmlFor="cpu-model">CPU model:</label>
                <input
                    id="cpu-model"
                    type="text"
                    value={cpuData.model}
                    onChange={ (e) => setCpuData({...cpuData, model: e.target.value})}
                    required
                />
            </div>
            <div>
                <label htmlFor="cpu-coreClock">Core clock:</label>
                <input
                    id="cpu-coreClock"
                    type="text"
                    value={cpuData.coreClock}
                    onChange={ (e) => setCpuData({...cpuData, coreClock: e.target.value})}
                /> GHz
            </div>
            <div>
                <label htmlFor="cpu-boostClock">Boost clock:</label>
                <input
                    id="cpu-cboostClock"
                    type="text"
                    value={cpuData.boostClock}
                    onChange={ (e) => setCpuData({...cpuData, boostClock: e.target.value})}
                /> GHz
            </div>
            <div>
                <label htmlFor="cpu-coreCount">Core count:</label>
                <input
                    id="cpu-coreClock"
                    type="text"
                    value={cpuData.coreCount}
                    onChange={ (e) => setCpuData({...cpuData, coreCount: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="cpu-threadCount">Thread count:</label>
                <input
                    id="cpu-threadCount"
                    type="text"
                    value={cpuData.threadCount}
                    onChange={ (e) => setCpuData({...cpuData, threadCount: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="cpu-tdp">TDP:</label>
                <input
                    id="cpu-tdp"
                    type="text"
                    value={cpuData.tdp}
                    onChange={ (e) => setCpuData({...cpuData, tdp: e.target.value})}
                /> W
            </div>
            <div>
                <label htmlFor="cpu-architecture">Architecture:</label>
                <input
                    id="cpu-architecture"
                    type="text"
                    value={cpuData.architecture}
                    onChange={ (e) => setCpuData({...cpuData, architecture: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="cpu-socket">Socket Type:</label>
                <input
                    id="cpu-socket"
                    type="text"
                    value={cpuData.socket}
                    onChange={ (e) => setCpuData({...cpuData, socket: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="cpu-igpu">intergrated Graphics:</label>
                <input
                    id="cpu-igpu"
                    type="text"
                    value={cpuData.intergratedGraphics}
                    onChange={ (e) => setCpuData({...cpuData, intergratedGraphics: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="cpu-l2cahce">L2Cache amount:</label>
                <input
                    id="cpu-l2cache"
                    type="text"
                    value={cpuData.l2cache}
                    onChange={ (e) => setCpuData({...cpuData, l2cache: e.target.value})}
                /> MB
            </div>
            <div>
                <label htmlFor="cpu-l3cahce">L3Cache amount:</label>
                <input
                    id="cpu-l3cache"
                    type="text"
                    value={cpuData.l3cache}
                    onChange={ (e) => setCpuData({...cpuData, l3cache: e.target.value})}
                /> MB
            </div>
                <button type="submit">
                    Add
                </button>
        </form>
    );
};

export default CpuForm;
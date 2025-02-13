import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function ComponentAddForm({isEdit}) {

    const navigate = useNavigate();

    const { id } = useParams();

    const [componentData, setComponentData] = useState({
        manufacturer_id: "",
        name: "",
        price: "",
        category: "",
        properties: {}
    });

    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);

    const categoryProperties = {
        CPU: {coreClock: "3.0 GHz", boostClock: "3.6 GHz", tdp: "120 W", integratedGraphics: "None", architecture: "Zen 4", socket: "AM5", coreCount: "6", threadCount: "12", l2cache: "3 MB", l3cache: "32 MB"},
        GPU: {graphicsProcessor: "GA106", architecture: "Ampere", cores: "3584", tdp: "170 W", baseClock: "1320 MHz", boostClock: "1777 MHz", memoryClock: "1875 MHz", memorySize: "12 GB", memoryType: "GDDR6", memoryBus: " 192 bit", memoryBandwidth: "360.0 GB/s"},
        RAM: {size: "16 GB", speed: "DDR5-4500", formFactor: "288-pin DIMM", modules: "2 x 8 GB", casLatency: "36", timing: "36-44-44-96"},
        MOTHERBOARD: {socket: "AM5", formFactor: "ATX", chipset: "AMD B650", memoryMax: "192 GB", memoryType: "DDR5", memorySlots: "4", pciex16slots: "2", m2slots: "2", usb2headers: "0", usb3headers: "2", wifi: "Wi-Fi 6E"}
    };

    useEffect( () => {
        fetchCategories();
        fetchManufacturers();
        if(isEdit) { fetchComponentData() }
    }, []);

    const fetchComponentData = async () => {
        try {
            const response = await axios.get(`/components/${id}`);
            const data = response.data
            console.log(response.data);
            setComponentData(
                {
                    manufacturer_id: data.manufacturer_id,
                    name: data.name,
                    price: data.price,
                    category: data.category,
                    properties: data.properties
                }
            )
        } catch (error) {
            console.error('Error when retrieving component: ', error)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/components/categories');
            console.log(response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error when retrieving categories: ', error)
        }
    }

    const fetchManufacturers = async () => {
        try {
        const response = await axios.get("/manufacturers/all");
        setManufacturers(response.data);
        } catch (error) {
            console.error("Error fetching manufacturers: ", error);
        }
    };

    const onSubmit = async (componentData) => {
        try {
            const response = isEdit ? await axios.put(`/components/${id}`, componentData) : await axios.post('/components/add', componentData);
            console.log('Success!', response.data);
        } catch (error) {
            console.error('Error adding component: ', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(componentData);
            navigate(-1)
        } catch (error) {
            console.error("Error when submiting form: ", error);
        }
    };

    return (
        <div className="form-container">
        <form className="add-form" onSubmit={handleSubmit}>
            <h2 style={{color:'#c4c4c4'}}>{isEdit? ('Editing') : ('Add new component')}</h2>
            <div className="add-form-div">
                <label className="add-form-item-key" style={{color:'#c4c4c4', fontWeight:'bold'}} htmlFor="name">Name:</label>
                <input
                    className="add-form-item-value"
                    id="name"
                    type="text"
                    value={componentData.name}
                    onChange={ (e) => setComponentData({...componentData, name: e.target.value})}
                    required
                />
            </div>
            <div className="add-form-div">
                <label className="add-form-item-key" style={{color:'#c4c4c4', fontWeight:'bold'}} htmlFor="manufacturer-select">Manufacturer:</label>
                <select
                    className="add-form-item-value"
                    id="manufacturer-select"
                    value={componentData.manufacturer_id}
                    onChange={ (e) => {
                        setComponentData({...componentData, manufacturer_id: e.target.value});
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
            <div className="add-form-div">
                <label className="add-form-item-key" style={{color:'#c4c4c4', fontWeight:'bold'}} htmlFor="price">Price:</label>
                <input
                    className="add-form-item-value"
                    id="price"
                    type="number"
                    placeholder="320 EUR"
                    value={componentData.price}
                    onChange={ (e) => setComponentData({...componentData, price: e.target.value})}
                    required
                />
            </div>
            <div className="add-form-div">
                <label className="add-form-item-key" style={{color:'#c4c4c4', fontWeight:'bold'}} htmlFor="category-select">Select Category:</label>
                <select
                className="add-form-item-value"
                id="category-select"
                value={componentData.category}
                onChange={ (e) => {
                    setComponentData( 
                        {...componentData, category: e.target.value, 
                            properties: categoryProperties[e.target.value] || {}
                        }
                    )
                }}
                required
                >
                    <option value="">Select Category</option>
                    {categories.map( (cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            {Object.keys(componentData.properties).length > 0 && (
                <div>
                    {Object.keys(componentData.properties).map((key) => (
                        <div className="add-form-div" key={key}>
                            <label className="add-form-item-key" style={{color:'#c4c4c4', fontWeight:'bold'}}>{key}:</label>
                            <input
                            className="add-form-item-value"
                            type="text"
                            value={componentData.properties[key]}
                            onChange={ (e) => {
                                setComponentData( (prev) => (
                                    {...prev, properties: {
                                        ...prev.properties,
                                        [key]: e.target.value}
                                    }
                                ))
                            }}
                            />
                        </div>
                    ))}
                </div>
            )}
            <button 
                className="save-button" 
                type="submit"
                >
                    {isEdit ? "Save" : "Add"}
            </button>
        </form>
        </div>
    );
};
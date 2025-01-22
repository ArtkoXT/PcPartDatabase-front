import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../AxiosConfig';
import './InfoStyle.css'

export default function CpuInfo() {

    const [cpu, setCpu] = useState({})

    const { id } = useParams();

    useEffect( () => {
        fetchCpu();
    }, []);
    
    const fetchCpu = async () => {
        try {
            const response = await axios.get(`/cpus/${id}`);
            setCpu(response.data);
        } catch (error) {
            console.error('Error when retrieving cpus: ', error)
        }
    }


    return (
        <div className="info-container">
            <h1 style={{color:'rgb(196, 196, 196)'}}>{cpu.manufacturer_name} {cpu.model}</h1>
            <ul className="info-list">
                <li className="info-li">Core Clock: {cpu.coreClock}</li>
                <li className="info-li">Boost Clock: {cpu.boostClock}</li>
                <li className="info-li">TDP: {cpu.tdp}</li>
                {cpu.integratedGraphics ?<li className="info-li">Integrated Graphics: {cpu.integratedGraphics}</li> : null}
                <li className="info-li">Architecture: {cpu.architecture}</li>
                <li className="info-li">Socket Type: {cpu.socket}</li>
                <li className="info-li">Core Count: {cpu.coreCount}</li>
                <li className="info-li">Thread Count: {cpu.threadCount}</li>
                <li className="info-li">L2Cache: {cpu.l2cache}</li>
                <li className="info-li">L3Cache: {cpu.l3cache}</li>
            </ul>
        </div>
    )
}
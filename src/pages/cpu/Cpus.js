import { useEffect, useState } from "react";
import CpuList from './CpuList';
import axios from '../../AxiosConfig';
import './Cpus.css'


export default function Cpus() {

    const [cpuList, setCpuList] = useState([])

    useEffect( () => {
        fetchCpus();
    }, [] );

    const fetchCpus = async () => {
        try {
            const response = await axios.get('/cpus/all');
            setCpuList(response.data);
        } catch (error) {
            console.error('Error when retrieving cpus: ', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/cpus/${id}`);
            fetchCpus();
        } catch (error) {
            console.error('Error trying to delete cpu: ', error)
        }
    }

    return(
        <ul>
            <CpuList
                cpuList={cpuList}
                handleDelete={handleDelete}
             />
        </ul>
    );
};
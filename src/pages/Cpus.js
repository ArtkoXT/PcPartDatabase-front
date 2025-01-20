import { useEffect, useState } from "react";
import CpuList from '../CpuList';
import config from '../config';


export default function Cpus() {

    const [cpuList, setCpuList] = useState([])

    useEffect( () => {
        fetch( config.API_ROOT_PATH+"/cpus/all" )
        .then( response => response.json())
        .then( json => setCpuList(json))
        .catch( e => console.error(e));
    }, [] );

    return(
        <ul>
            <h1>List of All CPUs</h1>
            {cpuList.map( (cpu) => (
                <CpuList 
                cpu={cpu}
                />
            ))}
        </ul>
    );
};
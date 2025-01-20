import { useEffect, useState } from "react";
import MemoryList from '../MemoryList';
import config from '../config';

export default function Memory() {

    const [ramList, setRamList] = useState([])

    useEffect( () => {
        fetch( config.API_ROOT_PATH+"/ram/all" )
        .then( response => response.json())
        .then( json => setRamList(json))
        .catch( e => console.error(e));
    }, [] );

    return(
        <ul>
            <h1>List of All Memory</h1>
            {ramList.map( (ram) => ( <MemoryList ram={ram} />))}
        </ul>
    );
};
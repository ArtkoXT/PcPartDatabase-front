import { useEffect, useState } from "react";
import MbList from '../MbList';
import config from '../config';

export default function Motherboards() {

    const [mbList, setMbList] = useState([])

    useEffect( () => {
        fetch( config.API_ROOT_PATH+"/motherboards/all" )
        .then( response => response.json())
        .then( json => setMbList(json))
        .catch( e => console.error(e));
    }, [] );

    return(
        <ul>
            <h1>List of All Motherboards</h1>
            {mbList.map( (mb) => (
                <MbList mb={mb} />
            ))}
        </ul>
    );
};
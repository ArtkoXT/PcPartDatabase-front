import { useEffect, useState } from "react";
import GpuList from "./GpuList";
import config from "../../config";

export default function GraphicCards() {

    const [gpuList, setGpuList] = useState([])

    useEffect( () => {
        fetch( config.API_ROOT_PATH+"/gpus/all" )
        .then( response => response.json())
        .then( json => setGpuList(json))
        .catch( e => console.error(e));
    }, [] );

    return(
        <ul>
            <h1>List of All Graphic Cards</h1>
            <GpuList gpuList={gpuList} />
        </ul>
    );
};
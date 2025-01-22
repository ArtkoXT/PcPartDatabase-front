import React from "react";

const GpuList = ({gpuList}) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Memory</th>
                        <th>Core Clock</th>
                        <th>Boost Clock</th>
                        <th>Cores</th>
                    </tr>
                </thead>
                <tbody>
                    {gpuList.map( (gpu) => (
                        <tr>
                            <td>{gpu.manufacturer_name}</td>
                            <td>{gpu.model}</td>
                            <td>{gpu.memorySize}</td>
                            <td>{gpu.baseClock}</td>
                            <td>{gpu.boostClock}</td>
                            <td>{gpu.cores}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GpuList;
import { useState } from 'react'
import axios from "./../AxiosConfig";

export default function ManufacturerForm({setShowManuForm}) {


    const [manufacturerData, setmanufacturerData] = useState({
        name: ""
    })

    const handleSubmit = async () => {
        try {
            await axios.post("/manufacturer/add", manufacturerData);
            console.log(manufacturerData);
            window.location.reload();
        } catch (error) {
            console.error('Something went wrong when adding a manufacturer: ', error);
        }
    }

    return(

        <div className="popup" onClick={() => setShowManuForm(false)}>
            <div className="popup-content" onClick={ (e) => e.stopPropagation()}>
                <span className="close-btn" onClick={() => {
                    setShowManuForm(false)
                    }}>&times;</span>
                <h2>Create a new Manufacturer</h2>
                <form>
                    <label>Enter a name</label>
                    <input type="text"
                    className='input-field'
                    placeholder='Name'
                    value={manufacturerData.name}
                    onChange={ (e) => setmanufacturerData({...manufacturerData, name: e.target.value})}
                    required />

                    <button className='topic-submit-button' type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}
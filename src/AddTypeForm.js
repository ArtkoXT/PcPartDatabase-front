import React from "react";

const AddTypeForm = (addNewType) => {

    return(
        <form onSubmit={addNewType}>
            <label>
                Enter a name:
                <input type="text" />
            </label>
            <input type="submit"/>
        </form>
    );
};

export default AddTypeForm;
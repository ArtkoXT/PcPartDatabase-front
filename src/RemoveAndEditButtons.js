

const RemoveAndEditButtons = ({item, deleteType}) => {

    return(
        <>
        <button className="button-remove" onClick={() => deleteType(item.id)}>Remove</button>
        <button className="button-remove">Edit</button>
        </>
    )
}

export default RemoveAndEditButtons;

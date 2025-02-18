import { useState } from 'react'
import axios from "../../AxiosConfig";
import '../styles/TopicForm.css'
import AuthService from '../../AuthService';

export default function CreateTopicForm({setShowTopicForm}) {

    const user = AuthService.getCurrentUser();

    const [topicData, setTopicData] = useState({
        topic: {
            title: ""
        },
        comment: {
            content: ""
        },
        author_id: user.id
    })

    const handleSubmit = async () => {
        try {
            await axios.post("/topics/create", topicData)
            console.log(topicData)
        } catch (error) {
            console.log(topicData)
            console.error('Something went wrong when creating topic', error)
        }
    }

    return(

        <div className="popup" onClick={() => setShowTopicForm(false)}>
            <div className="popup-content" onClick={ (e) => e.stopPropagation()}>
                <span className="close-btn" onClick={(e) => {
                    setShowTopicForm(false)
                    }}>&times;</span>
                <h2>Create New Topic</h2>
                <form>
                    <label>Add a title</label>
                    <input type="text"
                    className='input-field'
                    placeholder='Title'
                    value={topicData.topic.title}
                    onChange={ (e) => setTopicData({...topicData, topic: {title: e.target.value}})}
                    required />

                    <label>Text</label>
                    <textarea
                    className='input-field-textarea'
                    placeholder='Type your text here'
                    value={topicData.comment.content}
                    onChange={ (e) => setTopicData({...topicData, comment: {content: e.target.value}})}
                    required />

                    <button className='topic-submit-button' type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}
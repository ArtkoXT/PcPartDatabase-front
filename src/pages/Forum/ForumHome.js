import { useEffect, useState } from 'react'
import '../styles/Forum.css'
import axios from "../../AxiosConfig";
import CreateTopicForm from './TopicForm';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../../AuthService';
import { Link } from 'react-router-dom';


export default function ForumHome() {

    const [ showTopicForm, setShowTopicForm ] = useState(false);

    const [ topicList, setTopicList] = useState([]);

    const fetchTopics = async () => {
        try {
            const response = await axios.get('/topics/all');
            console.log(response.data)
            setTopicList(response.data);
        } catch (error) {
            console.error('Error when retrieving topics: ', error)
        }
    }

    const user = AuthService.getCurrentUser()

    useEffect( () => {
        fetchTopics();
    }, []);

    

    return (
        <div className="forum-container">
            <h1 className='forum-title'>PcPartDatabase Forum</h1>
            <div className='topic-list'>
                <div className='topic-header-container'>
                    <h2 className='topic-list-title'>Discussions</h2>
                    {user ?
                    <button 
                        className='create-topic-button'
                        onClick={() => setShowTopicForm(true)}
                        > <FontAwesomeIcon icon={faPlus} /> Create Topic
                    </button>
                    : null
                    }
                </div>
                {showTopicForm && (
                    <CreateTopicForm  
                        setShowTopicForm={setShowTopicForm} />
                )}
                {topicList.map((topic) => (
                <div className='topic'>
                    <div className='topic-content'>
                        <div className='topics-title'><Link to={`/forum/topic/${topic.id}`} >{topic.title}</Link></div>
                        <div className='topic-info'>
                            <span className='user-name'>{topic.author_name}</span> <span className='creation-date'>{topic.createDate}</span>
                        </div>
                    </div>
                    <div className='topic-stats'>
                        <div>Comments: {topic.messageCount}</div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
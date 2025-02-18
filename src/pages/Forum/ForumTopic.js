import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { faTurnUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/ForumTopic.css'
import AuthService from "../../AuthService";


export default function ForumTopic() {

    const user = AuthService.getCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();

    const [ topic, setTopic] = useState({});
    const [ comments, setComments] = useState([]);

    const [ commentData, setCommenData] = useState({
            content: "",
            author_id: user ? user.id : null,
            topic_id: id
        })

    useEffect( () => {
        fetchTopic(id);
        fetchTopicComments(id);
    }, [])

    const fetchTopic = async (id) => {
        try {
            const response = await axios.get(`/topics/${id}`)
            setTopic(response.data)
        } catch (error) {
            console.error('Error retrieving topic: ', error)
        }
    }

    const fetchTopicComments = async (id) => {
        try {
            const response = await axios.get(`topic/${id}/comments`)
            setComments(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error retrieving comments: ', error)
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/comments/add', commentData)
            console.log(response.data)
            window.location.reload();
        } catch (error) {
            console.error("An error occured when posting comment, ", error)
        }
    }

    return(
        <div className="forum-comments-container">
            <h1 className='forum-title'>PcPartDatabase Forum</h1>
            <div className='comment-list'>
                <div className='topic-title-header-container'>
                    <button 
                    className="go-back-btn"
                    onClick={() => navigate(-1)}
                    ><FontAwesomeIcon icon={faTurnUp} /> Go Back</button>
                    <h2 className='topic-title'>{topic.title}</h2>
                </div>
                {comments?.map( (comment) => (
                    <div key={comment.id} className='comment'>
                        <div className='comment-content'>
                            <div className="comment-text-container">
                                <div className='comment-text'>{comment.content}</div>
                            </div>
                            <div className='comment-details'>
                                <div>
                                <span className='user-name'>{comment.author_name}</span>
                                </div> 
                                <span className='creation-date'>{comment.createTime}</span>
                            </div>
                            {/* {user ?
                                {comment.author_id === user.id && (
                                    <div>
                                        <button>edit</button>
                                        <button>delete</button>
                                    </div>
                                )} : null
                            } */}
                        </div>
                    </div>
                    ))}
                {user &&
                    <div>
                        <div>Add a comment</div>
                        <textarea 
                            className="comment-textarea"
                            placeholder="Type your comment here."
                            onChange={ (e) => setCommenData({...commentData, content: e.target.value})}
                            required
                        />
                        <div className="post-btn-container">
                            <button 
                                className="post-comment-btn"
                                onClick={handleSubmit}
                                >Post</button>
                        </div>
                    </div>
                }   
            </div>
        </div>
    )

}
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

    const [ editingCommentId, setEditingCommentId ] = useState(null);
    const [ topic, setTopic] = useState({});
    const [ comments, setComments] = useState([]);

    const [ commentData, setCommentData] = useState({
            content: "",
            author_id: user ? user.id : null,
            topic_id: id
        })

    useEffect( () => {
        fetchTopic(id);
        fetchTopicComments(id);
    }, [])

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setCommentData({
            content: comment.content,
            author_id: comment.author_id,
            topic_id: comment.topic_id
        })
    };

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

    const handleEdit = async (commentId) => {
        try {
            const respone = await axios.put(`/comments/${commentId}`, commentData);
            setEditingCommentId(null);
            console.log(respone.data)
            fetchTopicComments(commentData.topic_id);
        } catch (error) {
            console.error("Error when editing comment: ", error);
        }
    }

    const handleContentChange = (event, id) => {
        setCommentData((prev) => ({
            ...prev,
            content: event.target.value
        }))
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/comments/add', commentData)
            console.log(response.data)
            fetchTopicComments(commentData.topic_id);
        } catch (error) {
            console.error("An error occured when posting comment, ", error)
        }
    }

    const handleCancel = () => {
        setEditingCommentId(null);
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this comment?")) {
            try {
                const response = await axios.delete(`/comments/${id}`);
                console.log(response.data);
                fetchTopicComments(commentData.topic_id);
                alert("Comment deleted successfully!");
            } catch (error) {
                console.log("Error occured when deleting comment: ", error)
            }
        }
    }

    const handleTopicDelete = async (topicId) => {
        if(window.confirm("Are you sure you want to delete this topic?")) {
            console.log(topic)
            try {
                const response = await axios.delete(`/topics/${topicId}`);
                console.log(response.data);
                navigate(-1)
                alert("Topic deleted successfully!");
            } catch (error) {
                console.log("Error occured when deleting comment: ", error)
                alert("Topic deletion failed!")
            }
        }
    }


    return(
        <div className="forum-comments-container">
            <h1 className='forum-title'>PcPartDatabase Forum</h1>
            <div className='comment-list'>
                <div className='topic-title-header-container'>
                    <div className="header-btn-group">
                        <button 
                        className="go-back-btn"
                        onClick={() => navigate(-1)}
                        ><FontAwesomeIcon icon={faTurnUp} /> Go Back</button>
                        {user && ( topic.author_id === user.id || user.roles.includes('ROLE_ADMIN')) && (
                        <button onClick={ () => handleTopicDelete(commentData.topic_id) }>Delete topic</button>
                        )}
                    </div>
                    <h2 className='topic-title'>{topic.title}</h2>
                </div>
                {comments?.map( (comment) => (
                    <div key={comment.id} className='comment'>
                        
                        <div className='comment-content'>
                            <div className="comment-text-container">
                            {editingCommentId === comment.id ? (
                                <textarea
                                id={comment.id}
                                className="comment-text"
                                value={commentData.content}
                                onChange={(event) => handleContentChange(event)}
                                ></textarea>
                                ) : ( 
                                    <div>{comment.content}</div>
                                )
                            }
                            </div>
                            <div className='comment-details'>
                                <div>
                                    <span className='user-name'>{comment.author_name}</span>
                                </div> 
                                    <span className='creation-date'>{comment.createTime}</span>
                            </div>
                                {user && (comment.author_id === user.id || user.roles.includes('ROLE_ADMIN')) && (
                                    editingCommentId === comment.id ? 
                                    <div>
                                        <button onClick={ () => handleEdit(comment.id)}>Save</button> <button onClick={ () => handleCancel()}>Cancel</button>
                                        
                                    </div>
                                    : 
                                    <div>
                                        <button onClick={ () => handleEditClick(comment)}>Edit</button> <button onClick={ () => handleDelete(comment.id)}>Delete</button>
                                    </div>
                                    
                                )}
                        </div>                   
                    </div>
                    ))}
                {user &&
                    <div>
                        <div>Add a comment</div>
                        <textarea 
                            className="comment-textarea"
                            placeholder="Type your comment here."
                            onChange={ (e) => setCommentData({...commentData, content: e.target.value})}
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
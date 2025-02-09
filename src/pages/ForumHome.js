import './styles/Forum.css'


export default function ForumHome() {

    return (
        <div className="forum-container">
            <h1 className='forum-title'>PcPartDatabase Forum</h1>
            
            <div className='topic-list'>
            <h2 className='topic-list-title'>Discussions</h2>
                <div className='topic'>
                    <div className='topic-content'>
                        <div className='topic-title'>This is my first topic!</div>
                        <div className='topic-info'>
                            <span className='user-name'>User43</span> <span className='creation-date'>Today 17:34PM</span>
                        </div>
                    </div>
                    <div className='topic-stats'>
                        <div>Comments: 13</div>
                    </div>
                </div>
                <div className='topic'>
                    <div className='topic-content'>
                        <div className='topic-title'>How to assemble a pc.</div>
                        <div className='topic-info'>
                            <span className='user-name'>User1563</span> <span className='creation-date'>Today 19:34PM</span>
                        </div>
                    </div>
                    <div className='topic-stats'>
                        <div>Comments: 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
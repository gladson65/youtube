

function VideoCard(props) {

    const { title, thumbnailUrl, views, channelId, channelPic } = props.data;

    return (
        <>
            <div>
                <img className="rounded-xl" src={thumbnailUrl}/>
                <div className="flex gap-4 w-full">
                    <img src={channelPic} className="w-14 h-14 rounded-full"/>
                    <div>
                        <h2>{title}</h2>
                        <h3>{channelId}</h3>
                        <p>{views} views</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard;
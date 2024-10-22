

function ChannelVideoCard(props) {

    const { thumbnailUrl, channelPic, title, channelId, views } = props.video;

    return (
        <>
            <div className="h-full">

                <div className="h-64 overflow-hidden">
                        <img className="rounded-xl h-full w-full" src={thumbnailUrl}/>
                </div>
                <div className="flex gap-4 w-full mt-4">
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

export default ChannelVideoCard;
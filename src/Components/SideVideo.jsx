

function SideVideo(props) {

    const { data } = props;

    return (
        <div className="w-full h-42 flex gap-1">
            <div className="h-full w-full overflow-hidden">
                <img className="rounded-xl h-full w-full" src={data.thumbnailUrl}/>
            </div>
            <div className="flex justify-start pl-2 flex-col gap-1 w-full text-sm">   
                <div>
                    <h2 className="text-lg">{data.title}</h2>
                    <h3>{data.channelId}</h3>
                    <p>{data.views} views</p>
                </div>
            </div>
        </div>
    )
}

export default SideVideo;
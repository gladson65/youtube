import "../App.css"
import { useParams } from "react-router-dom";
import useGet from "../Utils/useGet.js";
import useFetch from "../Utils/useFetch.js";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import SideVideo from "./SideVideo.jsx";
import Comments from "./Comments.jsx";
import { findDay } from "../Utils/day.js";


function VideoPlayer() {

    // getting dynamic id
    const videoId = useParams();
   
    // state variables
    const [ videoData, setVideoData ] = useState([]);
    const [ contents, setContents ] = useState([]);
    const [ comment, setComment ] = useState("");
    const [ flag, setFlag ] = useState(false);
    const [ day , setDay ] = useState(0);

    const { getData, getError, getLoading } = useGet(`http://localhost:7100/video/${videoId.id}`);
    const { data } = useFetch('http://localhost:7100/content');


    function addComment(e) {
        e.preventDefault();
        const response = fetch(`http://localhost:7100/addcomment/${videoId.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({text: comment})
        });

        const result = response.then((data) => {
            return data.json()
        })

        result.then((data) => {
            console.log(data);
        })

    }
    

    useEffect(()=> {

        if (getData) {
            setVideoData(getData.data);
            setFlag(true)
            setDay(findDay(videoData.uploadDate))
            // console.log("inside", videoData);
        }

        if (data) {
            setContents(data);
        }

    },[getData, data])

    
   
    return (
        <>
            {
                videoData && flag ?
                
                <>
                
                <section className="videoSection w-screen h-auto flex justify-center gap-7 pb-32 ">

                    {/* react video player */}
                    <div className="reactPlayer w-11/12 lg:w-3/5 h-auto pb-32 mt-2">
                        <ReactPlayer 
                            width='100%'
                            height='550px'
                            url={`${videoData.videoUrl}`}
                            controls
                        />

                        <div className="w-full h-32 flex justify-between items-center px-2">
                            <div>
                                <h1>{videoData.title}</h1>
                                <div className="flex items-center">
                                    <img src={videoData.channelPic} className="w-14 rounded-full"/>
                                    <div>
                                        <h1>{videoData.uploader}</h1>
                                        <p>{videoData.subscriber} subscriber</p>
                                    </div>
                                    <button className="py-2 px-3 rounded-full bg-slate-200">subscribe</button>
                                </div>
                            </div>

                            <div className="video-buttons flex justify-end items-center lg:gap-3 w-6/12 lg:w-3/5">
                                <button>Likes</button>
                                <button>Shares</button>
                                <button>Download</button>
                                <button>Clip</button>
                            </div>

                        </div>

                        <div className="descriptionSection w-full h-auto pb-10 px-2 rounded-xl overflow-hidden">
                            <h2>{videoData.views} views 
                                <span className="ml-3">{day > 1 ? `${day} days ago` : `${day} day ago`}</span>
                            </h2>
                            <p className="mt-2">{videoData.description}</p>
                        </div>

                        <div className="commentSection w-full h-auto pb-10 px-2 rounded-xl overflow-hidden">
                            <div className="flex justify-start items-center gap-20 mt-2">
                                <h1 className="text-xl">{videoData.length > 0 && videoData.comments.length <= 1 ? `${videoData.comments.length} Comment` : 
                                    `${videoData.comments.length} Comments` }</h1>
                                <button className="bg-white py-1 px-4 rounded-2xl">
                                    <i className="fa-sharp fa-regular fa-bars-sort pr-2">[]</i>
                                    Short by
                                </button>    
                            </div>

                            <div className="commentBox flex gap-7 mt-7">
                                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" width="50px" className="h-12 rounded-full" />
                                
                                <div className="w-full">
                                    
                                    <input onChange={(e)=> setComment(e.target.value)} type="text" placeholder="Add a comment..." 
                                        className="w-full border-x-0 border-t-0 focus:border-b-4 focus:border-b-sky-200 outline-none h-10 px-3"/>
                                    
                                    <div className="flex justify-between items-center">
                                        <span><i className="fa-regular fa-face-smile-beam"></i></span>
                                        <div className="w-1/3 py-2 flex justify-between items-center px-2">
                                            <button className="bg-white py-1 px-4 rounded-2xl">Cancel</button>
                                            <button onClick={addComment} className="bg-white hover:bg-slate-200 py-1 px-4 rounded-2xl">Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comments mt-7">
                                {
                                    videoData.comments.map((comment, i) => {
                                        return <Comments key={i} comment={comment}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="videoAside hidden lg:block lg:w-1/3 h-auto pb-32 flex flex-col">

                        {/* filter buttons */}
                            
                        <div className="flex flex-wrap justify-start items-center lg:w-screen gap-2 cursor-pointer py-2">
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">All</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Web Development</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Javascript</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Data Structures</div>
                        </div>

                        <div className="sideVideos mx-2 flex flex-col gap-4">

                            {
                                contents.length >= 1 ?

                                contents.map((video, i) => {
                                    return <SideVideo key={i} data={video}/>
                                })

                                :

                                ""
                            }

                        </div>

                    </div>

                </section>
                </>
                :
                ""
            }
        </>
    )
}

export default VideoPlayer;
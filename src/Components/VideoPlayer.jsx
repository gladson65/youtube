import "../App.css"
import { useParams } from "react-router-dom";
import useGet from "../Utils/useGet.js";
import useFetch from "../Utils/useFetch.js";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import SideVideo from "./SideVideo.jsx";
import { useOutletContext } from "react-router-dom";
import Comments from "./Comments.jsx";
import { findDay } from "../Utils/day.js";


function VideoPlayer() {


    // getting username from localstorage
    const username = localStorage.getItem('username')

    // getting dynamic id
    const videoId = useParams();
   
    // state variables
    const [ videoData, setVideoData ] = useState([]);
    const [ contents, setContents ] = useState([]);
    const [ comments, setComments ] = useState([])
    const [ channelName, setChannelName ] = useState("")
    const [ commentUpdate, setCommentUpdate ] = useState(false);
    const [ comment, setComment ] = useState("");
    const [ subscribe, setSubscribe ] = useState(false);
    const [ flag, setFlag ] = useState(false);
    const [ day , setDay ] = useState(0);
    const context = useOutletContext();
    const [ commentError, setCommentError ] = useState(false);

    const { getData, getError, getLoading } = useGet(`http://localhost:7100/video/${videoId.id}`);
    const { data } = useFetch('http://localhost:7100/content');



    function getComment() {
                    
        const response = fetch(`http://localhost:7100/comments/${videoId.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = response.then((data)=> {
            return data.json()
        })

        result.then((data) => {
            setComments(data)
            
        })
    }

    // get channel name
    function getChannelName() {

        const response = fetch(`http://localhost:7100/user/${getData.data.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = response.then((data)=> {
            return data.json()
        })

        result.then((data) => {
            setChannelName(data.channeldata.name);
            
        })
        
    }
    
    
    


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
            return data.json();
        })

        result.then((data) => {

            if (data) {
                if(data.key == 'error') {
                    setCommentError(true);
                }
                if (data.message == 'Comments successfully updated') {
                    setCommentError(false);
                }
                
                getComment()

            }

        })

    }


    // cancel comment
    function cancelComment() {
        document.querySelector(".commentInput").value = "";
        setComment("");
    }

    // subscribe function
    function subscribeFunc() {
        setSubscribe(!subscribe)
    }
    

    useEffect(()=> {

        getComment()

        if (getData) {
            setVideoData(getData.data);
            setFlag(true)
            setDay(findDay(Date(videoData.uploadDate)))
            getChannelName();
            
        }

        if (data) {
            setContents(data);
        }

    },[getData, data, commentUpdate])

    
   
    return (
        <>
            {
                videoData && flag ?
                
                <>
                
                <section className="videoSection w-screen h-auto flex justify-center gap-7 pb-32 relative">

                    {
                        context[0] &&
                        
                        <>
                        {/* sidebar */}
                        <div className={`sidebar w-12 md:w-36 flex flex-col gap-7 h-screen ml-7 absolute left-1 bg-white
                            drop-shadow-[10px_10px_10px_black] transition-all`}>
                            <div className="flex flex-col items-start gap-2 pt-4">
                                <button className="rounded-full p-2 w-full flex items-center gap-2"><span><i className="fa-solid fa-house"></i></span>
                                    <span className="hidden md:inline">Home</span>
                                </button>
                                <button className="rounded-full p-2 w-full flex items-center gap-2">
                                    <img src="..\src\assets\shorts.png" className="w-5"/>
                                    <span className="hidden md:inline">Shorts</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\subscriptions.png" className="w-5"/>
                                    <span className="hidden md:inline">Subscriptions</span>
                                </button>
                            </div>

                            <div className="flex flex-col items-start gap-2">
                                <button className="rounded-full p-2 w-full flex items-center gap-2">
                                    <img src="..\src\assets\you.png" className="w-5"/>
                                    <span className="hidden md:inline">You</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\history.png" className="w-5"/>
                                    <span className="hidden md:inline">History</span>
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <button className={`bg-sky-200 rounded-full p-2 mb-2 mx-1`}><span><i className="fa-regular fa-user pr-2 w-4"></i></span>
                                    <span className="hidden md:inline">
                                        { localStorage.getItem("login") == 'true' ? username : "Sign in"}
                                    </span>
                                </button>
                            </div>

                            <div className="flex flex-col items-start gap-2">
                                <h2 className="w-full hidden md:inline">Explore</h2>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\trending.png" className="w-5"/>
                                    <span className="hidden md:inline">Trending</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\shopping.png" className="w-5"/>
                                    <span className="hidden md:inline">Shopping</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\music.png" className="w-5"/>
                                    <span className="hidden md:inline">Music</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\movies.png" className="w-5"/>
                                    <span className="hidden md:inline">Movies</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\live.png" className="w-5"/>
                                    <span className="hidden md:inline">Live</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\gaming.png" className="w-5"/>
                                    <span className="hidden md:inline">Gaming</span>
                                </button>
                                <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                                    <img src="..\src\assets\news.png" className="w-5"/>
                                    <span className="hidden md:inline">News</span>
                                </button>
                            </div>
                        </div>
                        </>


                    }
                    

                    {/* react video player */}
                    <div className="reactPlayer w-11/12 lg:w-3/5 h-auto pb-32 mt-2">
                        <ReactPlayer 
                            width='100%'
                            height='550px'
                            url={`${videoData.videoUrl}`}
                            controls
                        />

                        <h1 className="text-2xl pt-2">{videoData.title}</h1>
                        <div className="w-full h-32 flex justify-between items-center px-2">
                            <div>
                                <div className="flex items-center justify-start gap-2">
                                    <img src={videoData.channelPic} className="w-14 rounded-full cursor-pointer"/>
                                    <div className="">
                                        <h1 className="text-sm">{channelName}</h1>
                                        <p>{videoData.subscriber} subscriber</p>
                                    </div>
                                    <button onClick={subscribeFunc} className={`py-1 px-3 rounded-full bg-slate-200 hover:bg-sky-200
                                        ${subscribe && "bg-red-500 text-white hover:bg-black"}`}>
                                        { subscribe ? "subscribed" : "subscribe"}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="video-buttons flex justify-end items-center gap-2 lg:gap-3 w-6/12 lg:w-3/5">
                                <button className="hover:bg-sky-200 hidden md:block">Likes</button>
                                <button className="hover:bg-sky-200">Shares</button>
                                <button className="hover:bg-sky-200">Download</button>
                                <button className="hover:bg-sky-200 hidden md:block">Clip</button>
                            </div>

                        </div>
                        
                        {/* video description */}
                        <div className="descriptionSection bg-slate-200 overflow-hidden w-full h-auto pb-10 px-2 rounded-xl overflow-hidden">
                            <h2>{videoData.views} views 
                                <span className="ml-3">{day > 1 ? `${day} days ago` : `Published Today`}</span>
                            </h2>
                            <p className="mt-2">{videoData.description}</p>
                        </div>

                        {/* comment section */}
                        <div className="commentSection w-full h-auto pb-10 px-2 rounded-xl overflow-hidden">
                            <div className="flex justify-start items-center gap-20 mt-2">
                                <h1 className="text-xl">{videoData.length > 0 && videoData.comments.length <= 1 ? `${comments.length} Comment` : 
                                    `${comments.length} Comments` }</h1>
                                <button className="bg-white py-1 px-4 rounded-2xl">
                                    <i className="fa-sharp fa-regular fa-bars-sort pr-2">[]</i>
                                    Short by
                                </button>    
                            </div>

                            <div className="commentBox flex gap-7 mt-7 bg-green-100 rounded-xl p-1">
                                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" width="50px" className="h-12 rounded-full" />
                                
                                <div className="w-full">
                                    
                                    <input onChange={(e)=> setComment(e.target.value)} type="text" placeholder="Add a comment..." 
                                        className={`commentInput w-full border-x-0 border-t-0 focus:border-b-4 focus:border-b-sky-200 outline-none h-10 px-3
                                                ${commentError && "border-b-4 border-red-500"} rounded-tr-lg`}/>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className=""><i className="fa-regular fa-face-smile-beam fa-2x overflow-hidden"></i></span>
                                        <div className="w-1/3 py-2 flex justify-between items-center px-2">
                                            <button onClick={cancelComment} className="bg-white py-1 px-4 rounded-2xl hover:bg-slate-200">Cancel</button>
                                            <button onClick={addComment} className="bg-white hover:bg-slate-200 py-1 px-4 rounded-2xl">Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="comments mt-7">
                                {
                                    comments.map((comment, i) => {
                                        return <Comments key={i} comment={comment} videoId={videoId} setCommentUpdate={setCommentUpdate} 
                                        commentUpdate={commentUpdate}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="videoAside hidden lg:block lg:w-1/3 h-auto pb-32 flex flex-col">

                        {/* filter buttons */}
                            
                        <div className="flex flex-wrap justify-start items-center lg:w-screen gap-2 cursor-pointer py-2">
                            <div className="bg-slate-200 hover:bg-sky-200 px-2 py-1 rounded-xl">All</div>
                            <div className="bg-slate-200 hover:bg-sky-200 px-2 py-1 rounded-xl">Web Development</div>
                            <div className="bg-slate-200 hover:bg-sky-200 px-2 py-1 rounded-xl">Javascript</div>
                            <div className="bg-slate-200 hover:bg-sky-200 px-2 py-1 rounded-xl">Data Structures</div>
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
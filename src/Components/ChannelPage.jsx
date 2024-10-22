import { useState, useEffect } from "react";
import ChannelVideoCard from "./ChannelVideoCard";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function ChannelPage() {

    // getting data from local storage
    let username = localStorage.getItem('username')
    let email = localStorage.getItem('email');

    // store channelId
    const [ chId, setChannelId] = useState("");

    // store channel videos
    const [ channelVideos, setChannelVideos ] = useState([]);

    // store channel name
    const [ channelName, setChannelName ] = useState("");

    // store msg
    const [ msg, setMsg ] = useState(false);

    // flag for have channel/ don't
    const [ isChannel, setIsChannel ] = useState(false);

    // props through outlet
    const context = useOutletContext();


    // get user function
    function getUser() {

        const response = fetch(`http://localhost:7100/user/${email}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = response.then((data) => {
            return data.json()
        })

        result.then((data) => {
            
            setChannelId(data.data[0].channelId)
            setChannelName(data.channeldata.name)
            // console.log(data);
        })

    } 


    // get channel name
    function getChannel() {

        const response = fetch(`http://localhost:7100/checkuser/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = response.then((data)=> {
            return data.json()
        })

        result.then((data) => {
            setIsChannel(!isChannel);
            
        })
        
    }

    // get content by using channelId
    function getContent() {

        const response = fetch(`http://localhost:7100/videos/${chId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            setChannelVideos(data);
            console.log(data);
        })
    }

    function info() {
        setMsg(!msg);
    }


    useEffect(() => {
        getUser();
        getChannel()
        setTimeout(()=> {
            getContent();
            info()
        }, 1000)
    }, [chId])


    return (
        <>
            <section className="channlePage w-screen h-auto flex justify-center relative">

            {
                context[0] &&
                
                <>
                {/* sidebar */}
                <div className={`sidebar w-12 md:w-36 flex flex-col gap-7 h-screen ml-7 absolute left-1 bg-white
                    drop-shadow-[10px_10px_10px_black] transition-all`}>
                    <div className="flex flex-col items-start gap-2 pt-4">
                        <Link to="/" className="overflow-y-hidden">
                            <button className="rounded-full p-2 w-full flex items-center gap-2"><span><i className="fa-solid fa-house"></i></span>
                                <span className="hidden md:inline">Home</span>
                            </button>
                        </Link>
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



                
                { channelVideos.length > 0 ?
                <>
                <div className="w-11/12 h-auto mb-12 flex flex-col items-center justify-start gap-12">
                    <div className="profile-image bg-white w-full h-52 lg:h-60 py-7 flex flex-col justify-center items-center">
                        
                        <img src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/05/YoutubeBannerTemplate2.png"
                            className="cover w-full rounded-xl"/>
                        
                    </div>
                    
                    
                        
                        

                    <div className="flex justify-start gap-7 w-full px-3">
                            <div className="w-52 rounded-full">
                                <img src={`${channelVideos[0].channelPic}`} alt="Channel-Image"
                                    className="w-full h-full"/>
                            </div>

                            <div>
                                <h1 className="text-4xl py-2">{channelName}</h1>
                                <span>{channelVideos[0].email}</span> . 
                                <span className="ml-1">{channelVideos[0].subscriber} subscriber</span> . 
                                <span className="ml-1">{channelVideos.length} videos</span>
                                <br />
                                
                                <button className="mt-4 bg-black hover:bg-red-500 text-white px-2 py-1 rounded-2xl">Subscribe</button>
                                
                                
                            </div>
                        </div>

                        <div className="flex justify-start items-center gap-7 w-full px-3 py-1">
                            <button className="mt-4 bg-slate-200 px-3 py-1 rounded-2xl">Home</button>
                            <button className="mt-4 md:block bg-slate-200 px-3 py-1 rounded-2xl">Videos</button>
                            <button className="mt-4 md:block bg-slate-200 px-3 py-1 rounded-2xl">Shorts</button>
                            <button className="mt-4 hidden sm:block bg-slate-200 px-3 py-1 rounded-2xl">Live</button>
                            <button className="mt-4 hidden sm:block bg-slate-200 px-3 py-1 rounded-2xl">Playlists</button>
                            <button className="mt-4 hidden md:block bg-slate-200 px-3 py-1 rounded-2xl">Community</button>
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        <div  className="flex justify-start items-center gap-7 w-full px-3 py-1 border-t-2 border-sky-200">
                            <button className="mt-4 bg-black text-white px-3 py-1 rounded-2xl">Latest</button>
                            <button className="mt-4 bg-slate-200 px-3 py-1 rounded-2xl">Popular</button>
                            <button className="mt-4 bg-slate-200 px-3 py-1 rounded-2xl">Oldest</button>
                        </div>
                        <div className="w-full h-auto pb-12 grid grid-cols-1 lg:grid-cols-3 gap-7 px-7 sm:px-20 lg:px-4">
                            
                            {
                                channelVideos.map((video, i) => {
                                    return <ChannelVideoCard key={i} video={video} />
                                })
                            }
                        </div>


                    
                </div>

                </>
                :
                <>
                    <div className="p-2 w-full h-auto text-center">
                        {
                            isChannel ?
                            <>

                            {
                               channelVideos.length > 0 ?
                               <h1 className="text-3xl py-2">Please upload video first</h1>
                               :
                               <h1 className="text-3xl py-2">Loading...</h1>
                            }
                            
                            </>
                            
                            :
                            <h1 className="text-3xl py-2">{msg ? "Please Create A Channel" : "Loading..."}</h1>
                        }
                        
                    </div>
                </>
                }
            </section>
        </>
    )
}

export default ChannelPage;
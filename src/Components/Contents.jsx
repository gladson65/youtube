import SideBar from "./SideBar";
import PageStartMessage from "./PageStart.jsx";
import useFetch from "../Utils/useFetch.js";
import VideoCard from "./VideoCard";
import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";


function Contents(props) {



    const { setIsLogIn, isSideBar } = props;
    const [content, setContent] = useState([]);
    

    // API call 
    const { data, error, loading } = useFetch("http://localhost:7100/content")
    

    useEffect(()=> {
        
        if (data) {
            setContent(data)
        }

        if (content.length  >= 1) {
            setIsLogIn(true);       
        }
        else if (content.length <= 0) {
            setIsLogIn(false);
        }

        else if (data.message == 'jwt expired') {
            localStorage.setItem('login', 'false');
        }

        

    }, [data])

    if (data && data.message == 'jwt expired') {
        location.reload;
    }



    return(
        <>
            <div className="w-screen h-auto pb-20 flex gap-4">
                
                {
                    isSideBar &&
                    <SideBar />                           
                    
                }

                {
                    content.message == "token is not present" || content.message == "jwt expired" || content.message == "jwt malformed" ?

                    <div className="mx-auto h-32 bg-white p-6 rounded-xl mt-12 text-center drop-shadow-[0_35px_10px_rgba(0,0,0,0.25)]">
                        <PageStartMessage />
                    </div>
                    
                    :

                    <>
                    {/* homepage video contents */}
                    <section className={`content relative grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-20
                            sm:px-24 md:px-10 mt-2 pt-16 pb-60
                            ${isSideBar == true ? "w-3/4 lg:grid-cols-2 xl:grid-cols-2 gap-10" : "w-full"}`}>

                        {/* filter buttons */}
                        
                        <div className="filter flex flex-wrap justify-start items-center lg:w-screen py-2 gap-2">
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">All</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Web Development</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Javascript</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Data Structures</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">MongoDB</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Node.Js</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">React.Js</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Information Technology</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Gaming</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Live</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Music</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Living Room</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Villages</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">First Class Traveling</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Guitar Practice</div>
                            <div className="bg-slate-200 px-2 py-1 rounded-xl">Music Theory</div>
                        </div>

                            
                            


                        {/* All video contents */}
                        {
                            content.length  >= 1 ? 
                            content.map((data, i) => {
                                return <Link key={i} to={`/video/${data.videoId}`}><VideoCard key={i} data={data}/></Link>
                            })
                            :
                            ""
                        
                        }
                    </section>
                    </>


                }
            </div>
        </>
    )
}

export default Contents;
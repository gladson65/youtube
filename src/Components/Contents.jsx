import SideBar from "./SideBar";
import { SampleData } from "../Utils/SampleData";
import VideoCard from "./VideoCard";
import { useState, useEffect } from "react";
import "../App.css";


function Contents(props) {

    const { isSideBar } = props;
    const [data, setData] = useState([]);

    useEffect(()=> {
        setData(SampleData);
    }, [data])

    return(
        <>
            <div className="w-screen h-auto flex gap-4">
                {
                    isSideBar &&
                    <SideBar />
                }

                
                {/* homepage video contents */}
                <section className={`content relative grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-20
                        sm:px-24 md:px-10 mt-2 pt-16
                        ${isSideBar ? "w-3/4 lg:grid-cols-2 xl:grid-cols-2 gap-10" : "w-full"}`}>

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



                    {
                        data && 
                        data.map((data) => {
                            return <VideoCard key={data.videoId} data={data}/>
                        })
                    }
                </section>
            </div>
        </>
    )
}

export default Contents;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contentModel from "../NodeJs/Model/contents.model.js";
import useFetch from "../Utils/useFetch.js";
import { useNavigate } from "react-router-dom";
import "../App.css";



function Header(props) {


    // API call 
    const { data, error, loading } = useFetch("http://localhost:7100/content")

    const {isSideBar, setIsSideBar, setFilteredContent} = props;
    const [ searchText, setsearchText ] = useState("");
    const [ showProfile, setShowProfile ] = useState(false);
    const [ ownProfile, setOwnProfile ] = useState(false);

    // for navigation to another page
    const navigate = useNavigate();

    // getting username from localstorage
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');

    // count variable
    let count = 0;
    
    function checkChannel() {

        const response = fetch(`http://localhost:7100/checkuser/${email}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            if (data.email == email) {
                setOwnProfile(!ownProfile)
            }
        })
    }

    checkChannel();
   



    
    
    function toggleSideBar() {
        setIsSideBar(!isSideBar);
    }

    function searchContent() {


        if (data) {
            const filteredData = data.filter((video)=> {
                return video.title.toLowerCase().includes(searchText.toLowerCase());
            })

            if (filteredData.length > 0) {
                setFilteredContent(filteredData);
                document.querySelector('.text').value = "";
        
            }
            
            
        }


    }

    useEffect(()=> {
        if (localStorage.getItem("login") == 'true') {
            setShowProfile(true);
        }
    }, [])




    return (
        <>
            <header className="w-screen h-auto flex justify-between items-center py-7 px-12 relative">

                <div className="icon flex justify-between items-center w-32">
                    <i onClick={toggleSideBar} className="fa-solid fa-bars cursor-pointer hover:bg-slate-200"></i>
                    <img className="rounded-xl" src="..\src\assets\u-icon.png" width="75px"/>
                </div>

                <div className="searhBar w-6/12 relative">
                    
                    <input onChange={((e)=> setsearchText(e.target.value))} type="text" placeholder="Search" className="text border-2 pl-3 py-1 outline-none rounded-full w-full"/>
                    
                    <button onClick={searchContent} className="px-4 bg-slate-100 cursor-pointer hover:bg-sky-200"><i className="fa-solid fa-magnifying-glass"></i></button>

                </div>
                <div className="mic px-2 py-1 bg-slate-200 rounded-full hidden xl:block cursor-pointer hover:bg-sky-200">
                    <span><i className="fa-solid fa-microphone"></i></span>
                </div>


                {
                    showProfile ? 
                    <>
                        <Link to={ ownProfile ? '/channelpage' : `/createchannel`}>
                            <div className="auth flex items-center w-auto flex hidden md:flex justify-end gap-12">
                                <i className="fa-solid fa-ellipsis-vertical hidden lg:block"></i>
                                <button className="bg-slate-200 rounded-full p-2 hover:bg-sky-200 py-1">
                                    
                                    { localStorage.getItem("login") == 'true' ? username : "Sign in"}
                                </button>
                            </div>
                        </Link>
                    
                    </>
                    :
                    <>
                        <Link to="/sign-in">
                            <div className="auth flex items-center w-auto hidden md:flex flex justify-end gap-12">
                                <i className="fa-solid fa-ellipsis-vertical hidden lg:block"></i>
                                <button className="bg-slate-200 rounded-full p-2 hover:bg-sky-200 py-1">
                                    <span><i className={`fa-regular fa-user pr-2
                                        ${localStorage.getItem("login") == 'true' ? "hidden": ""}`}></i></span>
                                    
                                    { localStorage.getItem("login") == 'true' ? username : "Sign in"}
                                </button>
                            </div>
                        </Link>
                    </>

                }

                
            </header>
        </>
    )
}

export default Header;
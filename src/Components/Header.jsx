import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";



function Header(props) {

    const {isSideBar, setIsSideBar} = props;
    const [signIn, setIsSignIN] = useState(false);

    function toggleSideBar() {
        setIsSideBar(!isSideBar);
    }


    return (
        <>
            <header className="w-screen h-auto flex justify-between items-center py-7 px-12 relative">

                <div className="icon flex justify-between items-center w-32">
                    <i onClick={toggleSideBar} className="fa-solid fa-bars cursor-pointer"></i>
                    <img src="src\assets\u-icon.png" width="75px"/>
                </div>

                <div className="searhBar w-6/12 relative">
                    
                    <input type="text" placeholder="Search" className="border-2 pl-3 py-1 outline-none rounded-full w-full"/>
                    
                    <button className="px-4 bg-slate-100 cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></button>

                </div>
                <div className="mic px-2 py-1 bg-slate-200 rounded-full">
                    <span><i className="fa-solid fa-microphone"></i></span>
                </div>

                <Link to="/sign-in">
                    <div className="auth flex items-center w-32 flex justify-between">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <button className="bg-slate-200 rounded-full p-2 hover:bg-sky-200"><span><i className="fa-regular fa-user pr-2"></i></span>Sign in</button>
                    </div>
                </Link>
            </header>
        </>
    )
}

export default Header;
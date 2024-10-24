import "../App.css";
import { Link } from "react-router-dom";


function SideBar() {

    // getting username from localstorage
    const username = localStorage.getItem('username')

    return(
        <>
            <div className={`sidebar w-20 sm:w-10 md:w-36 flex flex-col gap-7 h-screen ml-7`}>
                <div className="flex flex-col items-start gap-2 pt-4 overflow-hidden">
                    <Link to="/" className="w-auto overflow-hidden">
                        <button className="rounded-full p-2 w-full flex items-center gap-2"><span><i className="fa-solid fa-house"></i></span>
                            <span className="hidden md:inline">Home</span>
                        </button>
                    </Link>
                    <button className="rounded-full p-2 w-full flex items-center gap-2">
                        <img src="src\assets\shorts.png" className="w-5"/>
                        <span className="hidden md:inline">Shorts</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\subscriptions.png" className="w-5"/>
                        <span className="hidden md:inline">Subscriptions</span>
                    </button>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <button className="rounded-full p-2 w-full flex items-center gap-2">
                        <img src="src\assets\you.png" className="w-5"/>
                        <span className="hidden md:inline">You</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\history.png" className="w-5"/>
                        <span className="hidden md:inline">History</span>
                    </button>
                </div>

                <div className="flex flex-col">
                    <Link to="/sign-in" className="py-2 overflow-hidden">
                        <button className={`bg-sky-200 rounded-full p-2 mb-2`}><span><i className="fa-regular fa-user pr-2 w-4"></i></span>
                            <span className="hidden md:inline">
                                { localStorage.getItem("login") == 'true' ? username : "Sign in"}
                            </span>
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <h2 className="w-full hidden md:inline">Explore</h2>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\trending.png" className="w-5"/>
                        <span className="hidden md:inline">Trending</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\shopping.png" className="w-5"/>
                        <span className="hidden md:inline">Shopping</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\music.png" className="w-5"/>
                        <span className="hidden md:inline">Music</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\movies.png" className="w-5"/>
                        <span className="hidden md:inline">Movies</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\live.png" className="w-5"/>
                        <span className="hidden md:inline">Live</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\gaming.png" className="w-5"/>
                        <span className="hidden md:inline">Gaming</span>
                    </button>
                    <button className="rounded-full p-2 w-full mb-2 flex items-center gap-2">
                        <img src="src\assets\news.png" className="w-5"/>
                        <span className="hidden md:inline">News</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SideBar;
import Contents from "./Contents";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";



function Home() {

    
    const [ isLogIn, setIsLogIn ] = useState(false);
    const [ isSideBar ] = useOutletContext();


    return(
        <>
            {/* <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar} isLogIn={isLogIn}/> */}
            <Contents setIsLogIn={setIsLogIn} isSideBar={isSideBar}/>
        </>
    )
}

export default Home;
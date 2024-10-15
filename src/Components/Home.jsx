import Header from "./Header";
import Contents from "./Contents";
import { useState } from "react";

function Home() {

    const [isSideBar, setIsSideBar] = useState(false);

    return(
        <>
            <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar}/>
            <Contents isSideBar={isSideBar}/>
        </>
    )
}

export default Home;
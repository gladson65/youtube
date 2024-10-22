import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateChannel() {

    // use navigate
    const navigate = useNavigate();

    // getting email from local storage
    const email = localStorage.getItem("email");

    // set name
    const [ name, setName ] = useState("");
    // set handleName
    const [ handle, setHandle ] = useState("");

    let handleName = name.split(" ")
    

    function channel() {

        

        const response = fetch(`http://localhost:7100/channel/${email}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: name, handle: handle}),
        });

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            if(!data.key) {
                navigate("/")
            }
            
            console.log(data);
            
        })
        
        
    }

    function viewChannel() {
        navigate("/channelpage");
    }

    

    return (
        <>
            <section className="channlePage w-screen h-auto pb-12 flex justify-center">
                <div className="w-4/5 h-auto mb-12 pb-12 flex flex-col items-center justify-start pt-7 gap-12">
                    <div className="profile-image bg-white w-4/5 h-auto py-7 flex flex-col justify-center items-center">
                        <div className="w-32 h-32 rounded-full bg-slate-200 drop-shadow-[0px_10px_10px_black]">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"/>
                        </div>
                        <h1 className="mt-4 text-blue-500 hover:underline cursor-pointer">
                            Select Picture
                        </h1>
                    </div>

                    <div className="bg-slate-100 w-4/5 h-auto py-2 flex flex-col gap-4 rounded-xl drop-shadow-[0px_10px_10px_black]">
                        <div className="bg-white border-2 px-3 py-2 mx-2 lg:mx-12 rounded-xl">
                            <p className="text-sm">Name</p>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Channel Name"
                            className="outline-none border-b-2 border-sky-200 w-full px-2 py-1"/>
                        </div>

                        <div className="bg-white border-2 px-3 py-2 mx-2 lg:mx-12 rounded-xl">
                            <p className="text-sm">Handle</p>
                            <input type="text" onChange={(e) => setHandle(e.target.value)} className="handle outline-none border-b-2 border-sky-200 w-full px-2 py-1" 
                                placeholder="@gladsonrouth-ch7c"/> 
                        </div>

                    </div>

                    <div className="w-full px-7 flex justify-end items-center gap-7 py-2">
                        <button className="px-2 py-1 bg-black text-white hover:bg-red-500 rounded-lg">Cancel</button>
                        <button onClick={channel} className="px-2 py-1 bg-black text-white hover:bg-red-500 rounded-lg">Create Channel</button>
                        <button onClick={viewChannel} className="px-2 py-1 bg-black text-white rounded-lg hover:bg-red-500">View Channel</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateChannel;
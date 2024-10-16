import { useState } from "react";


function SignIn() {

    const [ isSign, setIsSign ] = useState(true);
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    function toggleForm() {
        setIsSign(!isSign);
    } 

    function signIn(e) {

        e.preventDefault();

        const response = fetch("http://localhost:7100/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, email: email, password: password}),
        })

        const result = response.then((data) => {
            return data.json()
        })
        result.then((data) => console.log(data));
        // console.log(username, email, password);
    }


    function logIn(e) {

        e.preventDefault()

        const response = fetch("http://localhost:7100/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        })

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            localStorage.setItem("accessToken", data.accessToken)
            console.log(data)
        })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">

            {
                isSign &&

                <div className="bg-white w-7/12 lg:w-2/5 h-3/5 rounded-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                    <h1 className="text-center mt-4 text-2xl">Sign in</h1>
                    <form className="h-80 mt-7 flex flex-col justify-center gap-2 px-7 pb-10">
                        
                        <label htmlFor="username">Username</label>
                        <input onChange={(e)=> setUsername(e.target.value)} id="username" type="text" required placeholder="Username"
                            className="h-10 rounded-lg outline-none border-2 px-3"/>

                        <label htmlFor="email">Email</label>
                        <input onChange={(e)=> setEmail(e.target.value)} id="email" type="email" required placeholder="Email"
                            className="h-10 rounded-lg outline-none border-2 px-3"/>

                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=> setPassword(e.target.value)} id="password" type="password" placeholder="Password"
                            className="h-10 rounded-lg outline-none border-2 px-3"/>
                    
                        <button onClick={signIn} className="bg-slate-200 mx-32 py-2 rounded-xl 
                            hover:bg-sky-200">
                            Sign In
                        </button>
                    </form>

                    <div className="flex justify-center mt-6">
                        <h2 className="text-blue-500">Do you have an account?  
                            <span onClick={toggleForm} className="cursor-pointer hover:underline hover:text-blue-700 pl-2">
                                login
                            </span>
                        </h2>
                    </div>
                </div>
            }

            {
                !isSign &&

                <div className="bg-white w-7/12 lg:w-2/5 h-3/5 rounded-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                    <h1 className="text-center mt-4 text-2xl">Log in</h1>
                    <form className="h-80 mt-7 flex flex-col justify-center gap-2 px-7 pb-10">

                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" required placeholder="Email"
                            className="h-10 rounded-lg outline-none border-2 px-3"/>

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password"
                            className="h-10 rounded-lg outline-none border-2 px-3"/>
                    
                        <button onClick={logIn} className="bg-slate-200 mx-32 py-2 rounded-xl 
                            hover:bg-sky-200">
                            Log In
                        </button>
                    </form>

                    <div className="flex justify-center mt-6">
                        <h2 className="text-blue-500">Create an account?  
                            <span onClick={toggleForm} className="cursor-pointer hover:underline hover:text-blue-700 pl-2">
                                Sign-in
                            </span>
                        </h2>
                    </div>
                </div>
            }
            
            
        </div>
    )
}

export default SignIn;
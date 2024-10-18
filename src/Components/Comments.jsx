import { findDay } from "../Utils/day.js";

function Comments(props) {

    const { text, timestamp } = props.comment;
    const g = findDay(timestamp)

    return (
        <>
            <div className="w-full h-auto flex justify-start items-center py-3 gap-7">
                <div>
                    <img src="https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg" alt="profile-pic"
                        className="rounded-full" width="50px"/>
                </div>
                
                <div className="w-full flex flex-col justify-center">
                    <p className="text-sm">{g} days ago</p>
                    <h1>{text}</h1>
                    <div>
                        <span className="px-2 py1">Like</span> 
                        <span className="px-2 py1">Dislike</span>
                    </div>
                </div>

                <div>
                    <span><i className="fa-solid fa-ellipsis-vertical"></i></span>
                </div>
            </div>
        </>
    )
}

export default Comments;
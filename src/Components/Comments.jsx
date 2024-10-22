import { findDay } from "../Utils/day.js";
import { useState, useEffect } from "react";



function Comments(props) {


    // state variables
    const [ flag , setFlag ] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const { text, timestamp, like, dislike, commentId } = props.comment;
    const { commentUpdate, setCommentUpdate } = props;
    const [ isDeleteComment, setIsDeleteComment ] = useState(false);
    const [likes, setLikes] = useState(like)
    const { videoId } = props;
    const g = findDay(timestamp)
    let date = new Date(timestamp);
    let current = new Date();


    
    // function for like
    function addLike() {

        // num = 1;
        let reaction = parseInt(like)+1;
        const response = fetch(`http://localhost:7100/updatelike/${videoId.id}/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({like: reaction})
        } );
       
       
        const result = response.then((data)=> {
            return data.json();
        })

        result.then((data) => {
            if (data) {

                setTimeout(() => {
                    
                
                function getLike() {

                    const response = fetch(`http://localhost:7100/like/${videoId.id}/${commentId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
            
                    const result = response.then((data) => {
                        return data.json();
                    })
            
                    result.then((data) => {
                        for (let comment of data) {
                            if (comment.commentId == commentId) {
                                setLikes(comment.like);
                            }
                        }
                        
                    })
                }

                getLike();
                }, 1000);
                
                
            }
        })

    
    }



    // function for dislike
    function deleteLike() {
        
       
        let reaction = parseInt(like-1)
        const response = fetch(`http://localhost:7100/deletelike/${videoId.id}/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({like: like})
        })

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            if (data) {


                setTimeout(() => {
                    
                
                    function getLike() {
    
                        const response = fetch(`http://localhost:7100/like/${videoId.id}/${commentId}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                
                        const result = response.then((data) => {
                            return data.json();
                        })
                
                        result.then((data) => {
                            for (let comment of data) {
                                if (comment.commentId == commentId) {
                                    setLikes(comment.like);
                                }
                            }
                            
                        })
                    }
    
                    getLike();
                }, 1000);


                for (let i of data) {
                    if(i.commentId == commentId) {

                        setLikes(i.like);
                    }
                }

            
            
            }
        
        })

    }

    function showDelete() {
        setIsDeleteComment(!isDeleteComment)
    }

    // delete comment
    function deleteComment(e) {
        e.preventDefault();

        const response = fetch(`http://localhost:7100/deletecomment/${videoId.id}/${commentId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
            },
        })

        const result = response.then((data) => {
            return data.json();
        })

        result.then((data) => {
            
            if (data) {
                setCommentUpdate(!commentUpdate)
                setIsDeleteComment(!isDeleteComment)
            }
        })

    }

    


    useEffect(()=> {
        setCommentData(props.comment)
        setLikes(likes);
    }, [commentData])
    

    return (
        <>
            <div className="w-full h-auto flex justify-start items-center py-3 gap-7 relative">
                <div>
                    <img src="https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg" alt="profile-pic"
                        className="rounded-full" width="50px"/>
                </div>
                
                <div className="w-full flex flex-col justify-center">
                    <p className="text-sm">{g == '0' ? `today` : `${g} days ago`}</p>
                    <h1>{text}</h1>
                    <div className="flex items-center py-1">
                        <span className="like-button px-2 py-1 flex items-center">
                           
                            <i onClick={addLike} className="fa-regular fa-thumbs-up cursor-pointer hover:text-sky-400" ></i>
        
                            <span className="pl-2">{likes}</span>    
                        </span> 
                        <span className="dislike-button px-2 py-1 flex items-center">
                            <i onClick={deleteLike} className="fa-regular fa-thumbs-down cursor-pointer hover:text-red-500"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <span onClick={showDelete}><i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-red-500"></i></span>
                    {
                        isDeleteComment &&
                        <span onClick={deleteComment} className="delete-comment absolute right-0 top-0 px-2 bg-slate-200
                            rounded-xl cursor-pointer">
                            Delete Comment
                        </span>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Comments;
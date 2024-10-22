# This is a YouTube Clone project.


## Build with 
    
    - React.Js 
    - Vite 
    - Node.Js
    - Express.js  
    - MongoDB

## instructions:
    
    - At first install node modules in "/youtube" route and inside NodeJs folder.
    - Inside "/youtube" route run 'npm run dev' command if you using vite.
    - Run the server - go to NodeJs route and run the command 'npm start'.
    - The server is running on port 7100.

## operate the app:
    
    - First Sign in and then log in this app.
    - Then create a channel.
    - To create channel click on the top right corner button.
    - After Filling the channel information click on create button.
    - then you can able to upload a video through your api testing app (like: postman, thunderclient).
    - sample structured schema data is present inside Util's sampleData.js folder.
    - Have like, dislike, comment, search, upload video, video player functionality. (wait one second after clicking those buttons);

## APIs:

    - "/content  - get all video contents
    - "/video/:id" - get video by id
    - "/videos/:channelId" - get channel videos
    - "/user/:email" - get user information
    - "/checkuser/:email" - chek user by email
    - "/comments/:videoId" - get comments
    - "/upload/:email" - create or upload content (provide registered email which you have used to signed in and created a channel);
    - /addcomment/:id" - To add comment
    - "/like/:videoId/:commentId" - to get likes count
    - "/updatelike/:videoId/:commentId" - to update like
    - "/deletelike/:videoId/:commentId" - to dletelike (dislike). wait one/two second after the click.
    - "/deletecomment/:videoId/:commentId" - for deleting a comment.
    - "/channel/:email" - to create a channel
    - "/register" - for Sign-in
    - "/login" - for Log-in


## Technologies:

    - Frontend: React, React Router,
    - Backend: Node.js, Express.js, MongoDB
    - Authentication: JWT (JSON Web Tokens)
    - Database: MongoDB (MongoDB local instance)
    - Version Control: Git 





- [@github](https://github.com/gladson65/youtube)
- (https://github.com/gladson65/youtube)


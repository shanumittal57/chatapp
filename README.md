# Getting Started with Create React App

# Project Details
    An online chat application with register and login features and authentication.

# Tech Stack Used
    1. Express.js (Node framework)
    2. React for Frontend
    3. MySql for DB
    4. Socket for Chat feature

This project was created through npx create-react-app cmd.

# After cloning project from github
    1. npm install to install required packages
    2. then run `npm start` to run frontend part in terminal in project root directory
    3. Then open another terminal and in directory api, run `node server.js` to start server.
    4. You need to make users table under chatapp db in mysql to register users.
    5. Once done, when application is working fine, register 2 users, then login them one in chrome and another in incognito, when both are logged in then you can chat together.
    6. You can import users.sql file in phpmyadmin for users table structure.
    7. Also, please setup your DB details in server.js file under api folder
    8. If any CORS error comes, then please install CORS chrome extension to resolve as we're working with local.
    9. Session will be expired after an hour per user. (After each 5 seconds a req will be sent from client to server to check whether session expired or not)

    HAPPY CHATTING!


import socketIOCLIENT from "socket.io-client";
import { useEffect, useState } from "react";
import { APP_API_PATH } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const socket = socketIOCLIENT(APP_API_PATH)

const UserChat = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState((localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('send', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])

    useEffect(() => {
        const checkSession = setInterval(() => {
            //send api to check session after each min.
            if (localStorage.getItem("userAuth") === null) {
                logout(true);

            } else {

                axios.get(APP_API_PATH + '/chat',  {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("userAuth") //the token is a variable which holds the token
                    }
                }).then((succ)=>{
                    if(succ.data.status === 500){
                        logout(true);
                    }
                }).catch((err)=>{
                    logout(true);
                })
            }

        }, 5000)
        return () => {
            clearInterval(checkSession);
        }
    }, [])

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('send', message)
            setMessage('');
        }
    }

    const logout = (show) => {
        if(show){alert('Session expired! Please login again.'+show)}
        localStorage.clear();
        navigate("/");
    }

    return (
        <div>
            <h1 className="font-bold text-green-600 text-center text-2xl mt-5">{`Welcome ${userData && userData.name} to Chat Room!`}</h1>
            <button className="bg-blue-500 text-white p-2 mt-5 text-center rounded-md" onClick={()=>logout(false)}>Logout</button>
            <div className="justify-center flex mt-5 flex-col items-center">
                <input className="p-3 mt-5 w-100 rounded-md bg-blue-100 border" type="text" name="message" placeholder="Enter Message" value={message} onChange={e => setMessage(e.target.value)} />
                <button className="bg-blue-500 text-white p-2 mt-5 rounded-md" onClick={sendMessage}>Send</button>
                {(messages.length > 0) && messages.map((showMessage, index) => {
                    return <div key={index}>{showMessage}</div>
                })}
            </div>
        </div>
    )
}

export default UserChat
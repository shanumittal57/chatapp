import { APP_API_PATH } from "../utils/constants";
import axios from "axios";
import { validateData } from "../utils/validateData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserLogin = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorHandling, setErrorHandling] = useState(null);

    const submitForm = (event) => {
        event.preventDefault();
        let valid = null;
        if (isSignUp) {

            valid = validateData(name.trim(), email.trim(), password.trim(), true);
            if (valid) {
                setErrorHandling(valid);
                return false;
            }
            axios.post(APP_API_PATH + '/register', { name, email, password })
                .then((success) => {
                    if (success.data.status === 500) {
                        setErrorHandling(success.data.message);
                    } else {
                        setErrorHandling(null)
                    }
                })
                .catch((error) => {
                    setErrorHandling(error.message);
                    console.log('API error', error)
                })
        } else {

            valid = validateData(email.trim(), password.trim(), false);
            if (valid) {
                setErrorHandling(valid);
                return false;
            }
            axios.post(APP_API_PATH + '/login', { email, password })
                .then((success) => {
                    if (success.data.status === 500) {
                        setErrorHandling(success.data.message);
                    } else {
                        if (success.data.token) {
                            setErrorHandling(null)
                            console.log(success.data.userData)
                            localStorage.setItem('userAuth', success.data.token)
                            localStorage.setItem('userData', JSON.stringify(success.data.userData))
                            navigate("/chat");
                        } else {
                            setErrorHandling('Error:');
                        }
                    }
                })
                .catch((error) => {
                    setErrorHandling(error.message);
                    console.log('API error', error)
                })
        }
    }

    return (
        <>
            <h1 className="font-bold text-green-600 text-center text-2xl mt-5">Welcome to Shanu Mittal's Chat Application</h1>
            {isSignUp && <h3 className="font-bold text-pink-600 text-center text-2xl mt-5">Register Now!</h3>}
            {!isSignUp && <h3 className="font-bold text-pink-600 text-center text-2xl mt-5">Login</h3>}
            <div className="bg-green-100 justify-center items-center p-5 m-10">
                <form className="justify-center flex mt-5 flex-col items-center" onSubmit={submitForm}>
                    {isSignUp && <input className="p-3 mt-5 w-100 rounded-md bg-blue-100 border" type="text" name="name" placeholder="Enter Name" onChange={(e) => { setName((e.target.value).trim()) }} />}
                    <input className="border-gray-400 p-3 mt-5 rounded-md bg-blue-100 border" type="email" name="useremail" placeholder="Enter Email" onChange={(e) => { setEmail((e.target.value).trim()) }} />
                    <input className="border-gray-400 p-3 mt-5 rounded-md bg-blue-100 border" type="password" name="userpassword" placeholder="Enter Password" onChange={(e) => { setPassword((e.target.value).trim()) }} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                    <p className="text-red-500 font-semibold text-lg">{errorHandling}</p>
                    <button className="bg-blue-500 text-white p-2 mt-5 rounded-md">{isSignUp ? "Register" : "Login"}</button>
                </form>
                <p>Already a user? <span className="font-bold justify-center items-center" onClick={() => { setIsSignUp(!isSignUp); setErrorHandling(null) }} >{isSignUp ? "Login" : "Register"}</span></p>
            </div>
        </>
    );
}
export default UserLogin

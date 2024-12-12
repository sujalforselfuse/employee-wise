import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ring } from 'ldrs'
ring.register()
export default function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const successToast = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "light",

    });;

    const errorToast = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "light",

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const res = await data.json();
            localStorage.setItem('globaltoken', res.token);
            if (res.token) {

                successToast('User logged in successfully');
                history('/user');
            }
            else{
                errorToast('Enter valid credentials. Try again');
            }
            
        } catch (error) {
            errorToast('Enter valid credentials. Try again');
        }
        setLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('globaltoken');
        if (token) {
            history('/user');
        }
    }, []);

    return (
        <div>
            <div class="flex h-screen bg-indigo-700">
                <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
                    <header>
                        <img class="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" alt=''/>
                    </header>
                    <div>
                        <div>
                            <label class="block mb-2 text-indigo-500" for="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" />
                        </div>
                        <div>
                            <label class="block mb-2 text-indigo-500" for="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" />
                        </div>
                        <div>
                            <button onClick={handleSubmit} class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">
                            {loading? <div className='flex justify-center'>
                                    <l-ring
                                        size="20"
                                        stroke="3"
                                        bg-opacity="0"
                                        speed="2"
                                        color="white"
                                    ></l-ring>
                                </div>: 'Login'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

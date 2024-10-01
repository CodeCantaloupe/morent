import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const navigate = useNavigate()

    const loginUser = () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let userInfo = {
            userEmail: email,
            userPassword: password
        }

        axios.post('http://localhost:5000/login', userInfo)
            .then(res => {
                toast.success(res.data.message)
                navigate('/')
                console.log(res.data.message);
            })
            .catch(err => {
                console.log(err.response);

                if (err.response.data.message) {
                    toast.error(err.response.data.message, {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            })
    }

    return (
        <div>
            <div className="relative bg-gradient-to-tr to-sky-950 from-blue-400 w-screen min-h-screen flex justify-center items-center">
                <div className="pl-12 font-plus-jakarta-sans">
                    <div className="bg-white flex flex-col w-[400px] rounded shadow-2xl p-6">
                        <div className="flex items-center mb-6">
                            <hr className="w-1/2" />
                            <h1 className="font-bold text-2xl mx-5">Login</h1>
                            <hr className="w-1/2" />
                        </div>

                        <label className="block mb-1">Email</label>
                        <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" type="email" id="email" />

                        <label className="block mb-1">Password</label>
                        <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" type="password" id="password" />

                        <p className="text-center mb-4">Don&apos;t have an account? <Link to="/register" className="text-blue-500 ml-2">Register</Link></p>

                        <button className="text-center text-white font-bold py-2 px-4 bg-primaryBlue-500 hover:bg-primaryBlue-600 active:bg-primaryBlue-700 transition rounded" onClick={loginUser}>Login</button>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    transition={Slide}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                />
            </div>
        </div>
    )
}

export default Login
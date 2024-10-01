import { Link, useNavigate } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate()

    const registerUser = () => {
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let userName = document.getElementById('userName').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let newUser = {
            userFirstName: firstName,
            userLastName: lastName,
            userName: userName,
            userEmail: email,
            userPassword: password,
            userRole: 'user',
            userStatus: 'active',
            userProfileImage: 'https://placeholder.com/300',
        }

        axios.post('http://localhost:5000/register', newUser)
            .then(res => {
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
                console.log(res.data.message);
            })
            .catch(err => {
                console.log(err.response.data.message.errors);
                
                (err.response.data.message.errors).forEach(error => {
                    toast.error(error.msg, {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                });
            })
    }

    return (
        <div className="relative bg-gradient-to-tr to-sky-400 from-blue-600 w-screen min-h-screen py-3 ">
            <div className=" pl-12 font-plus-jakarta-sans ">
                <div className="bg-white flex flex-col  max-h-[calc(100vh-2rem)] w-1/3 rounded shadow-2xl p-6">
                    <div className="flex items-center mb-6 overflow-hidden">
                        <hr className="w-1/2" />
                        <h1 className="font-bold text-2xl mx-5">Register</h1>
                        <hr className="w-1/2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 overflow-hidden">
                        <label className="mb-1">First name</label>

                        <label className="mb-1">Last name</label>
                    </div>

                    <div className="grid grid-cols-2 gap-6 overflow-hidden">
                        <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5 mb-4" type="text" id='firstName' />

                        <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5 mb-4" type="text" id='lastName' />
                    </div>

                    <label className="block mb-1">Username</label>
                    <div className='flex'>
                        <label className='bg-slate-50 border text-slate-700 text-md rounded-lg p-3 mb-4'>@</label>
                        <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-4" type="text" id='userName' />
                    </div>

                    <label className="block mb-1">Email</label>
                    <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" type="email" id='email' />

                    <label className="block mb-1">Password</label>
                    <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" type="password" id='password' />

                    <label className="block mb-1">Confirm Password</label>
                    <input className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" type="password" id='confirmPassword' />

                    <p className="text-center mb-4">Already have an account?
                        <Link to="/login" className="text-blue-500"> Login</Link>
                    </p>

                    <button className="text-center text-white font-bold py-2 px-4 bg-primaryBlue-500 hover:bg-primaryBlue-600 active:bg-primaryBlue-700 transition rounded"
                        onClick={registerUser}>Register</button>
                </div>
            </div>
            <img className="absolute h-48 right-[10%] bottom-[30%]" src="./cars/heroCar.png" alt="register car logo" />

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light" />
        </div>
    )
}

export default Register
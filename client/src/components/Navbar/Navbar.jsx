import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // eslint-disable-line

const Navbar = ({userLoggedIn}) => {
    const [loggedIn, setLoggedIn] = useState(userLoggedIn)

    useEffect(() => {
        setLoggedIn(userLoggedIn);
    }, [userLoggedIn])

    return (
        <nav className="w-full flex items-center justify-between bg-white p-4 lg:p-6 shadow">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-primaryBlue-500">MORENT</h1>
                <div className="sm:flex hidden border rounded-full py-2 px-6 gap-3 ml-6 w-full">
                    <img src="/icons/search-normal.svg" alt="search icon" className="size-6" />
                    <input type="text" placeholder="Search cars" className="bg-transparent outline-none placeholder-slate-500" />
                    <img src="/icons/filter.svg" alt="filter icon" className="size-6" />
                </div>
            </div>

            <div className="flex items-center gap-3">

                <Link to="/fav">
                    <a className="group border rounded-full p-2 sm:flex hidden hover:bg-slate-100 transition duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.44 3.09998C14.63 3.09998 13.01 3.97998 12 5.32998C10.99 3.97998 9.37 3.09998 7.56 3.09998C4.49 3.09998 2 5.59998 2 8.68998C2 9.87998 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.87998 22 8.68998C22 5.59998 19.51 3.09998 16.44 3.09998Z" className="group-hover:fill-red-500 transition" fill="#596780" />
                        </svg>
                    </a>
                </Link>

                <Link to="/notifications">
                    <a className="group border rounded-full p-2 sm:flex hidden hover:bg-slate-100 transition duration-1000">
                        <svg width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3399 12.49L14.3399 10.83C14.1299 10.46 13.9399 9.76 13.9399 9.35V6.82C13.9399 4.47 12.5599 2.44 10.5699 1.49C10.0499 0.57 9.08994 0 7.98994 0C6.89994 0 5.91994 0.59 5.39994 1.52C3.44994 2.49 2.09994 4.5 2.09994 6.82V9.35C2.09994 9.76 1.90994 10.46 1.69994 10.82L0.689943 12.49C0.289943 13.16 0.199943 13.9 0.449943 14.58C0.689943 15.25 1.25994 15.77 1.99994 16.02C3.93994 16.68 5.97994 17 8.01994 17C10.0599 17 12.0999 16.68 14.0399 16.03C14.7399 15.8 15.2799 15.27 15.5399 14.58C15.7999 13.89 15.7299 13.13 15.3399 12.49Z" fill="#596780" className="group-hover:fill-yellow-500 transition" />
                        </svg>
                    </a>
                </Link>

                <Link to="settings">
                    <a className="group border rounded-full p-2 sm:flex hidden hover:bg-slate-100 transition">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1 7.22006C16.29 7.22006 15.55 5.94006 16.45 4.37006C16.97 3.46006 16.66 2.30006 15.75 1.78006L14.02 0.790059C13.23 0.320059 12.21 0.600059 11.74 1.39006L11.63 1.58006C10.73 3.15006 9.25 3.15006 8.34 1.58006L8.23 1.39006C7.78 0.600059 6.76 0.320059 5.97 0.790059L4.24 1.78006C3.33 2.30006 3.02 3.47006 3.54 4.38006C4.45 5.94006 3.71 7.22006 1.9 7.22006C0.86 7.22006 0 8.07006 0 9.12006V10.8801C0 11.9201 0.85 12.7801 1.9 12.7801C3.71 12.7801 4.45 14.0601 3.54 15.6301C3.02 16.5401 3.33 17.7001 4.24 18.2201L5.97 19.2101C6.76 19.6801 7.78 19.4001 8.25 18.6101L8.36 18.4201C9.26 16.8501 10.74 16.8501 11.65 18.4201L11.76 18.6101C12.23 19.4001 13.25 19.6801 14.04 19.2101L15.77 18.2201C16.68 17.7001 16.99 16.5301 16.47 15.6301C15.56 14.0601 16.3 12.7801 18.11 12.7801C19.15 12.7801 20.01 11.9301 20.01 10.8801V9.12006C20 8.08006 19.15 7.22006 18.1 7.22006ZM10 13.2501C8.21 13.2501 6.75 11.7901 6.75 10.0001C6.75 8.21006 8.21 6.75006 10 6.75006C11.79 6.75006 13.25 8.21006 13.25 10.0001C13.25 11.7901 11.79 13.2501 10 13.2501Z" fill="#596780" className="group-hover:fill-slate-400" />
                        </svg>
                    </a>
                </Link>

                {loggedIn ? 
                    <Link to="/profile" className="rounded-full size-10 border">
                            <img src="./profileImageExample1.png" alt="Profile"/>
                    </Link> 
                :
                    <Link to="/register" className="rounded-full size-10 border">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="m-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="7" r="5"></circle>
                            <path d="M12 12c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"></path>
                        </svg>
                    </Link>
                }
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    userLoggedIn: PropTypes.bool
}

export default Navbar
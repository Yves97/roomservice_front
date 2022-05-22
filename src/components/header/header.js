import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"

import { Dropdown } from '../dropdown/dropdown';

export const Header = ({title}) => {
    const user = useSelector((state) => state.auth.user)
    const isAuth = useSelector((state)=> state.auth.isAuth)

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-violet-500">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                {isAuth && <Dropdown color="white"/> }
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <Link to='/' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
                        ROOM SERVICE - {title.toLowerCase()}
                    </Link>
                    <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                        <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    </button>
                </div>
                <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                    <ul className="flex flex-col items-center lg:flex-row list-none ml-auto">
                        {isAuth && (
                            <li className="nav-item">
                                <p className='text-white'>Bonjour, Amani</p>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link to='/login' className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rooms" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                Rooms
                            </Link>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}
Header.propTypes = {
    title : PropTypes.string.isRequired
}

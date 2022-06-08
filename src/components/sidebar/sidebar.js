import React from 'react'
import { Link , NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <nav aria-label="alternative nav">
                    <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
                        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                            <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                                <li className="mr-3 flex-1">
                                    <NavLink to="/dashboard/home" activeClassName='border-b-2 border-yellow-600 text-yellow-600' className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800">
                                        <i className="fas fa-tasks pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Acceuil</span>
                                    </NavLink>
                                </li>
                                <li className="mr-3 flex-1">
                                    <NavLink to="/dashboard/rooms" activeClassName='border-b-2 border-yellow-600 text-yellow-600' className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 ">
                                        <i className="fa fa-envelope pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Chambres</span>
                                    </NavLink>
                                </li>
                                <li className="mr-3 flex-1">
                                    <NavLink to="/dashboard/reservations" activeClassName='border-b-2 border-yellow-600 text-yellow-600' className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-blue-600">
                                        <i className="fas fa-chart-area pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Réservations</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
    </nav>
  )
}

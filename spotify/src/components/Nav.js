import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/spotifine_logo.png";
import { ReactComponent as HomeIcon } from "../assets/svg/home.svg";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import { ReactComponent as LibraryIcon } from "../assets/svg/library.svg";

const Nav = () => {
    return (
        <div className="w-64 h-full bg-[#121212] p-2.5">
            <div className="flex justify-center items-center p-6">
                <img
                    src={logo}
                    className="max-w-[140px] h-full object-contain"
                    alt="Logo"
                />
            </div>
            <ul className="list-none m-0 p-0">
                <li className="relative text-[#b3b3b3] rounded-md p-4 cursor-pointer hover:text-white transition duration-1000 transform hover:scale-105 group">
                    <Link to="/" className="flex items-center gap-2">
                        <HomeIcon />
                        Home
                    </Link>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#b3b3b3] h-0.5 transition-all duration-1000 ease-in-out w-0 group-hover:w-full"></div>
                </li>

                <li className="relative text-[#b3b3b3] rounded-md p-4 cursor-pointer hover:text-white transition duration-1000 transform hover:scale-105 group">
                    <Link
                        to="/search"
                        className="text-[#b3b3b3] hover:text-white flex items-center gap-2"
                    >
                        <SearchIcon />
                        Search
                    </Link>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#b3b3b3] h-0.5 transition-all duration-1000 ease-in-out w-0 group-hover:w-full"></div>
                </li>
                <li className="relative text-[#b3b3b3] rounded-md p-4 cursor-pointer hover:text-white transition duration-1000 transform hover:scale-105 group">
                    <Link
                        to="/albums"
                        className="text-[#b3b3b3] hover:text-white flex items-center gap-2"
                    >
                        <LibraryIcon />
                        Album list
                    </Link>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#b3b3b3] h-0.5 transition-all duration-1000 ease-in-out w-0 group-hover:w-full"></div>
                </li>
                <li className="relative text-[#b3b3b3] rounded-md p-4 cursor-pointer hover:text-white transition duration-1000 transform hover:scale-105 group">
                    <Link
                        to="/artists"
                        className="text-[#b3b3b3] hover:text-white flex items-center gap-2"
                    >
                        <LibraryIcon />
                        Artist list
                    </Link>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#b3b3b3] h-0.5 transition-all duration-1000 ease-in-out w-0 group-hover:w-full"></div>
                </li>
                <li className="relative text-[#b3b3b3] rounded-md p-4 cursor-pointer hover:text-white transition duration-1000 transform hover:scale-105 group">
                    <Link
                        to="/genres"
                        className="text-[#b3b3b3] hover:text-white flex items-center gap-2"
                    >
                        <LibraryIcon />
                        Genre list
                    </Link>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#b3b3b3] h-0.5 transition-all duration-1000 ease-in-out w-0 group-hover:w-full"></div>
                </li>
            </ul>
        </div>
    );
};

export default Nav;

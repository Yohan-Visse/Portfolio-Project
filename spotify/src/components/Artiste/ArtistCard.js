import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
    return (
        <div className="artist-card artist-card-color p-4 rounded-lg shadow-md flex flex-col items-center w-64 mx-auto m-2 transition duration-800 transform group border border-[#3b3b3b] hover:border-[#8a8a8a] hover:shadow-xl hover:shadow-[#686868]/50 hover:scale-105">
            <Link to={`/artist/${artist.id}`} className="artist-link group">
                <img
                    src={artist.photo}
                    alt={artist.name}
                    className="w-64 h-60 object-cover mb-4 rounded-lg my-animation-class transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <h1 className="text-base text-white font-bold text-center">
                    {artist.name}
                </h1>
            </Link>
        </div>
    );
};

export default ArtistCard;

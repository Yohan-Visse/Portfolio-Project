import React from "react";
import { Link } from "react-router-dom";
import altRockImage from "../../assets/img/altrock.jpg";
import classical from "../../assets/img/classical.jpg";
import newgage from "../../assets/img/newage.jpg";
import electronica from "../../assets/img/electronica.jpg";
import world from "../../assets/img/world.jpg";
import ambiant from "../../assets/img/ambiant.jpg";
import jazz from "../../assets/img/jazz.jpg";
import hiphop from "../../assets/img/hiphop.jpg";
import electrorock from "../../assets/img/electrorock.jpg";
import hardrock from "../../assets/img/hardrock.jpg";

const genreImages = {
    "Alt Rock": altRockImage,
    Classical: classical,
    "New Age": newgage,
    Electronica: electronica,
    World: world,
    Ambient: ambiant,
    Jazz: jazz,
    "Hip Hop": hiphop,
    "Electro Rock": electrorock,
    "Hard Rock": hardrock,
};

const GenreCard = ({ genre }) => {
    const imageUrl = genreImages[genre.name];

    return (
        <Link
            to={`/genres/${genre.id}`}
            className="genre-card album-card-color mx-auto p-4 rounded-lg shadow-md flex flex-col items-center w-72 m-2 transition duration-800 transform group border border-[#3b3b3b] hover:border-[#8a8a8a] hover:shadow-xl hover:shadow-[#686868]/50 hover:scale-105"
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={genre.name}
                    className="w-full h-full object-cover mb-4 rounded-lg my-animation-class transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
            )}
            <h3 className="text-xl text-white font-bold text-center ">
                {genre.name}
            </h3>
        </Link>
    );
};

export default GenreCard;

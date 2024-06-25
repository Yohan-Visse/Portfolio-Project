import React from "react";
import GenreCard from "./GenreCard";

const GenreList = ({ genres }) => {
    return (
        <div className="flex flex-wrap">
            {genres &&
                genres.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
        </div>
    );
};

export default GenreList;

import React, { useEffect, useState } from "react";
import { getGenre } from "../../components/Genre/Genre";
import GenreList from "../../components/Genre/GenreList";
import { Helmet } from "react-helmet";

const GenrePage = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const genreData = await getGenre();
            setGenres(genreData);
        };

        fetchData();
    }, []);

    return (
        <div className="genre-page bg-page">
            <Helmet>
                <title>Spotifine - Genre</title>
            </Helmet>
            <h1 className="text-[#d4d4d4] text-3xl mt-10 mb-3 ml-5">Genre list :</h1>
            <GenreList genres={genres} />
        </div>
    );
};

export default GenrePage;

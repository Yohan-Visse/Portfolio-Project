import React, { useState } from "react";
import ArtistList from "../Artiste/ArtistList";
import AlbumList from "../Album/AlbumList";
import GenreList from "../Genre/GenreList";
import { getArtist } from "../Artiste/Artist";
import { getAlbum } from "../Album/Album";
import { getGenre } from "../Genre/Genre";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("genres");
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let searchData = [];
            if (searchType === "artists") {
                searchData = await getArtist();
                setArtists(
                    searchData.filter((artist) =>
                        artist.name
                            .toLowerCase()
                            .startsWith(searchTerm.toLowerCase())
                    )
                );
            } else if (searchType === "albums") {
                searchData = await getAlbum();
                setAlbums(
                    searchData.filter((album) =>
                        album.name
                            .toLowerCase()
                            .startsWith(searchTerm.toLowerCase())
                    )
                );
            } else if (searchType === "genres") {
                searchData = await getGenre();
                setGenres(
                    searchData.filter((genre) =>
                        genre.name
                            .toLowerCase()
                            .startsWith(searchTerm.toLowerCase())
                    )
                );
            }
            setError(null);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            setError(
                "Une erreur s'est produite lors de la récupération des données."
            );
            setArtists([]);
            setAlbums([]);
            setGenres([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto flex items-center space-x-2"
            >
                <select
                    value={searchType}
                    onChange={handleTypeChange}
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="genres">Genres</option>
                    <option value="artists">Artists</option>
                    <option value="albums">Albums</option>
                </select>
                <div className="flex flex-grow items-center relative rounded-r-md w-96">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={handleChange}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md flex-grow focus:ring-[#b3b3b3] focus:border-[#b3b3b3]"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bg-[#505050] hover:bg-[#b3b3b3] focus:outline-none font-medium rounded-lg text-sm px-4 py-2 hover:scale-105 transition-transform duration-200 ease-in-out"
                    >
                        Rechercher
                    </button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {searchType === "artists" && !loading && !error && (
                <ArtistList className="text-white" artists={artists} />
            )}
            {searchType === "albums" && !loading && !error && (
                <AlbumList className="text-white" albums={albums} />
            )}
            {searchType === "genres" && !loading && !error && (
                <GenreList className="text-white" genres={genres} />
            )}
        </div>
    );
}

export default SearchBar;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GenreCard from "../../components/Genre/GenreCard";
import { ReactComponent as FlecheIcon } from "../../assets/svg/1646214-9e9e9e.svg"; // Assurez-vous que ce chemin est correct

const GenreDetailsPage = () => {
    const { id } = useParams();
    const [genre, setGenre] = useState({});
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Pas besoin de useState si cette valeur ne change pas

    useEffect(() => {
        const fetchGenreDetails = async () => {
            try {
                const genreResponse = await axios.get(`http://localhost:8000/genres/${id}`);
                setGenre(genreResponse.data.genre);

                // Simuler l'appel pour les détails de chaque album avec leur ID
                const albumDetailsPromises = genreResponse.data.albums.map(async (albumId) => {
                    const albumResponse = await axios.get(`http://localhost:8000/albums/${albumId}`);
                    return albumResponse.data;
                });

                const albumsDetails = await Promise.all(albumDetailsPromises);
                setAlbums(albumsDetails);
            } catch (error) {
                console.error("Error fetching genre details:", error);
            }
        };

        fetchGenreDetails();
    }, [id]);

    // Calcul pour la pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="genre-details-page bg-page">
            <h1 className="text-[#d4d4d4] text-3xl mt-10 mb-3">{genre.name}</h1>
    
            {/* Centrage de la GenreCard */}
            <div className="flex justify-center">
                <GenreCard genre={genre} />
            </div>
    
            <h2 className="text-[#d4d4d4] text-2xl mt-10 mb-3">Albums:</h2>
            <div className="flex flex-wrap justify-center">
                {currentAlbums.map((album) => (
                    <div
                        key={album.album.id}
                        className="album-card album-card-color p-4 rounded-lg shadow-md flex flex-col items-center w-64 m-2 transition duration-800 transform group border border-[#3b3b3b] hover:border-[#8a8a8a] hover:shadow-xl hover:shadow-[#686868]/50 hover:scale-105 overflow-hidden"
                    >
                        <a href={`/album/${album.album.id}`} className="album-link group flex flex-col items-center w-full">
                            <img
                                src={album.album.cover_small}
                                alt={album.album.name}
                                className="w-full object-cover mb-4 rounded-lg transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />
                            <h3 className="text-xl text-white font-bold text-center truncate w-full">
                                {album.album.name}
                            </h3>
                        </a>
                    </div>
                ))}
            </div>
            
            <div className="pagination text-white flex justify-center items-center gap-4 mt-3 pb-10">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center gap-2"
                >
                    <FlecheIcon className="rotate-180 w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-150" />
                </button>
                <span className="text-xl text-[#b3b3b3]">Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= albums.length}
                    className="flex items-center justify-center gap-2"
                >
                    <FlecheIcon className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-150" />
                </button>
            </div>
        </div>
    );
    
    
};

export default GenreDetailsPage;

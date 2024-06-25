import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ReactComponent as FlecheDefilIcon } from "../../assets/svg/1294468.svg";
import AlbumCard from "../Album/AlbumCard";

const BASE_URL = "http://localhost:8000";

const ArtistDetailsPage = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [showFullBio, setShowFullBio] = useState(false);

    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const artistResponse = await axios.get(`${BASE_URL}/artists/${id}`);
                setArtist(artistResponse.data);

                const albumsResponse = await axios.get(`${BASE_URL}/albums/artist/${id}`);
                setAlbums(albumsResponse.data || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'artiste :", error);
            }
        };

        fetchArtistDetails();
    }, [id]);

    return (
        <div className="text-white p-4">
            {artist && (
                <div className="max-w-4xl mx-auto border-2 border-gray-400 rounded-lg shadow-lg bg-[#161616]">
                    <img
                        src={artist.photo}
                        alt={artist.name}
                        className="mx-auto w-72 h-auto rounded mt-10"
                    />
                    <div className="p-6">
                        <h2 className="text-4xl mt-4 mb-5 text-center">{artist.name}</h2>
                        <div className="border-2 border-dashed border-gray-500 rounded">
                            <p
                                className={`my-4 p-4 text-center ${
                                    showFullBio ? "" : "max-h-[120px] overflow-hidden"
                                }`}
                            >
                                {artist.bio}
                            </p>
                            <button
                                onClick={toggleBio}
                                className="flex items-center justify-center underline mx-auto focus:outline-none
                                bg-[#b3b3b3] hover:bg-[#838383] py-2 px-2 rounded-full mb-2 hover:scale-125
                                transition-transform duration-300 ease-in-out"
                            >
                                <FlecheDefilIcon
                                    fill="currentColor"
                                    className={`w-5 h-5 text-[#303030] transform ${
                                        showFullBio ? "rotate-270" : "rotate-90"
                                    }`}
                                />
                            </button>
                        </div>
                        <h3 className="text-xl mt-4 text-center">Albums lié :</h3>
                    <div className="flex flex-wrap justify-center">
                        {albums.map((album) => (
                            <AlbumCard key={album.id} album={album} /> 
                        ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistDetailsPage;

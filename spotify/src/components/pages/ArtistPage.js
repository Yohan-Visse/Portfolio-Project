import React, { useEffect, useState } from "react";
import { getArtist } from "../../components/Artiste/Artist";
import ArtistList from "../../components/Artiste/ArtistList";
import { Helmet } from "react-helmet";
import { ReactComponent as FlecheIcon } from "../../assets/svg/1646214-9e9e9e.svg";

const ArtistPage = () => {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    useEffect(() => {
        const fetchArtists = async () => {
            const artists = await getArtist();
            setArtists(artists);
        };

        fetchArtists();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArtist = artists.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="artist-page bg-page">
            <Helmet>
                <title>Artists</title>
            </Helmet>
            <h1 className="text-[#d4d4d4] text-3xl mt-10 mb-3 ml-5">Artists</h1>
            <ArtistList artists={currentArtist} />
            <div className="pagination text-white flex justify-center items-center gap-4 mt-3 pb-10">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center gap-2"
                >
                    <FlecheIcon className="rotate-180 w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-150" />
                </button>
                <span className="text-xl text-[#b3b3b3] mx-3">
                    Page {currentPage}
                </span>{" "}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= artists.length}
                    className="flex items-center justify-center gap-2"
                >
                    <FlecheIcon className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-150" />
                </button>
            </div>
        </div>
    );
};

export default ArtistPage;

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as FlecheDefilIcon } from "../../assets/svg/1294468.svg";
import loadingGif from "../../assets/gif/icons8-chargement.gif";

const BASE_URL = "http://localhost:8000";

const AlbumDetailsPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tracksName, setTracksName] = useState([]);
  const audioRefs = useRef([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loadingTracks, setLoadingTracks] = useState(true);

  const handlePlay = (index) => {
    audioRefs.current.forEach((ref, i) => {
      if (i !== index && ref.current) {
        ref.current.pause();
      }
    });
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  }

  useEffect(() => {
    setLoadingTracks(true);

    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/albums/${id}`);
        setAlbum(response.data.album);

        const artistResponse = await axios.get(
          `${BASE_URL}/artists/${response.data.album.artist_id}`
        );
        setArtist(artistResponse.data.name);
        setTracksName(response.data.tracks);
        audioRefs.current = response.data.tracks.map(() => React.createRef());

        setLoadingTracks(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'album :",
          error
        );
      }
    };

    fetchAlbumDetails();
  }, [id]);

  return (
    <div className="text-white p-4 ">
      {album && (
        <div className="max-w-4xl mx-auto border-2 border-gray-400 rounded-lg shadow-lg bg-[#161616]">
          <img
            src={album.cover_small}
            alt={album.name}
            className="mx-auto w-72 h-auto rounded mt-10"
          />
          <div className="p-6">
            <h2 className="text-4xl mt-4 text-center mb-3">{album.name}</h2>
            <div className="border-2 border-dashed border-gray-500 rounded">
              <p
                className={`my-4 p-4 text-center ${
                  showFullDescription ? "" : "max-h-[120px] overflow-hidden"
                }`}
              >
                {album.description}
              </p>
              <button
                onClick={toggleDescription}
                className="flex items-center justify-center underline mx-auto focus:outline-none
                                bg-[#b3b3b3] hover:bg-[#838383] py-2 px-2 rounded-full mb-2 hover:scale-125
                                transition-transform duration-300 ease-in-out"
              >
                <FlecheDefilIcon
                  fill="currentColor"
                  className={`w-5 h-5 text-[#303030] transform ${
                    showFullDescription ? "rotate-270" : "rotate-90"
                  }`}
                />
              </button>
            </div>
            <p className="text-center text-lg my-2">Artist : {artist}</p>
            <p className="text-center mb-4">
              Number of tracks : {tracksName.length}
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2 text-center">Tracks listing :</h3>
            <ul className="flex flex-wrap justify-center gap-4 items-center mb-5">
              {loadingTracks ? (
                <div className="text-center">
                  <img src={loadingGif} alt="Loading" className="bg-white rounded-full w-10 h-10" />
                </div>
              ) : (
                tracksName.map((track, index) => (
                  <li key={index} className="text-center mb-5">
                    {truncateText(track.name, 5)}{" "}
                    <div className="flex justify-center">
                      <audio
                        controls
                        ref={audioRefs.current[index]}
                        onPlay={() => handlePlay(index)}
                      >
                        <source src={track.mp3} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetailsPage;

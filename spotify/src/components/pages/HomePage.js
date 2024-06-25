import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getAlbum } from "../../components/Album/Album"; // Ajustez le chemin selon votre structure de dossiers
import { getArtist } from "../../components/Artiste/Artist"; // Ajustez le chemin selon votre structure de dossiers
import ArtistCard from "../../components/Artiste/ArtistCard"; // Ajustez le chemin selon votre structure de dossiers
import { ReactComponent as FlecheIcon } from "../../assets/svg/1646214-9e9e9e.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentIndexAlbum, setCurrentIndexAlbum] = useState(0);
  const [currentIndexArtist, setCurrentIndexArtist] = useState(0);
  const displayCountAlbum = 6; // Nombre fixe d'albums à afficher
  const displayCountArtist = 6; // Nombre fixe d'artistes à afficher
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const albumData = await getAlbum();
      shuffleArray(albumData);
      setAlbums(albumData);
  
      let artistData = await getArtist(); 
      shuffleArray(artistData); 
      setArtists(artistData); 
    };

    fetchData();
  }, []);

  const openArtistDetails = (id) => {
    navigate(`/artist/${id}`);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };  

  const handlePrevAlbum = () => {
    setCurrentIndexAlbum((prevIndex) =>
      Math.max(0, prevIndex - displayCountAlbum)
    );
  };

  const handleNextAlbum = () => {
    setCurrentIndexAlbum((prevIndex) =>
      Math.min(albums.length - displayCountAlbum, prevIndex + displayCountAlbum)
    );
  };

  const openAlbumDetails = (id) => {
    navigate(`/album/${id}`);
  };

  const handlePrevArtist = () => {
    setCurrentIndexArtist((prev) => Math.max(0, prev - displayCountArtist));
  };

  const handleNextArtist = () => {
    setCurrentIndexArtist((prev) =>
      Math.min(artists.length - displayCountArtist, prev + displayCountArtist)
    );
  };

  return (
    <div className="home-page bg-page pb-10">
  <Helmet>
    <title>Spotifine - Home</title>
  </Helmet>

  {/*Albums*/}
  <h1 className="text-[#d4d4d4] text-3xl mt-10 mb-3 ml-5">Album :</h1>
  <div className="flex justify-center items-center mt-4 w-full h-80">
    <button
      onClick={handlePrevAlbum}
      disabled={currentIndexAlbum === 0}
      className="disabled:opacity-50 disabled:cursor-not-allowed z-10"
    >
      <FlecheIcon className="rotate-180 w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-150" />
    </button>
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 mx-5 overflow-hidden h-full pt-5">
      {albums
        .slice(currentIndexAlbum, currentIndexAlbum + displayCountAlbum)
        .map((album) => (
          <div
            key={album.id}
            className="inline-block px-4"
            onClick={() => openAlbumDetails(album.id)}
          >
            <div className="relative w-48 h-64 flex flex-col items-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:z-20">
              <img
                src={album.cover_small}
                alt={album.name}
                className="w-full h-full object-cover mb-4 rounded-lg"
              />
              <p className="text-white text-l truncate w-full text-center">
                {album.name}
              </p>
            </div>
          </div>
        ))}
    </div>
    <button
      onClick={handleNextAlbum}
      disabled={currentIndexAlbum + displayCountAlbum >= albums.length}
      className="disabled:opacity-50 disabled:cursor-not-allowed z-10"
    >
      <FlecheIcon className="w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-150" />
    </button>
  </div>

  {/*Artist*/}
  <h1 className="text-[#d4d4d4] text-3xl mt-10 mb-3 ml-5">Artistes :</h1>
  <div className="flex justify-center items-center mt-4 w-full h-80">
    <button
      onClick={handlePrevArtist}
      disabled={currentIndexArtist === 0}
      className="disabled:opacity-50 disabled:cursor-not-allowed z-10"
    >
      <FlecheIcon className="rotate-180 w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-150" />
    </button>
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 mx-5 overflow-hidden h-full pt-5">
  {artists
    .slice(currentIndexArtist, currentIndexArtist + displayCountArtist)
    .map((artist) => (
      <div
        key={artist.id}
        className="inline-block px-4"
        onClick={() => openArtistDetails(artist.id)} // Ajoutez cette ligne
      >
        <div className="relative w-48 h-64 flex flex-col items-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:z-20">
  <div className="w-full h-56 mb-2 overflow-hidden rounded-lg">
    <img
      src={artist.photo}
      alt={artist.name}
      className="w-full h-full object-cover"
    />
  </div>
  <p className="text-white text-l truncate w-full text-center">
    {artist.name}
  </p>
</div>

      </div>
    ))}
</div>

    <button
      onClick={handleNextArtist}
      disabled={currentIndexArtist + displayCountArtist >= artists.length}
      className="disabled:opacity-50 disabled:cursor-not-allowed z-10"
    >
      <FlecheIcon className="w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-150" />
    </button>
  </div>
</div>

  );
};

export default HomePage;

import React from "react";
import ArtistCard from "./ArtistCard";

const ArtistList = ({ artists }) => {
    return (
        <div className="flex flex-wrap">
            {artists &&
                artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
        </div>
    );
};

export default ArtistList;

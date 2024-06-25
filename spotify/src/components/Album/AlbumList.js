import React from "react";
import AlbumCard from "./AlbumCard";

const AlbumList = ({ albums }) => {
    return (
        <div className="flex flex-wrap">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    );
};

export default AlbumList;

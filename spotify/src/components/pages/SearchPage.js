import React from "react";
import { Helmet } from "react-helmet";
import SearchBar from "./SearchBar";

function SearchPage() {
    const handleSearch = (searchTerm) => {
        console.log("Recherche de:", searchTerm);
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <Helmet>
                <title>Spotifine - Search</title>
            </Helmet>
            <div className="flex flex-col items-center w-full">
                <SearchBar onSearch={handleSearch}/>
            </div>
        </div>
    );
}

export default SearchPage;

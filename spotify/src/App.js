import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AlbumPage from "./components/pages/AlbumPage";
import SearchPage from "./components/pages/SearchPage";
import GenrePage from "./components/pages/GenrePage";
import ArtistPage from "./components/pages/ArtistPage";
import ArtistDetailsPage from "./components/pages/ArtistDetailsPage";
import AlbumDetailsPage from "./components/pages/AlbumDetailsPage";
import GenreDetailsPage from "./components/pages/GenreDetailsPage";
import Nav from "./components/Nav";

function App() {
    return (
        <Router>
            <div className="h-screen w-full bg-gray-800 flex flex-row">
                <Nav />
                <div className="flex-1 bg-page">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/albums" element={<AlbumPage />} />
                        <Route
                            path="/album/:id"
                            element={<AlbumDetailsPage />}
                        />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/genres" element={<GenrePage />} />
                        <Route
                            path="/genres/:id"
                            element={<GenreDetailsPage />}
                        />
                        <Route path="/artists" element={<ArtistPage />} />
                        <Route
                            path="/artist/:id"
                            element={<ArtistDetailsPage />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

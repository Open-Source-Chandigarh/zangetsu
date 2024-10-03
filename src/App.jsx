//component imports
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClockLoader from "./components/Others/ClockLoader";
import {MoreSection} from "./components/Sections/index"
import {AnimePlayerPage, FilteredPage, GenresPage, Home,LoginPage,MoviesPage,RecentPage,SearchResults,SignupPage,Watchlist} from "./components/Pages/index"


// state for showing and hiding spinner
export const GlobalContext = React.createContext();
const App = () => {
  const [videoIsLoading, setVideoIsLoading] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        videoIsLoading,
        setVideoIsLoading,
        setIsLoggedIn,
        loggedIn,
      }}
    >
      {videoIsLoading && <ClockLoader color={"purple"} size={105} />}
      <BrowserRouter>
        <>
          <Routes>
            <Route exact path="/search" element={<SearchResults />} />
            <Route exact path="/recentep" element={<RecentPage></RecentPage>} />
            <Route exact path="/watchlist" element={<Watchlist />} />
            <Route exact path="/filter" element={<GenresPage />} />
            <Route exact path="/more/:section" element={<MoreSection />} />
            <Route exact path="/watch/:id" element={<AnimePlayerPage />} />
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/movies"
              element={<MoviesPage setVideoIsLoading={setVideoIsLoading} />}
            />
            <Route
              exact
              path="/filtered/:type/:value"
              element={<FilteredPage />}
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
export default App;

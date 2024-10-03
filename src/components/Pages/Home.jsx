import React, { useState } from "react";
// import ScrollToTop from "react-scroll-to-top";
import {AnimeSection,Hero,InfiniteSection,UpcomingSection} from "../Sections/index";
import "./Home.css";
const Home = () => {
  const baseURL = process.env.REACT_APP_ANILIST_API_URL;
  const [heroSectionLoaded, setHeroSectionLoaded] = useState(true);

  return (
    <>
      <Hero setHeroSectionLoaded={setHeroSectionLoaded}></Hero>
      {heroSectionLoaded && (
        <>
          <UpcomingSection></UpcomingSection>
          <AnimeSection
            url={`${baseURL}/recent-episodes`}
            id={"recent"}
            sectiontitle={"Recent"}
          ></AnimeSection>
          <AnimeSection
            url={`${baseURL}/advanced-search?format=SPECIAL`}
            id={"special"}
            sectiontitle={"Special"}
          ></AnimeSection>
          <InfiniteSection
            url={`${baseURL}/popular`}
            itemlimit={18}
            sectiontitle={"Most Popular"}
            id="popular"
            querytype={"?"}
          ></InfiniteSection>
        </>
      )}

      {/* <ScrollToTop
        className="scrolltop"
        style={{
          // border: "1px solid dodgerblue",
          background: "rgb(33, 33, 33)",
          opacity: 0.5,
          color: "white",
          boxShadow: "none",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
        top={1500}
        smooth
        color="#fff"
      /> */}
    </>
  );
};
export default Home;

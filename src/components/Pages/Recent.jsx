import {InfiniteSection,Navbar} from "../Sections/index";
import React from "react";
const RecentPage = () => {
  const baseURL = process.env.REACT_APP_CONSUMET_API_URL

  return (
    <>
      <Navbar></Navbar>
      <InfiniteSection
        url={`${baseURL}/meta/anilist/recent-episodes`}
        itemlimit={21}
        sectiontitle={"Recent Episodes"}
        id="recent-section"
        querytype={"?"}
      ></InfiniteSection>
    </>
  );
};
export default RecentPage;

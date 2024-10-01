/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect, useState } from "react";
import {CarouselRenderer} from "../Layouts/index";

const AnimeSection = ({ sectiontitle, url, id }) => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    axios.get(url).then(({ data: { results } }) => {
      setFetchedData(results);
    });
  }, []);
  return (
    <section className="section section-anime" id={id}>
      {fetchedData.length > 0 && (
        <CarouselRenderer
          url={url}
          finalQuery={fetchedData}
          isAnimeCard={true}
          sectionTitle={sectiontitle}
        ></CarouselRenderer>
      )}
    </section>
  );
};
export default AnimeSection;

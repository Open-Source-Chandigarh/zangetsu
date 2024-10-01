import { v4 as uuidv4 } from "uuid";
import {AnimeCard} from "../Cards/index";
const VerticalCarousel = ({ finalQuery, sectionTitle }) => {
  return (
    <div className="vertical-grid-container">
      <h1 className="row-title" style={{ marginLeft: "1%" }}>
        {sectionTitle}
      </h1>
      <div className="vertical-grid">
        {finalQuery.map((query) => (
          <div style={{ textAlign: "center" }}>
            <AnimeCard
              key={uuidv4()}
              image={query.image}
              id={query.id}
              sectionTitle={sectionTitle}
            ></AnimeCard>
            <p style={{ color: "white", marginTop: 5 }}>
              {query.title.english ?? query.title.romaji}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VerticalCarousel;

import {GridRenderer} from "../Layouts/index";
import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import {Navbar} from "../Sections/index";
setConfiguration({ breakpoints: [580, 924, 1434, 1767, 2000, 2400] });
const SearchResults = () => {
  const location = useLocation();
  return (
    <>
      <Navbar></Navbar>
      <h1
        style={{
          fontSize: "3rem",
          color: "white",
          marginTop: 100,
          marginLeft: 20,
          fontWeight: '500'
        }}
      >
        Search Results for{" "}
        <span style={{ color: "yellow" }}> " {location.state.input} "</span>
      </h1>
      <GridRenderer finalQuery={location.state.finalResults}></GridRenderer>
    </>
  );
};
export default SearchResults;

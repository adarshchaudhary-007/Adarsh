import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { setHeroSearchTerm } from "../../Redux/DirectorySlice";
import "./Styles/HeroCont.css";

function HeroCont() {
  const { directoryCode } = useParams();
  const dispatch = useDispatch();
  const heroSearchTerm = useSelector((state) => state.directory.heroSearchTerm);

  const currentDirectory = directoryCode ? directoryCode.toLowerCase() : "ebn";

  let headerText = "";
  if (currentDirectory === "ebn") {
    headerText = "Explore Entrepreneurial and Business Networking Directory";
  } else if (currentDirectory === "panalink") {
    headerText = "Explore Panalink Infotech Ltd. Directory";
  } else {
    const formattedDirectory = currentDirectory.charAt(0).toUpperCase() + currentDirectory.slice(1);
    headerText = `Explore ${formattedDirectory} Directory`;
  }

  return (
    <div className="hero-cont-container">
      <div className="hero-cont-row">
        <div className="hero-cont-column">
          <h1 className={`hero-title ${headerText.length > 40 ? "long-header" : ""} ${currentDirectory === "panalink" ? "center-header" : ""}`}>
            {headerText}
          </h1>
          <h2>Details of all the products and services offered by group members</h2>
          <div className="hero-cont-serchdsgn">
            <input
              type="text"
              className="hero-cont-input"
              value={heroSearchTerm}
              onChange={(e) => dispatch(setHeroSearchTerm(e.target.value))}
              placeholder="Search for group member..."
            />
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCont;

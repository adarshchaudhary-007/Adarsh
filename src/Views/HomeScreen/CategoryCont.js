import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategorySearchTerm, setSelectedCategories } from "../../Redux/DirectorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Styles/CategoryCont.css";

function CategoryCont() {
  const dispatch = useDispatch();
  const directoryCategories = useSelector((state) => state.directory.directoryCategories);
  const directoryCompanies = useSelector((state) => state.directory.directoryCompanies);
  const categorySearchTerm = useSelector((state) => state.directory.categorySearchTerm);
  const selectedCategories = useSelector((state) => state.directory.selectedCategories);

  const filteredCategories = directoryCategories.filter((category) =>
    category.catName.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  const getCategoryCount = (categoryName) => {
    return directoryCompanies.filter((item) =>
      item.services.includes(categoryName)
    ).length;
  };

  const handleCheckboxChange = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      dispatch(setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryName)));
    } else {
      dispatch(setSelectedCategories([...selectedCategories, categoryName]));
    }
  };

  return (
    <div className="category-cont-container">
      <div className="category-cont-fltrlbox">
        <h4 className="category-cont-header">By category:</h4>
        <div className="category-cont-shrbg">
          <FontAwesomeIcon icon={faSearch} className="category-cont-search-icon" />
          <input
            type="text"
            className="category-cont-snglbox"
            placeholder="Search categories..."
            value={categorySearchTerm}
            onChange={(e) => dispatch(setCategorySearchTerm(e.target.value))}
          />
        </div>
        <div className="category-cont-bxdscrl">
          {filteredCategories.map((category, index) => (
            <label className="category-cont-contnr" key={index}>
              {category.catName}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.catName)}
                onChange={() => handleCheckboxChange(category.catName)}
              />
              <span className="category-cont-checkmk"></span>
              <strong className="category-cont-postl">
                ({getCategoryCount(category.catName)})
              </strong>
            </label>
          ))}
        </div>
        <span className="category-cont-smlhdr">
          Showing {filteredCategories.length} Categories
        </span>
      </div>
    </div>
  );
}

export default CategoryCont;

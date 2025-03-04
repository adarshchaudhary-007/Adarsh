import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import SideNav from "../../DashBoard/Components/SideNav";
import UpperNav from "../../DashBoard/Components/UpperNav";
import Footer from "../../DashBoard/Components/Footer";
import { fetchEvents } from "../../../Redux/EventsSlice";
import "./DashEvents.css";

const DashEvents = () => {
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const filteredEvents = events.filter((event) =>
    (event.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  const handleShowEntries = (e) => {
    setShowEntries(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="de-app">
      <SideNav />
      <div className="de-main-content">
        <UpperNav />
        <div className="de-content-wrapper">
          <div className="de-events-header">
            <h2 className="de-events-text-header">Tenant → Events</h2>
            <Link to="/AddEvents" className="de-add-new-button">
              + Add New
            </Link>
          </div>
          <div className="de-events-container">
            <div className="de-events-header-controls">
              <div className="de-search-and-entries">
                <div className="de-show-entries">
                  <label htmlFor="de-show-entries">Show</label>
                  <select
                    id="de-show-entries"
                    value={showEntries}
                    onChange={handleShowEntries}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="de-search">
                  <label htmlFor="de-search-input">Search:</label>
                  <input
                    id="de-search-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : displayedEvents.length === 0 ? (
              <p>No events found</p>
            ) : (
              <div className="de-table-responsive">
                <table className="de-events-table">
                  <thead>
                    <tr className="de-table-header-row">
                      <th className="de-column-name">Event Name</th>
                      <th className="de-column-description">Description</th>
                      <th className="de-column-image">Image</th>
                      <th className="de-column-status">Status</th>
                      <th className="de-column-actions">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedEvents.map((event) => (
                      <tr key={event.event_id}>
                        <td className="de-column-name" data-label="Event Name">
                          <h3 className="de-event-name">{event.title}</h3>
                        </td>
                        <td className="de-column-description" data-label="Description">
                          <p className="de-description">{event.descriptions}</p> {/* Corrected from event.descriptions */}
                        </td>
                        <td className="de-column-image" data-label="Image">
                          <div className="event-img-container">
                            {event.image && (
                              <img
                                src={`/assets/images/${event.image}`}
                                alt={event.title}
                                className="de-event-image"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/images/default-event.png";
                                  e.target.style.objectFit = "scale-down";
                                }}
                              />
                            )}
                          </div>
                        </td>
                        <td className="de-column-status" data-label="Status">
                          <p className="de-status">{event.status}</p>
                        </td>
                        <td className="de-column-actions" data-label="Action">
                          <div className="de-action-icons">
                            <Link to={`/edit-event/${event.event_id}`}>
                              <FaEdit className="de-edit-icon" title="Edit" />
                            </Link>
                            <Link to={`/view-event/${event.event_id}`}>
                              <FaEye className="de-view-icon" title="View" />
                            </Link>
                            <Link to={`/delete-event/${event.event_id}`}>
                              <FaTrash className="de-delete-icon" title="Delete" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="de-pagination-container">
              <button
                className="de-pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`de-pagination-button ${currentPage === index + 1 ? "de-active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="de-pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashEvents;
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../../Redux/CompanyDetailsSlice";
import StickyNav from "./StickyNav";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import "./Styles/companyDetailsPage.css";

function CompanyDetailsPage() {
  const { page_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Added for back navigation
  const dispatch = useDispatch();
  const { companyDetails, status, error } = useSelector((state) => state.company);
  const companyId = location.state?.company_id || "26";
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (
      !companyDetails ||
      !companyDetails.details ||
      String(companyDetails.details.company_id) !== String(companyId)
    ) {
      dispatch(fetchCompanyDetails(companyId));
    }
  }, [dispatch, companyDetails, companyId]);

  const company = companyDetails?.details;
  const pages = companyDetails?.pages || [];
  const page = pages.find((p) => String(p.page_id) === String(page_id));
  const briefWords =
    company && company.briefDescription ? company.briefDescription.split(" ") : [];
  const limitedBriefDescription =
    briefWords.length > 10
      ? briefWords.slice(0, 10).join(" ") + "..."
      : company && company.briefDescription;

  useEffect(() => {
    if (company && page) {
      document.title = `${company.name} - ${page.pageName}`;
    }
  }, [company, page]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed" || error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? error.message || JSON.stringify(error)
        : error;
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>Error: {errorMessage}</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>No company details available.</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>No page details available.</h2>
          <button
            onClick={() => navigate(-1)}
            className="cdp-back-link"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cdp-main-container">
      <StickyNav />
      <div className="cdp-content-container">
        {/* Row for Back to Company */}
        <div className="cdp-row" style={{ marginBottom: "8px" }}>
          <div className="cdp-col">
            <button
              onClick={() => navigate(-1)}
              className="cdp-back-link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <ArrowLeft size={20} />
              <span>Back to Company</span>
            </button>
          </div>
        </div>
        <div className="cdp-row">
          <div className="cdp-col">
            <div className="cdp-coverbox cdp-boxwhitein">
              <div className="cdp-headbggrntop">
                <div className="cdp-topbd">
                  {company.companyLogoURL && company.companyLogo ? (
                    <img
                      src={`${company.companyLogoURL}${company.companyLogo}`}
                      alt={company.name}
                    />
                  ) : (
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        backgroundColor: "#eee",
                      }}
                    />
                  )}
                  <h4>
                    {company.name} - {page.pageName}
                  </h4>
                  <p className="cdp-smlfnt">
                    {company.address}, {company.city}, {company.state},{" "}
                    {company.country}
                  </p>
                  <p>{limitedBriefDescription}</p>
                  <div className="cdp-contact-info-row">
                    <span className="cdp-contact-info-item">
                      <i className="fa fa-phone"></i> {company.phone || "No phone"}
                    </span>
                    <a
                      href={company.email ? `mailto:${company.email}` : "#"}
                      className="cdp-contact-info-item"
                    >
                      <i className="fa fa-envelope"></i> {company.email || "No email"}
                    </a>
                    <a
                      href={
                        company.website
                          ? company.website.startsWith("http")
                            ? company.website
                            : "https://" + company.website
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-contact-info-item"
                    >
                      <i className="fa fa-globe"></i> {company.website || "No website"}
                    </a>
                  </div>
                </div>
              </div>
              <div className="cdp-contbox">
                <div className="cdp-lstbxcnt">
                  <h4>Overview</h4>
                  <p>
                    {company.description ||
                      company.briefDescription ||
                      "No overview available"}
                  </p>
                </div>
                {/* Separate container for Images */}
                {(page.img1 || page.img2) && (
                  <div className="cdp-lstbxcnt">
                    <div className="cdp-images-row">
                      {page.img1 && (
                        <img
                          src={`${page.imgurl}${page.img1}`}
                          alt={page.pageName}
                          className="cdp-page-image"
                        />
                      )}
                      {page.img2 && (
                        <img
                          src={`${page.imgurl}${page.img2}`}
                          alt={page.pageName}
                          className="cdp-page-image"
                        />
                      )}
                    </div>
                  </div>
                )}
                {/* Separate container for Video */}
                {page.videoLink && (
                  <div className="cdp-lstbxcnt">
                    <div className="cdp-video-row">
                      <iframe
                        width="100%"
                        height="315"
                        src={page.videoLink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                <div className="cdp-lstbxcnt">
                  <h4>Contact</h4>
                  <p>
                    Let our Team handle all the Tech, So you can Execute the Rest
                  </p>
                  <p>
                    <strong>Name of Person:</strong>{" "}
                    {company.contactPerson || "Not provided"}
                  </p>
                  <p>
                    <strong>Designation:</strong>{" "}
                    {company.designation || "Director"}
                  </p>
                  <div className="cdp-toprwto">
                    <Link
                      to={
                        company.website
                          ? company.website.startsWith("http")
                            ? company.website
                            : "https://" + company.website
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-btnlkhd"
                    >
                      <i className="fa fa-globe"></i> Website
                    </Link>
                    <Link to={`mailto:${company.email}`} className="cdp-btnemail">
                      <i className="fa fa-envelope"></i> Email
                    </Link>
                    <Link to={`tel:${company.phone}`} className="cdp-btnemail">
                      <i className="fa fa-phone"></i> Phone
                    </Link>
                    <Link
                      to={
                        company.phone
                          ? `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cdp-btnwhatp"
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </Link>
                    <Link to="#" className="cdp-btnshare">
                      <i className="fa fa-share"></i> Share
                    </Link>
                    <button
                      className="cdp-btnchat"
                      onClick={() => setChatOpen(!chatOpen)}
                    >
                      <i className="fa fa-comment"></i> Chat
                    </button>
                  </div>
                  {chatOpen && (
                    <div className="wrapper">
                      <div className="header">
                        <h6>
                          Let's Chat - Online
                          <FaTimes
                            className="close-icon"
                            onClick={() => setChatOpen(false)}
                          />
                        </h6>
                      </div>
                      <div className="text-left">
                        <span className="lightchat">
                          Please fill out the form to start chat!
                        </span>
                      </div>
                      <div className="chat-form">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                        />
                        <textarea
                          className="form-control"
                          placeholder="Your Text Message"
                        ></textarea>
                        <button className="btn btn-success btn-block">
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDetailsPage;

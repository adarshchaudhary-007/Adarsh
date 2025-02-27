import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../../Redux/CompanyDetailsSlice";
import StickyNav from "./StickyNav";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import "./Styles/companyDetailsPage.css";

function CompanyDetailsPage() {
  const { page_id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { companyDetails, status, error } = useSelector((state) => state.company);
  const companyId = location.state?.company_id || "26";

  useEffect(() => {
    if (!companyDetails || !companyDetails.details || String(companyDetails.details.company_id) !== String(companyId)) {
      dispatch(fetchCompanyDetails(companyId));
    }
  }, [dispatch, companyDetails, companyId]);

  const company = companyDetails?.details;
  const pages = companyDetails?.pages || [];
  const page = pages.find((p) => String(p.page_id) === String(page_id));
  const briefWords = company && company.briefDescription ? company.briefDescription.split(" ") : [];
  const limitedBriefDescription = briefWords.length > 10 ? briefWords.slice(0, 10).join(" ") + "..." : company && company.briefDescription;

  useEffect(() => {
    if (company && page) {
      document.title = `${company.name} - ${page.pageName}`;
    }
  }, [company, page]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed" || error) {
    const errorMessage = typeof error === "object" && error !== null ? error.message || JSON.stringify(error) : error;
    return (
      <div className="cdp-main-container">
        <StickyNav />
        <div className="cdp-content-container">
          <h2>Error: {errorMessage}</h2>
          <Link to={`/company/${company ? company.company_id : ""}`} className="cdp-back-link">
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </Link>
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
          <Link to={`/company/${company ? company.company_id : ""}`} className="cdp-back-link">
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </Link>
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
          <Link to={`/company/${company.company_id}`} className="cdp-back-link">
            <ArrowLeft size={20} />
            <span>Back to Company</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cdp-main-container">
      <StickyNav />
      <div className="cdp-content-container">
        <div className="cdp-row" style={{ marginBottom: "8px" }}>
          <div className="cdp-col">
            <Link to={`/company/${company.company_id}`} className="cdp-back-link">
              <ArrowLeft size={20} />
              <span>Back to Company</span>
            </Link>
          </div>
        </div>
        <div className="cdp-row">
          <div className="cdp-col">
            <div className="cdp-coverbox cdp-boxwhitein">
              <div className="cdp-headbggrntop">
                <div className="cdp-topbd">
                  {company.companyLogoURL && company.companyLogo ? (
                    <img src={`${company.companyLogoURL}${company.companyLogo}`} alt={company.name} />
                  ) : (
                    <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#eee" }} />
                  )}
                  <h4>{company.name} - {page.pageName}</h4>
                  <p className="cdp-smlfnt">
                    {company.address}, {company.city}, {company.state}, {company.country}
                  </p>
                  {limitedBriefDescription && (
                    <p className="cdp-smlfnt">{limitedBriefDescription}</p>
                  )}
                </div>
                <div className="cdp-contact-info-row">
                  <span className="cdp-contact-info-item">
                    <i className="fa fa-phone"></i> {company.phone || "No phone"}
                  </span>
                  <a href={company.email ? `mailto:${company.email}` : "#"} className="cdp-contact-info-item">
                    <i className="fa fa-envelope"></i> {company.email || "No email"}
                  </a>
                  <a href={company.website ? (company.website.startsWith("http") ? company.website : "https://" + company.website) : "#"} target="_blank" rel="noopener noreferrer" className="cdp-contact-info-item">
                    <i className="fa fa-globe"></i> {company.website || "No website"}
                  </a>
                </div>
              </div>
              <div className="cdp-contbox">
                <div className="cdp-lstbxcnt">
                  <h4>Overview</h4>
                  <p>{company.description || company.briefDescription || "No overview available"}</p>
                </div>
                <div className="cdp-lstbxcnt cdp-page-media">
                  <div className="cdp-images-row">
                    {page.img1 && (
                      <img src={`${page.imgurl}${page.img1}`} alt={page.pageName} className="cdp-page-image" />
                    )}
                    {page.img2 && (
                      <img src={`${page.imgurl}${page.img2}`} alt={page.pageName} className="cdp-page-image" />
                    )}
                  </div>
                  {page.videoLink && (
                    <div className="cdp-video-row">
                      <iframe width="100%" height="315" src={page.videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  )}
                </div>
                <div className="cdp-lstbxcnt">
                  <h4>Contact</h4>
                  <p>Let our Team handle all the Tech, So you can Execute the Rest</p>
                  <p><strong>Name of the Person:</strong> {company.contactPerson || "Not provided"}</p>
                  <p><strong>Designation:</strong> {company.designation || "Director"}</p>
                  <div className="cdp-toprwto">
                    <Link to={company.website ? (company.website.startsWith("http") ? company.website : "https://" + company.website) : "#"} target="_blank" rel="noopener noreferrer" className="cdp-btnlkhd">
                      <i className="fa fa-globe"></i> Website
                    </Link>
                    <Link to={`mailto:${company.email}`} className="cdp-btnemail">
                      <i className="fa fa-envelope"></i> Email
                    </Link>
                    <Link to={`tel:${company.phone}`} className="cdp-btnemail">
                      <i className="fa fa-phone"></i> Phone
                    </Link>
                    <Link to={company.phone ? `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}` : "#"} target="_blank" rel="noopener noreferrer" className="cdp-btnwhatp">
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </Link>
                    <Link to="#" className="cdp-btnshare">
                      <i className="fa fa-share"></i> Share
                    </Link>
                    <button className="cdp-btnchat">
                      <i className="fa fa-comment"></i> Chat
                    </button>
                  </div>
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

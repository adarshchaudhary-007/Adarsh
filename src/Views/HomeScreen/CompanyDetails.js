import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyDetails } from '../../Redux/CompanyDetailsSlice';
import StickyNav from './StickyNav';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';
import "./Styles/CompanyDetails.css";

function CompanyDetails() {
  const { company_id } = useParams();
  const dispatch = useDispatch();
  const { companyDetails, status, error } = useSelector(state => state.company);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    console.log("Company ID from URL:", company_id);
    if (!company_id) {
      console.error("Error: Company ID is undefined.");
      return;
    }
    // Convert both values to strings for comparison
    const currentId = String(company_id);
    const storedId = companyDetails && companyDetails.details 
                      ? String(companyDetails.details.company_id) 
                      : null;

    if (status === 'idle' || !storedId || storedId !== currentId) {
      console.log("Dispatching fetchCompanyDetails for:", currentId);
      dispatch(fetchCompanyDetails(company_id));
    }
  }, [company_id, dispatch, status, companyDetails]);

  useEffect(() => {
    console.log("Redux status:", status);
    console.log("Redux companyDetails:", companyDetails);
    console.log("Redux error:", error);
  }, [status, companyDetails, error]);

  // Convert error to string if it's an object
  const errorMessage =
    typeof error === 'object' && error !== null
      ? error.message || JSON.stringify(error)
      : error;

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed' || error) {
    return (
      <div>
        <StickyNav />
        <div style={{ margin: "0 20%" }}>
          <h2>{errorMessage || "404 Not Found"}</h2>
          <Link to="/directory/ebn" className="back-link" style={{ display: "inline-block", marginBottom: "5px" }}>
            <ArrowLeft size={20} />
            <span>Back to Directory</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  if (!companyDetails || !companyDetails.details) {
    return (
      <div>
        <StickyNav />
        <div style={{ margin: "0 20%" }}>
          <h2>No company details available.</h2>
          <Link to="/directory/ebn" className="back-link" style={{ display: "inline-block", marginBottom: "5px" }}>
            <ArrowLeft size={20} />
            <span>Back to Directory</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const company = companyDetails.details;
  const pages = companyDetails.pages;

  const briefWords = company.briefDescription ? company.briefDescription.split(" ") : [];
  const limitedBriefDescription = briefWords.length > 20
    ? briefWords.slice(0, 20).join(" ") + "..."
    : company.briefDescription;

  const logoSrc = company.companyLogoURL && company.companyLogo 
    ? `${company.companyLogoURL}${company.companyLogo}`
    : null;

  const whatsappLink = company.phone 
    ? `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`
    : "#";

  return (
    <div className="main-details-container" style={{ paddingTop: "70px" }}>
      <StickyNav />
      <div style={{ margin: "0 20%" }}>
        <div className="row" style={{ marginBottom: "8px" }}>
          <div className="col-md-12">
            <Link to="/directory/ebn" className="back-link" style={{ display: "inline-block", marginBottom: "5px" }}>
              <ArrowLeft size={20} />
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="coverbox boxwhitein">
              <div className="headbggrntop">
                <div className="topbd">
                  {logoSrc ? (
                    <img src={logoSrc} alt={company.name} />
                  ) : (
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#eee" }} />
                  )}
                  <h4>{company.name}</h4>
                  <p className="smlfnt">
                    {company.address}, {company.city}, {company.state}, {company.country}
                  </p>
                  <p>{limitedBriefDescription}</p>
                </div>
              </div>
              <div className="contbox">
                <div className="lstbxcnt">
                  <h4>Overview</h4>
                  <p>{company.description || company.briefDescription || "No overview available"}</p>
                </div>
                {/* In place of the services text, display pages */}
                <div className="services-section">
                  <h5>We provide products and services in following categories:</h5>
                  <ul className="catlist">
                    {pages && pages.map((page) => (
                      <li key={page.page_id}>
                        <Link to={`/page/${page.page_id}`}>{page.pageName}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lstbxcnt">
                  <h4>Contact</h4>
                  <p>Let our Team handle all the Tech, So you can Execute the Rest</p>
                  <p>
                    <strong>Name of Person:</strong> {company.contactPerson || "Not provided"}
                  </p>
                  <div className="toprwto">
                    <Link 
                      to={company.website ? (company.website.startsWith("http") ? company.website : "https://" + company.website) : "#"}
                      target="_blank" rel="noopener noreferrer" 
                      className="btnlkhd"
                    >
                      <i className="fa fa-globe"></i> Website
                    </Link>
                    <Link to={`mailto:${company.email}`} className="btnemail">
                      <i className="fa fa-envelope-o"></i> Email
                    </Link>
                    <Link to={`tel:${company.phone}`} className="btnemail">
                      <i className="fa fa-phone"></i> Phone
                    </Link>
                    <Link to={whatsappLink} target="_blank" rel="noopener noreferrer" className="btnwhatsapp">
                      <i className="fa fa-whatsapp"></i> WhatsApp
                    </Link>
                    <button className="btnchat" onClick={() => setChatOpen(!chatOpen)}>
                      <i className="fa fa-comment"></i> Chat
                    </button>
                  </div>
                  {chatOpen && (
                    <div className="chat-box">
                      <h5>Chat with us</h5>
                      <textarea placeholder="Type your message..." rows="3" />
                      <button>Send</button>
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

export default CompanyDetails;

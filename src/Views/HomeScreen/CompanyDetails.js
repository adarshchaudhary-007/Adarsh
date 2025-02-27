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
    if (!company_id) {
      console.error("Error: Company ID is undefined.");
      return;
    }
    const currentId = String(company_id);
    const storedId = companyDetails && companyDetails.details
      ? String(companyDetails.details.company_id)
      : null;
    if (!companyDetails || status === 'idle' || storedId !== currentId) {
      dispatch(fetchCompanyDetails(company_id));
    }
  }, [company_id, dispatch, status, companyDetails]);

  const errorMessage =
    typeof error === 'object' && error !== null
      ? error.message || JSON.stringify(error)
      : error;

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed' || error) {
    return (
      <div className="cd-main-container">
        <StickyNav />
        <div className="cd-content-container">
          <h2>{errorMessage || "404 Not Found"}</h2>
          <Link to="/directory/ebn" className="cd-back-link">
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
      <div className="cd-main-container">
        <StickyNav />
        <div className="cd-content-container">
          <h2>No company details available.</h2>
          <Link to="/directory/ebn" className="cd-back-link">
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
  const briefWords = company.briefDescription
    ? company.briefDescription.split(" ")
    : [];
  const limitedBriefDescription =
    briefWords.length > 10
      ? briefWords.slice(0, 10).join(" ") + "..."
      : company.briefDescription;
  const logoSrc =
    company.companyLogoURL && company.companyLogo
      ? `${company.companyLogoURL}${company.companyLogo}`
      : null;
  const whatsappLink = company.phone
    ? `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`
    : "#";

  return (
    <div className="cd-main-container">
      <StickyNav />
      <div className="cd-content-container">
        <div className="cd-row" style={{ marginBottom: "8px" }}>
          <div className="cd-col">
            <Link to="/directory/ebn" className="cd-back-link">
              <ArrowLeft size={20} />
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
        <div className="cd-row">
          <div className="cd-col">
            <div className="cd-coverbox cd-boxwhitein">
              <div className="cd-headbggrntop">
                <div className="cd-topbd">
                  {logoSrc ? (
                    <img src={logoSrc} alt={company.name} />
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
                  <h4>{company.name}</h4>
                  <p className="cd-smlfnt">
                    {company.address}, {company.city}, {company.state},{" "}
                    {company.country}
                  </p>
                  <p>{limitedBriefDescription}</p>
                  <div className="cd-contact-info-row">
                    <span className="cd-contact-info-item">
                      <i className="fa fa-phone"></i> {company.phone || "No phone"}
                    </span>
                    <a
                      href={company.email ? `mailto:${company.email}` : "#"}
                      className="cd-contact-info-item"
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
                      className="cd-contact-info-item"
                    >
                      <i className="fa fa-globe"></i> {company.website || "No website"}
                    </a>
                  </div>
                </div>
              </div>
              <div className="cd-contbox">
                <div className="cd-lstbxcnt">
                  <h4>Overview</h4>
                  <p>
                    {company.description ||
                      company.briefDescription ||
                      "No overview available"}
                  </p>
                </div>
                <div className="cd-lstbxcnt">
                  <h5>We provide products and services in following categories:</h5>
                  <ul className="cd-catlist">
                    {pages &&
                      pages.map((page) => (
                        <li key={page.page_id}>
                          <i className="fa fa-check"></i>
                          <Link
                            to={`/page/${page.page_id}`}
                            state={{ company_id: company.company_id }}
                          >
                            {page.pageName}
                          </Link>
                          <i className="cd-arrow-right">&rarr;</i>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="cd-lstbxcnt">
                  <h4>Contact</h4>
                  <p>Let our Team handle all the Tech, So you can Execute the Rest</p>
                  <p><strong>Name of the Person:</strong> {company.contactPerson || "Not provided"}</p>
                  <p><strong>Designation:</strong> {company.designation || "Director"}</p>
                  <div className="cd-toprwto">
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
                      className="cd-btnlkhd"
                    >
                      <i className="fa fa-globe"></i> Website
                    </Link>
                    <Link to={`mailto:${company.email}`} className="cd-btnemail">
                      <i className="fa fa-envelope"></i> Email
                    </Link>
                    <Link to={`tel:${company.phone}`} className="cd-btnemail">
                      <i className="fa fa-phone"></i> Phone
                    </Link>
                    <Link
                      to={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cd-btnwhatp"
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </Link>
                    <Link to="#" className="cd-btnshare">
                      <i className="fa fa-share"></i> Share
                    </Link>
                    <button className="cd-btnchat" onClick={() => setChatOpen(!chatOpen)}>
                      <i className="fa fa-comment"></i> Chat
                    </button>
                  </div>
                  {chatOpen && (
                    <div className="cd-chat-box">
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

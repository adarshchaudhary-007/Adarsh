import React, { useState } from "react";
import StickyNav from "../HomeScreen/StickyNav";
import Footer from "../HomeScreen/Footer";

const EventItem = ({ title, description }) => (
  <div className="rwarwhite">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
    {
      title: "India Cloud Summit 2024",
      description:
        "Innovate And Transform - Strategies For Cloud Adoption And Data Innovation. The India Cloud Summit is an ROI-driven event uniting cloud innovators, technologists, and business leaders to shape the future of digital transformation.",
    },
    {
      title: "Future Fintech Forum & Exhibition 2024",
      description:
        "Join the Indian Fintech Revolution. The India fintech market is poised to grow at a CAGR of more than 10 percent during the forecast period.",
    },
    {
      title: "Smart CIO Summit 2024",
      description:
        "India's must-attend technology event of C-Level Executives. At Smart CIO Summit, we recognize the pivotal role that CIOs play in driving technological innovation and digital transformation.",
    },
  ];

  const pastEvents = [
    {
      title: "ET Retail E-Commerce & Digital Natives Summit 2024",
      description:
        "Sketching the World-Class Future of Indian Ecommerce Industry. ET Retail E-Commerce & Digital Natives Summit will bring together industry pioneers, thought leaders and innovators to delve into the dynamic landscape of digital commerce.",
    },
    {
      title:
        "International Conference on Emerging Techniques in Computational Intelligence 2024",
      description:
        "This conference aims to highlight the evolution of topics, frontline research and multiple applications, in the domain of Computational Intelligence from the mainstream foundations to novel investigations and applications.",
    },
  ];

  const renderEvents = (events) =>
    events.map((event, index) => (
      <EventItem
        key={index}
        title={event.title}
        description={event.description}
      />
    ));

  return (
    <>
      <style>{`
        .tabliting .tab-content {
          padding: 20px 0;
        }
        .tabliting .tab-content .rwarwhite {
          background-color: #fff;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
          font-size: 12px;
        }
        .tabliting .tab-content h2 {
          font-weight: 500;
          font-size: 16px;
          margin: 0 0 5px 0;
          color: rgb(33, 37, 41);
        }
        .tabliting .tab-content p {
          font-size: 14px;
          margin: 0 0 5px 0;
          color: rgb(75, 85, 99);
        }
        /* Tab Title Container */
        .nav-tabs {
          border-radius: 5px;
          margin-bottom: 0 !important;
        }
        .nav-tabs .nav-link {
          color: rgb(32, 121, 172);
          background-color: transparent;
          border: none;
          font-weight: 600;
          padding: 10px 15px;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }
        .nav-tabs .nav-link:not(.active):hover {
          box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3) !important;
        }
        .nav-tabs .nav-link.active {
          color: white;
          font-weight: 600;
    background-image: linear-gradient(to right bottom, rgb(32, 121, 172), rgb(12, 74, 110)) !important;          border: none;
        }
        /* Full-width gradient line immediately below the tab titles */
        .tab-indicator {
          width: 100%;
          height: 2px;
          background: linear-gradient(to right bottom, rgb(32, 121, 172), rgb(12, 74, 110));
          margin: 0;
        }
      `}</style>
      <div className="main-events-container" style={{ paddingTop: "78px" }}>
        <StickyNav />
        <div
          className="container"
          style={{ width: "100%", maxWidth: "850px", paddingBottom: "10px" }}
        >
          <div className="row">
            <div
              className="col-md-10 rodhdr"
              style={{
                paddingRight: "0",
                marginBottom: "-10px",
                marginTop: "20px",
              }}
            >
              <h1 style={{ margin: "0", fontWeight: "630", fontSize: "30px" }}>
                Events
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div
                className="coverbox tabliting"
                style={{ marginBottom: "10px", marginTop:"30px" }}
              >
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className={`nav-link ${
                        activeTab === "upcoming" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      Upcoming Events
                    </button>
                    <button
                      className={`nav-link ${
                        activeTab === "past" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("past")}
                    >
                      Past Events
                    </button>
                  </div>
                </nav>
                <div className="tab-indicator"></div>
                <div className="tab-content">
                  {activeTab === "upcoming" && renderEvents(upcomingEvents)}
                  {activeTab === "past" && renderEvents(pastEvents)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Events;

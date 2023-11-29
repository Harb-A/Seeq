import React, { useState } from "react";
import PersonalCard from "../components/PersonalCard.js";
import Taskbar from "../components/Taskbar.js";
import "../styles/Applications.css";

const Applications = () => {
  // Dummy array containing your job applications (later feed data from API)
  const myApplications = [
    {
      id: 1,
      title: "My Application 1",
      description: "My Application Description 1",
    },
    {
      id: 2,
      title: "My Application 2",
      description: "My Application Description 2",
    },
    {
      id: 3,
      title: "My Application 3",
      description: "My Application Description 3",
    },
  ];

  // Dummy array containing received job applications (later feed data from API)
  const receivedApplications = [
    {
      id: 4,
      title: "Received Application 1",
      description: "Received Application Description 1",
    },
    {
      id: 5,
      title: "Received Application 2",
      description: "Received Application Description 2",
    },
    {
      id: 6,
      title: "Received Application 3",
      description: "Received Application Description 3",
    },
  ];

  // State to determine whether to show your received applications or your applications
  const [showReceivedApplications, setShowReceivedApplications] =
    useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;
  const indexOfLastApplication = currentPage * maxPerPage;
  const indexOfFirstApplication = indexOfLastApplication - maxPerPage;

  // Depending on state, select the corresponding list of applications
  const applicationsToShow = showReceivedApplications
    ? receivedApplications
    : myApplications;
  const displayedApplications = applicationsToShow.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {/* Taskbar embedded into the My Applications page */}
      <Taskbar />

      <div>
        {/* Buttons to toggle between received and my applications */}
        <div className="applications-button-container">
          <button
            className={`applications-toggle ${
              showReceivedApplications ? "" : "active"
            }`}
            onClick={() => setShowReceivedApplications(false)}
          >
            My Applications
          </button>
          <button
            className={`applications-toggle ${
              showReceivedApplications ? "active" : ""
            }`}
            onClick={() => setShowReceivedApplications(true)}
          >
            Received Applications
          </button>
        </div>

        {/* Received or my applications based on state*/}
        <div className="applications-container">
          {showReceivedApplications
            ? displayedApplications.map((application) => (
                <PersonalCard
                  key={application.id}
                  title={application.title}
                  description={application.description}
                  isHidden={true}
                />
              ))
            : displayedApplications.map((application) => (
                <PersonalCard
                  key={application.id}
                  title={application.title}
                  description={application.description}
                  isHidden={false}
                />
              ))}
        </div>

        {/* Pagination bar to navigate pages of the applications if more than 5 */}
        <div className="appliactions-pagination-container">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            &lt;
          </button>
          <div>{`Page ${currentPage}`}</div>
          <button
            onClick={goToNextPage}
            disabled={indexOfLastApplication >= applicationsToShow.length}
          >
            &gt;
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Applications;

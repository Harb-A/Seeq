import React, { useEffect, useState } from "react";

import Taskbar from "../components/Taskbar.js";
import "../styles/Applications.css";

import ReceivedApplication from "../components/ReceivedApplication.js";
import MyApplication from "../components/MyApplication.js";
import ApplicationJob from "../components/ApplicationJob.js";

const Applications = () => {
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token not found in localStorage.");
          //setLoading(false);
          return;
        }

        const myApplicationsResponse = await fetch(
          "http://localhost:4000/posts/myapplications",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const myApplicationsData = await myApplicationsResponse.json();
        setMyApplications(myApplicationsData);
        console.log(myApplicationsData);
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching My Applications:", error);
        // setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);
  // Dummy array containing received job applications (later feed data from API)
  // const receivedApplications = [
  //   {
  //     id: 6,
  //     title: "Frontend Developer",
  //     description: "Building modern and responsive user interfaces",
  //     applicant: {
  //       name: "Applicant 1",
  //       email: "applicant1@example.com",
  //       phone: "987-654-3210",
  //       coverLetter: "I am passionate about creating...",
  //       resumeUrl: "/path/to/applicant1_resume.pdf",
  //     },
  //   },
  //   {
  //     id: 7,
  //     title: "Graphic Designer",
  //     description: "Design visually appealing graphics and illustrations",
  //     applicant: {
  //       name: "Applicant 2",
  //       email: "applicant2@example.com",
  //       phone: "987-654-3210",
  //       coverLetter: "With a keen eye for aesthetics and creativity...",
  //       resumeUrl: "/path/to/applicant2_resume.pdf",
  //     },
  //   },
  //   {
  //     id: 8,
  //     title: "Data Analyst",
  //     description:
  //       "Analyzing and interpreting data to support business decisions",
  //     applicant: {
  //       name: "Applicant 3",
  //       email: "applicant3@example.com",
  //       phone: "987-654-3210",
  //       coverLetter: "I possess strong analytical skills and a passion...",
  //       resumeUrl: "/path/to/applicant3_resume.pdf",
  //     },
  //   },
  //   {
  //     id: 9,
  //     title: "Content Writer",
  //     description:
  //       "Create engaging and informative content for various platforms",
  //     applicant: {
  //       name: "Applicant 4",
  //       email: "applicant4@example.com",
  //       phone: "987-654-3210",
  //       coverLetter: "I am a skilled content writer with experience in...",
  //       resumeUrl: "/path/to/applicant4_resume.pdf",
  //     },
  //   },
  //   {
  //     id: 10,
  //     title: "Sales Representative",
  //     description: "Drive sales and build strong customer relationships",
  //     applicant: {
  //       name: "Applicant 5",
  //       email: "applicant5@example.com",
  //       phone: "987-654-3210",
  //       coverLetter:
  //         "I am a results-oriented sales professional with a proven track record...",
  //       resumeUrl: "/path/to/applicant5_resume.pdf",
  //     },
  //   },
  // ];

  const DummyJobPost = {
    title: "Software Engineer",
    position: "Full Stack Developer",
    description:
      "We are seeking a talented Software Engineer to join our dynamic team. The ideal candidate will have a strong background in full-stack development and a passion for creating innovative solutions. Join us in building cutting-edge applications that make a difference.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "RESTful APIs"],
  };

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
            onClick={() =>
              setShowReceivedApplications(false) & setCurrentPage(1)
            }
          >
            My Applications
          </button>
          <button
            className={`applications-toggle ${
              showReceivedApplications ? "active" : ""
            }`}
            onClick={() =>
              setShowReceivedApplications(true) & setCurrentPage(1)
            }
          >
            Received Applications
          </button>
        </div>

        <ApplicationJob post={DummyJobPost} />
        {/* Received or my applications based on state*/}
        <div className="applications-container">
          {showReceivedApplications
            ? displayedApplications.map((application) => (
                <ReceivedApplication
                  key={application.id}
                  name={application.applicant.name}
                  email={application.applicant.email}
                  phone={application.applicant.phone}
                  coverLetter={application.applicant.coverLetter}
                  resumeUrl={application.applicant.resumeUrl}
                />
              ))
            : displayedApplications.map((application) => (
                <MyApplication
                  key={application.id}
                  name={application.name}
                  email={application.email}
                  phone={application.phone}
                  coverLetter={application.coverLetter}
                  resumeUrl={application.resumeUrl}
                />
              ))}
        </div>

        {/* Pagination bar to navigate pages of the applications if more than 5 */}
        <div className="applications-pagination-container">
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

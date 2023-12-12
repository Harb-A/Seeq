import React, { useEffect, useState } from "react";

import Taskbar from "../components/Taskbar.js";
import "../styles/Applications.css";
import ApplicationJob from "../components/ApplicationJob.js";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [myApplications, setMyApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [loadingMyApplications, setLoadingMyApplications] = useState(true);
  const [loadingReceivedApplications, setLoadingReceivedApplications] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          // If not authenticated, redirect to the login page
          console.log("Access token not found. Redirecting to login page...");
          navigate("/"); // Adjust the path based on your route setup
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
        setLoadingMyApplications(false);
      } catch (error) {
        console.error("Error fetching My Applications:", error);
        setLoadingMyApplications(false);
      }
    };

    fetchMyApplications();
  }, []);

  useEffect(() => {
    const fetchMyReceivedApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // If not authenticated, redirect to the login page
          console.log("Access token not found. Redirecting to login page...");
          navigate("/"); // Adjust the path based on your route setup
        }

        if (!accessToken) {
          console.error("Access token not found in localStorage.");
          setLoadingReceivedApplications(false);
          return;
        }

        const myReceivedApplicationsResponse = await fetch(
          "http://localhost:4000/posts/postsWithApps",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const myReceivedApplicationsData =
          await myReceivedApplicationsResponse.json();
        setReceivedApplications(myReceivedApplicationsData);
        setLoadingReceivedApplications(false);
      } catch (error) {
        console.error("Error fetching My Received Applications:", error);
        setLoadingReceivedApplications(false);
      }
    };

    fetchMyReceivedApplications();
  }, []);

  // State to determine whether to show your received applications or your applications
  const [showReceivedApplications, setShowReceivedApplications] =
    useState(false);

  // Depending on state, select the corresponding list of applications
  const applicationsToShow = showReceivedApplications
    ? receivedApplications
    : myApplications;
  const displayedApplications = applicationsToShow;

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
          {loadingMyApplications || loadingReceivedApplications ? (
            <div className="api-status-container">Loading...</div>
          ) : displayedApplications.length === 0 ? (
            <div className="api-status-container">Nothing found</div>
          ) : (
            displayedApplications.map((application) => (
              <ApplicationJob
                key={application._id}
                post={application}
                isMine={!showReceivedApplications}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;

import React, { useState, useEffect } from "react";
import "../styles/Resume.css";
import Taskbar from "../components/Taskbar";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    overview: "",
    education: "",
    projects: "",
    skills: [],
  });

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      // Get the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // If not authenticated, redirect to the login page
        console.log("Access token not found. Redirecting to login page...");
        navigate("/"); // Adjust the path based on your route setup
      }

      const response = await fetch("http://localhost:4000/resumes/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        console.error(`Server returned an error: ${response.status}`);
        return;
      }

      const data = await response.json();
      setFormData(data);
      console.log("Data from server:", data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "skills") {
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: skillsArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    const pdf = generatePDF();
    const pdfDataUrl = pdf.output("dataurl");
    saveDataToDatabase(pdfDataUrl);
    console.log("Form Data to be sent to server:", formData);
    setEditable(false);
  };

  const saveDataToDatabase = async (pdfDataUrl) => {
    try {
      // Get the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // Handle the case where the access token is not available
        console.error("Access token not found in localStorage.");
        return;
      }

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("interests", formData.interests);
      fd.append("overview", formData.overview);
      fd.append("education", formData.education);
      fd.append("projects", formData.projects);
      fd.append("skills", formData.skills);

      console.log(formData.skills, "Skills array");

      // Create a Blob from the PDF data URL
      const pdfBlob = await fetch(pdfDataUrl).then((res) => res.blob());
      // Append the PDF data as a file
      fd.append("resume", pdfBlob, "resume.pdf");

      const response = await fetch("http://localhost:4000/resumes/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: fd,
      });

      if (!response.ok) {
        console.error(`Server returned an error: ${response.status}`);
        return;
      }

      console.log("Data successfully uploaded to the server.");
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);

    // Add header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Resume", pdf.internal.pageSize.width / 2, 20, {
      align: "center",
    });

    // Add contact information
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`${formData.name}`, 20, 40);
    pdf.text(`Email: ${formData.email}`, 20, 50);
    pdf.text(`Phone: ${formData.phone}`, 20, 60);

    let currentY = 80; // Set initial Y-coordinate for the first category

    // Add sections with bold subtitles and headers
    const addCategory = (title, content) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(title, 20, currentY);
      currentY += 10; // Adjust the Y-coordinate to reduce space
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(content, 20, currentY);
      currentY += 30; // Adjust the Y-coordinate to reduce space
    };

    addCategory("Overview", formData.overview);
    addCategory("Education", formData.education);
    addCategory("Projects", formData.projects);
    addCategory("Skills", formData.skills);

    // Add footer
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text(
      "Generated by SEEQS",
      pdf.internal.pageSize.width / 2,
      pdf.internal.pageSize.height - 10,
      { align: "center" }
    );
    pdf.save("resume.pdf");
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);

    // Add header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Resume", pdf.internal.pageSize.width / 2, 20, {
      align: "center",
    });

    // Add contact information
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`${formData.name}`, 20, 40);
    pdf.text(`Email: ${formData.email}`, 20, 50);
    pdf.text(`Phone: ${formData.phone}`, 20, 60);

    let currentY = 80; // Set initial Y-coordinate for the first category

    // Add sections with bold subtitles and headers
    const addCategory = (title, content) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(title, 20, currentY);
      currentY += 10; // Adjust the Y-coordinate to reduce space
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(content, 20, currentY);
      currentY += 30; // Adjust the Y-coordinate to reduce space
    };

    addCategory("Overview", formData.overview);
    addCategory("Education", formData.education);
    addCategory("Projects", formData.projects);
    addCategory("Skills", formData.skills);

    // Add footer
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text(
      "Generated by SEEQS",
      pdf.internal.pageSize.width / 2,
      pdf.internal.pageSize.height - 10,
      { align: "center" }
    );
    return pdf; // Return the generated PDF
  };

  return (
    <div>
      <Taskbar />
      <div className="resume-container">
        <div className="resume">
          {" "}
          <div className="resume-header">
            <h1 className="resume-heading">Resume</h1>
            {editable ? (
              <button onClick={handleSaveClick} className="resume-edit-btn">
                Save your resume
              </button>
            ) : (
              <>
                {" "}
                <button onClick={handleEditClick} className="resume-edit-btn">
                  Edit
                </button>
                <button onClick={handleDownloadPDF} className="resume-edit-btn">
                  Download
                </button>
              </>
            )}
          </div>
          <form className="resume-form">
            <label>
              Name:
              {editable ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="resume-input"
                />
              ) : (
                <div className="resume-display">{formData.name}</div>
              )}
            </label>
            <br />
            <label>
              Email:
              {editable ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="resume-input"
                />
              ) : (
                <div className="resume-display">{formData.email}</div>
              )}
            </label>
            <br />
            <label>
              Phone Number:
              {editable ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="resume-input"
                />
              ) : (
                <div className="resume-display">{formData.phone}</div>
              )}
            </label>
            <br />
            <label>
              Interests:
              {editable ? (
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="resume-textarea"
                />
              ) : (
                <div className="resume-display">{formData.interests}</div>
              )}
            </label>
            <br />
            <label>
              Overview:
              {editable ? (
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  className="resume-textarea"
                />
              ) : (
                <div className="resume-display">{formData.overview}</div>
              )}
            </label>
            <label>
              Education:
              {editable ? (
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="resume-textarea"
                />
              ) : (
                <div className="resume-display">{formData.education}</div>
              )}
            </label>
            <br />
            <label>
              Projects:
              {editable ? (
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  className="resume-textarea"
                />
              ) : (
                <div className="resume-display">{formData.projects}</div>
              )}
            </label>
            <br />
            <label>
              Skills:
              {editable ? (
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="resume-textarea"
                />
              ) : (
                <div className="resume-display">{formData.skills}</div>
              )}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Resume;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Taskbar from "../components/Taskbar";
import "../styles/DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState();

  const [coverLetter, setCoverLetter] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");

    fetch(`http://localhost:4000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setItemData(data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [id]);

  if (!itemData) {
    return <p>Loading...</p>;
  }

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachedFile(file);
  };

  const handleSubmitApplication = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("cover_letter", coverLetter);
      formData.append("resume", attachedFile);

      console.log(formData);

      const response = await fetch(`http://localhost:4000/posts/${id}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error(`Server returned an error: ${response.status}`);
        return;
      }

      console.log("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div>
      <Taskbar />

      <div className="post-details-container">
        <div className="post-details">
          <div className="post-details-header">
            <h2 className="post-details-title">{itemData[0].title}</h2>
            <p className="position-text">{itemData[0].position}</p>
          </div>

          <p className="description-text">
            Description: <br />
            {itemData[0].description}
          </p>
          <p className="skills-text">
            Skills: <br />
            {itemData[0].skills.join(", ")}
          </p>
          <div className="post-details-footer"></div>
        </div>

        <div className="apply-form">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            className="cl-textarea"
            value={coverLetter}
            onChange={handleCoverLetterChange}
          />

          <label htmlFor="file" className="walak">
            Attach PDF
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          <button className="submit-button" onClick={handleSubmitApplication}>
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

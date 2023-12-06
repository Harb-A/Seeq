import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Taskbar from "../components/Taskbar";

const DetailPage = () => {
  //Grab the ID of the post from the URL parameters
  const { id } = useParams();

  //Use state for the data received from the API, initially null
  const [itemData, setItemData] = useState(null);

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [id]);

  return (
    <div>
      <Taskbar />
      <h2>{id}</h2>
      {/* Display detailed information and additional functions for the specific item */}
      {/* <h2>{itemData.title}</h2>
      <p>{itemData.description}</p> */}
      {/* Add more details and functions as needed */}
    </div>
  );
};

export default DetailPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  //Grab the ID of the post from the URL parameters
  const { id } = useParams();

  //Use state for the data received from the API, initially null
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");

    //Fetch from the post details from the API using the ID fo the post
    fetch(`DUMMYAPI_URL/${id}`, {
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

  return (
    <div>
      <h2>{id}</h2>
      {/* Display detailed information and additional functions for the specific item */}
      {/* <h2>{itemData.title}</h2>
      <p>{itemData.description}</p> */}
      {/* Add more details and functions as needed */}
    </div>
  );
};

export default DetailPage;

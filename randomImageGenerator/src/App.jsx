import React, { useState } from "react";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState("nature");

  const fetchImage = () => {
    setImageUrl(null);
    const url = `https://api.api-ninjas.com/v1/randomimage?category=${category}`;

    fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_KEY,
        Accept: "image/jpg",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob(); // Assuming the API returns a JSON object with the image URL
      })
      .then((blob) => {
        const imageObjectURL = URL.createObjectURL(blob);
        setImageUrl(imageObjectURL); // Adjust according to the actual key that API responds with
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="container">
      <h1>{category}</h1>
      <div className="whole">
        {imageUrl && <img src={imageUrl} alt="Fetched from API" />}
        <button onClick={() => fetchImage()}>Fetch Image</button>
      </div>

      <div className="categories">
        <button onClick={() => handleCategory("city")}>city</button>
        <button onClick={() => handleCategory("food")}>food</button>
        <button onClick={() => handleCategory("technology")}>technology</button>
      </div>
    </div>
  );
}

export default App;

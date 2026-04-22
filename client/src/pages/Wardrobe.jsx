import { useEffect, useState } from "react";
import axios from "axios";
import "./Wardrobe.css";

export default function Wardrobe() {
  const [clothes, setClothes] = useState([]);
  const [outfit, setOutfit] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/clothes");
      setClothes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSuggestion = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/ai/suggest");
      setOutfit(res.data.outfit);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FILTER LOGIC
  const filteredClothes =
    filter === "All"
      ? clothes
      : clothes.filter((item) => item.type === filter);

  return (
    <div className="container">
      <h2>My Wardrobe</h2>

      {/* ✅ FILTER BUTTONS */}
      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Top" ? "active" : ""}
          onClick={() => setFilter("Top")}
        >
          Top
        </button>
        <button
          className={filter === "Bottom" ? "active" : ""}
          onClick={() => setFilter("Bottom")}
        >
          Bottom
        </button>
        <button
          className={filter === "Shoes" ? "active" : ""}
          onClick={() => setFilter("Shoes")}
        >
          Shoes
        </button>
      </div>

      {/* ✅ CLOTHES GRID */}
      {filteredClothes.length === 0 ? (
        <p>No clothes found</p>
      ) : (
        <div className="grid">
          {filteredClothes.map((item) => (
            <div className="card" key={item._id}>
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
              <p>{item.type}</p>
              <p>{item.color}</p>
            </div>
          ))}
        </div>
      )}

      {/* AI BUTTON */}
      <button className="button" onClick={getSuggestion}>
        Suggest Outfit
      </button>

      <h2>Suggested Fit</h2>

      {/* AI RESULT */}
      {outfit.length === 0 ? (
        <p>No suggestion yet</p>
      ) : (
        <div className="outfit">
          {outfit.map((item) => (
            <div className="outfit-card" key={item._id}>
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
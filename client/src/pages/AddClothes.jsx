import { useState } from "react";
import axios from "axios";
import "./Wardrobe.css";

export default function AddClothes() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    color: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/clothes", form);
      alert("Cloth added successfully 🎉");

      setForm({
        name: "",
        type: "",
        color: "",
        image: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Add New Cloth</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Cloth name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Top">Top</option>
          <option value="Bottom">Bottom</option>
          <option value="Shoes">Shoes</option>
        </select>

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button">
          Add Cloth
        </button>
      </form>
    </div>
  );
}
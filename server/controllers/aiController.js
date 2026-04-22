const Cloth = require("../models/Cloth");

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const colorMatch = (color1, color2) => {
  const neutral = ["black", "white", "grey", "beige"];

  if (neutral.includes(color1.toLowerCase())) return true;
  if (neutral.includes(color2.toLowerCase())) return true;

  return color1.toLowerCase() === color2.toLowerCase();
};

exports.getOutfitSuggestion = async (req, res) => {
  try {
    const clothes = await Cloth.find();

    const tops = clothes.filter((c) => c.type === "Top");
    const bottoms = clothes.filter((c) => c.type === "Bottom");
    const shoes = clothes.filter((c) => c.type === "Shoes");

    if (!tops.length || !bottoms.length || !shoes.length) {
      return res.json({
        message: "Add Top, Bottom, and Shoes first"
      });
    }

    const top = randomItem(tops);

    let matchingBottoms = bottoms.filter((b) =>
      colorMatch(top.color, b.color)
    );

    if (!matchingBottoms.length) matchingBottoms = bottoms;

    const bottom = randomItem(matchingBottoms);

    let matchingShoes = shoes.filter((s) =>
      colorMatch(top.color, s.color) ||
      colorMatch(bottom.color, s.color)
    );

    if (!matchingShoes.length) matchingShoes = shoes;

    const shoe = randomItem(matchingShoes);

    res.json({
      message: "Smart outfit generated",
      outfit: [top, bottom, shoe]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
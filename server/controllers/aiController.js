// server/controllers/aiController.js
const Cloth = require("../models/Cloth");

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const colorMatch = (color1, color2) => {
  const neutral = ["black", "white", "grey", "gray", "beige", "cream", "white", "off-white"];
  if (!color1 || !color2) return true;
  if (neutral.includes(color1.toLowerCase())) return true;
  if (neutral.includes(color2.toLowerCase())) return true;
  return color1.toLowerCase() === color2.toLowerCase();
};

exports.getOutfitSuggestion = async (req, res) => {
  try {
    const { gender, time, weather, userId } = req.query;

    // Filter by userId if provided so each user sees their own clothes
    const filter = userId ? { userId } : {};
    const clothes = await Cloth.find(filter);

    const tops    = clothes.filter((c) => c.type === "Top");
    const bottoms = clothes.filter((c) => c.type === "Bottom");
    const shoes   = clothes.filter((c) => c.type === "Shoes");
    const accessories = clothes.filter((c) => c.type === "Accessory");

    if (!tops.length || !bottoms.length || !shoes.length) {
      return res.json({
        message: "Add at least one Top, Bottom, and Shoes to get suggestions",
        outfit: [],
      });
    }

    // ── Weather / time context filtering ────────────────
    // Prefer lighter colors when hot/day, darker when cold/night
    let preferredTops = tops;
    if (weather === "hot" || time === "day") {
      const light = tops.filter((t) =>
        ["white", "beige", "cream", "light", "grey", "gray"].some((w) =>
          t.color?.toLowerCase().includes(w)
        )
      );
      if (light.length) preferredTops = light;
    } else if (weather === "cold" || time === "night") {
      const dark = tops.filter((t) =>
        ["black", "dark", "navy", "brown", "deep"].some((w) =>
          t.color?.toLowerCase().includes(w)
        )
      );
      if (dark.length) preferredTops = dark;
    }

    const top = randomItem(preferredTops);

    let matchingBottoms = bottoms.filter((b) => colorMatch(top.color, b.color));
    if (!matchingBottoms.length) matchingBottoms = bottoms;
    const bottom = randomItem(matchingBottoms);

    let matchingShoes = shoes.filter(
      (s) => colorMatch(top.color, s.color) || colorMatch(bottom.color, s.color)
    );
    if (!matchingShoes.length) matchingShoes = shoes;
    const shoe = randomItem(matchingShoes);

    const outfit = [top, bottom, shoe];

    // Optionally include an accessory
    if (accessories.length) {
      outfit.push(randomItem(accessories));
    }

    // Build a context label for the UI
    const contextLabel = [
      gender ? `For ${gender}` : null,
      time === "day" ? "☀️ Daytime" : time === "night" ? "🌙 Night Out" : null,
      weather === "hot" ? "🌡️ Hot" : weather === "cold" ? "🧥 Cold" : weather === "rainy" ? "🌧️ Rainy" : null,
    ]
      .filter(Boolean)
      .join(" · ");

    res.json({
      message: "Smart outfit generated",
      contextLabel,
      outfit,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
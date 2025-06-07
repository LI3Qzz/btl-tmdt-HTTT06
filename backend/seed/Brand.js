const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e20102e12c44f59943dd", name: "Mô Hình Jujutsu Kaisen" }, // ID placeholder
  { _id: "65a7e20102e12c44f59943db", name: "Mô hình Dragon Ball" }, // ID placeholder
  { _id: "65a7e20102e12c44f59943da", name: "Mô hình One Piece" }, // ID placeholder
  { _id: "65a7e20102e12c44f59943dc", name: "Mô hình Naruto" }, // ID placeholder
  { _id: "65a7e20102e12c44f59943de", name: "Mô hình Kimetsu no Yaiba" }, // ID placeholder
];

exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Brand seeded successfully');
  } catch (error) {
    console.log(error);
  }
};

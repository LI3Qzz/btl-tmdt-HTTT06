const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "Có LED" },
  { _id: "65a7e24602e12c44f599442d", name: "Không LED" },
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

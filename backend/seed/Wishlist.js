const Wishlist = require("../models/Wishlist");

const wishlistItem = [
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444e",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Can't. Stop. Thinking. About. This. Phone.  All the new features are giving me major FOMO. Next paycheck, consider yourself spent! **",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599444f",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "My signature scent just got an upgrade! This perfume is the perfect addition to my collection. Next paycheck, we meet again!",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994450",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Goodbye, clunky laptop! This lightweight tablet would be my new travel buddy for working remotely, catching up on emails, and staying connected. ✈️",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994456",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Gaming beast unlocked! This laptop with its latest features like dedicated graphics card, fast refresh rate, powerful cooling system] would be the ultimate gaming machine. Time to conquer those virtual worlds! ⚔️",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994452",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Have to buy this for my friend's birthday",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944b0",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Mood magic! These smart lights would transform my living room into the perfect movie night haven with customisable colours and dimming. Goodbye, harsh overhead lights! ✨",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994474",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A perfect christmas gift for my wife",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994481",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A perfect gift for my relative's kid",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599448a",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A nice decent watch like this would be a perfect match with my outfit this saturday night",
  },
  {
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a2",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Have to buy this for upcoming beach party",
  },
];

exports.seedWishlist = async () => {
  try {
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

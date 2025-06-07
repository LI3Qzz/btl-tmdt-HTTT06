const {seedBrand}=require("./Brand")
const {seedCategory}=require("./Category")
const {seedProduct}=require("./Product")
const {seedUser}=require("./User")
const {seedAddress}=require("./Address")
const {seedWishlist}=require("./Wishlist")
const {seedCart}=require("./Cart")
const {seedReview}=require("./Review")
const {seedOrder}=require("./Order")
const {connectToDB}=require("../database/db")
const mongoose = require('mongoose')

const seedData=async()=>{
    try {
        await connectToDB()
        console.log('Seed [started] please wait..');

        // Drop all collections
        const collections = await mongoose.connection.db.collections()
        for (let collection of collections) {
            await collection.drop()
        }
        console.log('Dropped all collections')

        // Seed data
        await seedBrand()
        await seedCategory()
        await seedProduct()
        await seedUser()
        await seedAddress()
        await seedWishlist()
        await seedCart()
        await seedReview()
        await seedOrder()

        console.log('Seed completed..');
    } catch (error) {
        console.log(error);
    }
}

seedData()
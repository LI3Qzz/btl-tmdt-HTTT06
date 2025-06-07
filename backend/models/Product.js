const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    anime:{
        type:String,
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    
    price:{
        type:Number,
        required:true
    },
    
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)
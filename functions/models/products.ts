import { Schema } from 'mongoose';
import { DbConfig } from '../configs/db_config';

const mongoose = DbConfig.getMongoose();

const ProductsSchema = new Schema({
   name:String,
   price : Number,
   store_id : String,
   quantity : Number,
   units : String,
   image : String,
   category : String   
});

export const Products = mongoose.model('Product', ProductsSchema, 'products');


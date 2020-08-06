import { Schema } from 'mongoose';
import { DbConfig } from '../configs/db_config';

const mongoose = DbConfig.getMongoose();

const StoresSchema = new Schema({
   _id : String,
   owner_id : String,
   store_name : String,
   store_address : String
});

export const Stores = mongoose.model('Stores', StoresSchema, 'stores');

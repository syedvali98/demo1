import { Schema } from 'mongoose';
import { DbConfig } from '../configs/db_config';

const mongoose = DbConfig.getMongoose();

const OrdersSchema = new Schema({
    user_id: String,
    store_id: String,
    status: String,
    product: [
        {
            _id: false,
            product_id: String,
            product_name: String,
            product_quantity: String
        }
    ]
});

export const Orders = mongoose.model('Order', OrdersSchema, 'orders');

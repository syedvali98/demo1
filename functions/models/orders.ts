import { Schema } from 'mongoose';
import { DbConfig } from '../configs/db_config';

const mongoose = DbConfig.getMongoose();

const OrdersSchema = new Schema({
    user_id: String,
    store_id: String,
    status:[
        {
            _id: false,
            ordered: Date,
            dispatched: Date,
            delivered: Date
        }
    ],
    order_id: String,
    order_price: String,
    order_date: Date,
    arrival_date: Date,
    product: [
        {
            _id: false,
            product_id: String,
            product_name: String,
            product_image: String,
            product_quantity: String
        }
    ]
});

export const Orders = mongoose.model('Order', OrdersSchema, 'orders');

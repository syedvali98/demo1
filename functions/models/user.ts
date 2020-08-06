import { Schema } from 'mongoose';
import { DbConfig } from '../configs/db_config';

const mongoose = DbConfig.getMongoose();

const UserSchema = new Schema({
    profile: {
        first_name: String,
        last_name: String,
        email_id: String,
        mobile: String,        
        address: String,
    },
    orders: [{
        ordered_date: Date
    }],
});

export const User = mongoose.model('User', UserSchema, 'users');

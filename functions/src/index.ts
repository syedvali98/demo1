import * as functions from 'firebase-functions';

//mongo connection start
import { DbConfig } from '../configs/db_config';
import { User } from '../models/user';
import { Products } from '../models/products';
import { Orders } from '../models/orders';
import { Stores } from '../models/stores';
const dbUri = DbConfig.getUri();
const connectionOptions = DbConfig.getConnectOptions();
const mongoose = DbConfig.getMongoose();
const dbConnection = mongoose.connect(dbUri, connectionOptions);
dbConnection.then(() => {
    console.log(`db connected`);
})
    .catch((err: any) => {
        console.log(err);
    });
//mongodb connect end


//users functions start
export const createUser = functions.https.onRequest(async (request, response) => {
    let data = request.body;
    const userResponse = await User.create(data);
    response.send(userResponse);
});


//users functions end


//products functions start
export const createProduct = functions.https.onRequest(async (request, response) => {
    let data = request.body;
    const productResponse = await Products.create(data);
    response.send(productResponse);
});

export const getProducts = functions.https.onRequest(async (request, response) => {
    const productResponse = await Products.find({});
    response.send(productResponse);
});

export const getProductsByCategory = functions.https.onRequest(async (request,response) =>{
    let category = request.body.category
    const productResponse = await Products.find({'category': category})
    response.send(productResponse);
});
//products functions end


//stores functions start
export const createStore = functions.https.onRequest(async (request, response) => {
    let data = request.body;
    const productResponse = await Stores.create(data);
    response.send(productResponse);
});

export const getAllStores = functions.https.onRequest(async (request, response) => {
    const productResponse = await Stores.find({});
    response.send(productResponse);
});

//stores functions end


//miscellaneous functions start
export const getCategories = functions.https.onRequest(async (request, response) => {
    //const categoryResponse = await Products.aggregate( [ {"$group": { "_id": { category: "$category", category_image: "$category_image" } } } ]);
    const categoryResponse = await Products.find({}).select({"category": 1,"category_image" :1,_id :0 });
    let result = categoryResponse.reduce((unique, o:any) => {
        if(!unique.some(obj => obj.category === o.category)) {
          unique.push(o);
        }
        return unique;
    },[]);
    response.send(result);

});


//miscellaneous functions end


//orders functions start
export const createOrder = functions.https.onRequest(async (request, response) => {
    let data = request.body;
    data.order_date = Date.now();
    data.status.ordered = Date.now();
    await Orders.create(data).then(
        (a)=>{
            
            response.send(a);
        }
    ).catch(
        (err)=>{
            response.send(err)
        }
    )
});

export const updateOrder = functions.https.onRequest(async (request, response) => {
    let status = request.body.status;
    await Orders.findByIdAndUpdate(request.body.order_id, {'status':status})
    .then(
        (a)=>{
            response.send('order status updated');
            return;
        }
    ).catch(
        (err)=>{
            response.send(err)
        }
    )
});

export const getOrdersByUser = functions.https.onRequest(async (request, response) => {
    let user_id = request.body.user_id
    const OrderResponse = await Orders.find({'user_id':user_id});
    response.send(OrderResponse);
});

export const getOrdersByOrderId = functions.https.onRequest(async (request, response) => {
    let order_id = request.body.order_id
    const OrderResponse = await Orders.find({'order_id':order_id});
    response.send(OrderResponse);
});


export const getOrdersByStore = functions.https.onRequest(async (request, response) => {
    let store_id = request.body.store_id
    const OrderResponse = await Orders.find({'store_id': store_id});
    response.send(OrderResponse);
});

//orders functions end
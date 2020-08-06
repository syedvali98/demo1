import { Mongoose } from 'mongoose';

const DB_CRED = {
  dbPassword: "qwerty1234", // encoded string for "Prashanth@1234"
  dbName: "flutter_demo_db"
};

const CONNECTION_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const mongoose = new Mongoose();


export class DbConfig {


  static getUri(): string {
    return `mongodb+srv://db_user:${DB_CRED.dbPassword}@cluster0.us9nm.mongodb.net/${DB_CRED.dbName}?retryWrites=true&w=majority`;
  }

  static getConnectOptions(): { [key: string]: any } {
    return CONNECTION_CONFIG;
  }

  static getMongoose(): Mongoose {
    return mongoose;
  }
}

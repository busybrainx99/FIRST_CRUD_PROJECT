
import mongoose from "mongoose";
import dotenv from "dotenv";
// import path from "path";


dotenv.config();

console.log(process.env.DEV_MONGO_URI);
console.log(process.env.NODE_ENV);
const connectDB = async () => {
    try {
        let connect;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
         };
         console.log("calling here");

        switch(process.env.NODE_ENV) {
            case`development`:
                connect = await mongoose.connect(process.env.DEV_MONGO_URI);
                console.log("dev");
                break;
            case `test`:
                connect = await mongoose.connect(process.env.TEST_MONGO_URI);
                console.log("test");
                break;
            default:
               console.log("Connection did not succeed");
            }; 
            console.log("Got here");
        console.log(`connected to MongoDB in ${process.env.NODE_ENV} mode on ${connect.connection.host}`);
    } catch (error) {
      return error;
    };
};

const dropDB = async () => {
    try {
        for(let collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].drop(() => {})
        }
    } catch (error) {
        throw error
    }
}

export {connectDB, dropDB};






// export const getEnvFile = (environment) => {
//   switch (environment) {
//     case "prod":
//       return "prod.env"
//     case "beta":
//       return "beta.env"
//     case "dev":
//       return ".env"
//     default:
//       return "no env found"
//   }
// }

// dotenv.config({
//   path: path.resolve(__dirname, "..", "..", getEnvFile(process.env.NODE_ENV)),
// })

// mongoose.set('strictQuery', false)
// const connect = mongoose.connect

// const connectDB = async () => {
//   try {
//     await connect(process.env.DEV_MONGO_URI)
//     console.log(`MongoDB Connected in ${process.env.NODE_ENV} env...`)
//   } catch (err) {
//     console.error(err)
//     // Exit process with failure
//     process.exit(1)
//   }
// }






// dotenv.config();

// console.log(process.env.DEV_MONGO_URI);
// console.log(process.env.NODE_ENV);
// const connectDB = async () => {
//     try {
//         let connect;
//         const options = {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//             useUnifiedTopology: true,
//          };
//          console.log("calling here");

//         switch(process.env.NODE_ENV) {
//             case "development":
//                 connect = await mongoose.connect(process.env.DEV_MONGO_URI, options);
//                 break;
//             case "test":
//                 connect = await mongoose.connect(process.env.TEST_MONGO_URI, options);
//                 break;
//             default:
//                console.log("Connection did not succeed");
//             }; 
//             console.log("Got here");
//         console.log(`connected to MongoDB in ${process.env.NODE_ENV} mode on ${connect.connection.host}`);
//     } catch (error) {
//       return error;
//     };
// };


// const dropDB = async () => {
//     try {
//         for(let collection in mongoose.connection.collections) {
//             mongoose.connection.collections[collection].drop(() => {})
//         }
//     } catch (error) {
//         throw error
//     }
// }

// export {connectDB, dropDB};





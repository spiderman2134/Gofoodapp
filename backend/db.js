// const mongoose = require("mongoose");

// const mongoURI = 'mongodb+srv://gofood:yadav@cluster0.f8e5yqb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

// const mongoDB = async () => {
//   await mongoose.connect(mongoURI);
//   console.log("connected");
//   const fetched_data=await mongoose.connection.db.collection("sample");
//   fetched_data.find({}).toArray(function(err,data){
//     if(err)console.log(err);
//     else console.log(data);
//   }); 
// };
//code working below
// const mongoose = require("mongoose");
// const mongoURI = "mongodb://gofood:yadav@ac-temh5ql-shard-00-00.f8e5yqb.mongodb.net:27017,ac-temh5ql-shard-00-01.f8e5yqb.mongodb.net:27017,ac-temh5ql-shard-00-02.f8e5yqb.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-c43gbh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
// const mongoDB = async () => {
//   await mongoose.connect(mongoURI);
//   console.log('Connected');
//   const foodItems = mongoose.connection.collection('sample');
//   try {
//   const data = await foodItems.find({}).toArray();
//   console.log(data);
//   } catch (error) {
//   console.error (error);
//   }
//   };
  // const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://gofood:yadav@cluster0.f8e5yqb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
  
//       useUnifiedTopology: true
//     });
//     console.log("Connected to MongoDB Atlas");

//     const fooditems = await mongoose.connection.collection("food_items");
//     fooditems.find({}).toArray(async function(err,data){
//       const sample=await mongoose.connection.db.collection("sample");
//       sample.find({}).toArray(function (err,catData){
//         if(err)console.log(err);
//         else{
//           global.fooditems=data;
//           global.sample=catData;
//         }
//       })
//     });
   // console.log("Fetched data:", data);
    // global.food_items=data;
    //console.log(global.food_items);
//   } catch (error) {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   }
// };

// module.exports = connectToMongoDB;

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Connected!');
//     let fetched_data = mongoose.connection.db.collection("sample");
//     let data=await fetched_data.find({}).toArray() 
//     console.log(data);
//   } catch (error) {
//     console.log('err: ', error);
//     process.exit();
//   }
// };
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://gofood:yadav@cluster0.f8e5yqb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Atlas");

    const fooditems = mongoose.connection.collection("food_items");
    const data = await fooditems.find({}).toArray();

    const sample = mongoose.connection.collection("sample");
    const catData = await sample.find({}).toArray();

    global.fooditems = data;
    global.sample = catData;

    //console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};


module.exports = mongoDB;
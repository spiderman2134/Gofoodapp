// const express=require('express');
// const app=express();
// const port=5000;
// const mongoDB=require("./db");
// mongoDB();
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
// next();    
// });
// app.get('/',(req,res)=>{
//     res.send('hello world')
//     });
// app.use(express.json);
// app.use('/api',require("./Routes/CreateUser"));
// // app.get('/',(req,res)=>{
// //     res.send('hello world')
// //     });
// app.listen(port,()=>{
//     console.log(`example app listenning  on ${port}`)
// }
// );
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// Set up CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();    
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route for '/api/CreateUser'
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
// Route for root path '/'
app.get('/', (req, res) => {
    res.send('hello world');
});



app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
}));
// Start the server
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});

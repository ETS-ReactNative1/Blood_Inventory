const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

const AuthRoutes = require("./routes/auth.js");
const StockRoutes = require("./routes/Stock.js");

app.get('/', (req,res) => {
    res.send('Welcome To the Home Page');
})


app.use('/api/',StockRoutes);
app.use('/api/users',AuthRoutes);


mongoose.connect('mongodb+srv://nabil_ben:BQ39CfGYv2uSjRvV@cluster0.tf7gg.mongodb.net/test_database?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(3000, () => console.log('Server is running'));
})
.catch(err => console.log(err))


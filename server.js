const express  = require('express');
const cors  = require('cors');
const morgan  = require('morgan');
const dotenv  = require('dotenv');
const colors  = require('colors');
const { json } = require('body-parser');
const path = require('path');
const connectDb = require('./config/connectDB');
const { patch } = require('./routes/userRoute');

dotenv.config();

connectDb();

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'))

// trans routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))



// use static files
app.use(express.static(path.json(__dirname, './client/build')));

app.get('*', function(req, res) {
    res.sendFile(path.json()(__dirname, '/client/build/index.html'));
});



const PORT = 8080 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
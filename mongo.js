const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    await mongoose.connect(process.env.ATLAS_URL).then( x => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('error conn', err);
    })
    return mongoose;
};
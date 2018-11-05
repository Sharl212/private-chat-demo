const mongoose = require('mongoose');
 
mongoose.connect('mongodb://admin:admin123@ds147213.mlab.com:47213/trading-chat-app', {useNewUrlParser: true}, ()=>{
    console.log('Connected to MongoDB...')
});
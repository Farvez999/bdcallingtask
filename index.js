const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/user.routes');

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://usc-crm.netlify.app']
}
));

// db connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database connection is successful`);
})

// routes
app.use('/api/v1/user', require('./routes/user.routes'))
app.use('/api/v1/product', require('./routes/product.routes'))
app.use('/api/v1/review', require('./routes/review.routes'))
app.use('/api/v1/payment', require('./routes/payment.routes'))


app.get("/", (req, res) => {
    res.send("Server running...")
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
});
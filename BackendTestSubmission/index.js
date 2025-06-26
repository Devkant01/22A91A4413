const express = require('express');
const cors = require('cors');
const app = express();
const shortUrlRoutes = require('./routes/shorturl');

app.use(cors());
app.use(express.json());
app.use('/shorturls', shortUrlRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

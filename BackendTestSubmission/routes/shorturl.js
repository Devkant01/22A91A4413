const express = require('express');
const router = express.Router();
const {
    createShortUrl,
    getShortUrlStats
} = require('../controllers/shorturl');

// Create short URL
router.post('/', createShortUrl);

router.get('/:shortcode', getShortUrlStats);

module.exports = router;

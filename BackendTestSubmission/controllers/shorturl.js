const { storeUrl } = require('../models/store');
const generateShortcode = require('../utils/generateShortcode');

exports.createShortUrl = (req, res) => {
    console.log(req.body);
    const { url, validity = 30, shortcode } = req.body;

    try {
        new URL(url); // Validate URL
    } catch {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const finalCode = shortcode || generateShortcode();

    if (storeUrl[finalCode]) {
        return res.status(409).json({ error: 'Shortcode already exists' });
    }

    const createdAt = new Date().toISOString();
    const expiry = new Date(Date.now() + validity * 60000).toISOString();

    storeUrl[finalCode] = {
        url,
        createdAt,
        expiry,
        clicks: []
    };

    return res.status(201).json({
        shortLink: `https://hostname:port/${finalCode}`,
        expiry
    });
};

exports.getShortUrlStats = (req, res) => {
    const shortcode = req.params.shortcode;
    const data = storeUrl[shortcode];

    if (!data) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }

    return res.status(200).json({
        url: data.url,
        createdAt: data.createdAt,
        expiry: data.expiry,
        totalClicks: data.clicks.length,
        clicks: data.clicks
    });
};

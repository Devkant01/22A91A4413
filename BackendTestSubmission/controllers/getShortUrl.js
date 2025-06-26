const { storeUrl } = require('../models/store');

exports.getShortUrlStats = (req, res) => {
    const shortcode = req.params.shortcode;
    const data = storeUrl[shortcode];

    if (!data) {
        return res.status(404).json({ error: 'Shortcode not found' });
    }

    const response = {
        url: data.url,
        createdAt: data.createdAt,
        expiry: data.expiry,
        totalClicks: data.clicks?.length || 0,
        clicks: data.clicks || []
    };

    return res.status(200).json(response);
};

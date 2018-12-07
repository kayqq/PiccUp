const handleApiCall = (req, res, fetch) => {
    const { searchTerm, location } = req.body;
    fetch(
        `https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}`,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer egEVCZvWgoCCbVQ_HBmZ2K8_jqIIcLcyOiCrXXWR-7ycZ7rUg09EDgDcITWy8gYosYh86VpmbfQGbg9pRhJkY_VGbmLLEVFqJjQ-7t8_QlG4FHfxftEJyCfrINuJW3Yx'
            }
        }
    )
        .then(response => response.json())
        .then(yelpSearchResults => res.json(yelpSearchResults))
        .catch(error => res.status(400).json('Unable to work with API'));
};

module.exports = {
    handleApiCall
};

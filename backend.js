const axios = require('axios');

exports.handler = async (event) => {
    try {
        const formData = new FormData();
        formData.append('image', event.body.image);
        
        // Usando Runway ML API (você precisará de uma API Key)
        const response = await axios.post('https://api.runwayml.com/video/generate', formData, {
            headers: {
                'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ videoUrl: response.data.url })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

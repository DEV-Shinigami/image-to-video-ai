async function processImage() {
    const file = document.getElementById('imageInput').files[0];
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await axios.post('/.netlify/functions/generate-video', {
            image: file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        resultDiv.innerHTML = `
            <video controls class="mt-3">
                <source src="${response.data.videoUrl}" type="video/mp4">
            </video>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<div class="alert alert-danger">Erro: ${error.message}</div>`;
    }
}
from flask import Flask, request, jsonify
import torch
from diffusers import StableVideoDiffusionPipeline

app = Flask(__name__)

# Carregar modelo (ajuste conforme necessário)
pipe = StableVideoDiffusionPipeline.from_pretrained(
    "stabilityai/stable-video-diffusion-img2vid", 
    torch_dtype=torch.float16, 
    variant="fp16"
)
pipe.enable_model_cpu_offload()

@app.route('/process', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    # Processar imagem com IA
    output = pipe(image, decode_chunk_size=8).frames[0]
    
    # Salvar vídeo temporário
    output_path = f"output_{uuid.uuid4()}.mp4"
    output.save(output_path)
    
    return jsonify({'video_path': output_path})

if __name__ == '__main__':
    app.run(port=5001)
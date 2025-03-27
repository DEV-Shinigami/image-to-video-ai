const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Rota para processamento de vídeo
app.post('/api/generate-video', upload.single('image'), async (req, res) => {
  try {
    // Simulação de processamento com IA
    const videoPath = await processWithAI(req.file.path);
    
    res.json({
      videoUrl: `http://localhost:5000/${videoPath}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no processamento' });
  }
});

// Servir arquivos estáticos
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Função simulada de processamento (substituir pela integração real com IA)
async function processWithAI(imagePath) {
  // Aqui você integrará o modelo de IA real
  const videoFileName = `output-${Date.now()}.mp4`;
  // Simulação de delay de processamento
  await new Promise(resolve => setTimeout(resolve, 5000));
  return `videos/${videoFileName}`;
}
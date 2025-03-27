import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/generate-video', formData);
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Transforme Imagens em Vídeos com IA</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Gerar Vídeo'}
        </button>
      </form>
      {videoUrl && (
        <div>
          <h2>Seu Vídeo:</h2>
          <video src={videoUrl} controls width="600" />
        </div>
      )}
    </div>
  );
}

export default App;
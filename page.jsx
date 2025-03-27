// pages/index.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleGenerateVideo = async () => {
    setProcessing(true);
    // Chamada para o backend para iniciar o processamento
    // Exemplo:
    // const response = await fetch('/api/generate-video', { method: 'POST', body: formData });
    // const data = await response.json();
    // setVideoUrl(data.videoUrl);
    setProcessing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transforme Imagens em Vídeos com IA</h1>
      
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="border-dashed border-2 p-4 mb-4">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste e solte suas imagens aqui, ou clique para selecionar</p>
            </div>
          </section>
        )}
      </Dropzone>
      
      {files.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl">Imagens selecionadas:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={handleGenerateVideo} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={processing}
      >
        {processing ? 'Processando...' : 'Gerar Vídeo'}
      </button>

      {videoUrl && (
        <div className="mt-4">
          <h2 className="text-xl">Pré-visualização do Vídeo:</h2>
          <video src={videoUrl} controls width="600" />
        </div>
      )}
    </div>
  );
}

// Importa o React (necessário para usar JSX)
import React from 'react';

// Importa o ReactDOM, responsável por renderizar o React no HTML
import ReactDOM from 'react-dom/client';

// Importa o arquivo de estilos globais (CSS)
import './index.css';

// Importa o componente principal da aplicação (App)
import App from './App';

// Renderiza o componente <App /> dentro da div com id="root" do HTML (index.html)
// O React.StrictMode é usado apenas em desenvolvimento para avisar sobre problemas e boas práticas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

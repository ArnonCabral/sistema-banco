// Importa o Tailwind CSS como um plugin para o PostCSS
import tailwindcss from 'tailwindcss'
// Importa o Autoprefixer, que adiciona prefixos automáticos de compatibilidade entre navegadores (ex: -webkit-, -moz-)
import autoprefixer from 'autoprefixer'
// Exporta a configuração do PostCSS, usada para processar os arquivos CSS da aplicação
export default {
  // Define os plugins que serão usados pelo PostCSS durante a build
  plugins: [
    tailwindcss, // Permite usar a estrutura do Tailwind CSS no projeto
    autoprefixer // Garante que o CSS final seja compatível com vários navegadores
  ]
}

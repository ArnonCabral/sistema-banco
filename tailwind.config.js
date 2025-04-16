/** 
 * @type {import('tailwindcss').Config} 
 * Esta linha fornece autocomplete e tipagem ao usar o Tailwind em TypeScript.
 */
export default {
  // Define os arquivos onde o Tailwind deve procurar por classes CSS
  content: [
    "./index.html", // Arquivo HTML raiz do projeto
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos JS, TS, JSX e TSX dentro da pasta src
  ],

  // Personalizações do tema padrão do Tailwind
  theme: {
    extend: {
      // Aqui você pode adicionar ou sobrescrever configurações do Tailwind como:
      // cores, fontes, espaçamentos, sombras, tamanhos, etc.
      // Exemplo:
      // colors: {
      //   primary: '#1D4ED8',
      // }
    },
  },

  // Lista de plugins adicionais do Tailwind a serem utilizados (ex: forms, typography)
  plugins: [
    // Exemplo:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}

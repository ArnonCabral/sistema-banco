// Importa a configuração padrão de regras do ESLint para JavaScript moderno
import js from '@eslint/js'
// Importa definições de variáveis globais reconhecidas por ambientes (navegador, Node, etc.)
import globals from 'globals'
// Importa o plugin para validação de regras específicas do React Hooks (como ordem e dependências)
import reactHooks from 'eslint-plugin-react-hooks'
// Importa o plugin usado para garantir que apenas componentes React sejam exportados durante o hot reload
import reactRefresh from 'eslint-plugin-react-refresh'
// Importa o conjunto de ferramentas para ESLint lidar com código TypeScript
import tseslint from 'typescript-eslint'

// Exporta a configuração final do ESLint utilizando a função `tseslint.config`
// Essa função permite aplicar várias configurações agrupadas de forma moderna
export default tseslint.config(
  // Segunda configuração: define regras, escopo e comportamento da análise
  {
    // Aplica os conjuntos de regras recomendadas do JavaScript padrão e do TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Aponta os arquivos que devem ser analisados (arquivos `.ts` e `.tsx`)
    files: ['**/*.{ts,tsx}'],
    // Define opções de linguagem ECMAScript e variáveis globais esperadas
    languageOptions: {
      ecmaVersion: 2020,            // Suporte à sintaxe ES2020
      globals: globals.browser,     // Considera variáveis globais do navegador (window, document, etc.)
    },
    // Registra os plugins que adicionam regras extras ao ESLint
    plugins: {
      'react-hooks': reactHooks,          // Plugin com regras de boas práticas dos hooks do React
      'react-refresh': reactRefresh,      // Plugin que ajuda a controlar exportações com hot reload (Vite)
    },
    // Define regras adicionais e customizadas
    rules: {
      // Aplica todas as regras recomendadas pelo plugin react-hooks
      ...reactHooks.configs.recommended.rules,

      // Adiciona uma regra do plugin react-refresh que exibe um aviso
      // se for exportado algo que não seja um componente React
      'react-refresh/only-export-components': [
        'warn',                        // Gera um aviso (não erro)
        { allowConstantExport: true },// Permite exportação de constantes
      ],
    },
  },
)


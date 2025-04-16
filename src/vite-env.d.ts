/// <reference types="vite/client" />
// Esta linha é uma diretiva especial do TypeScript que importa automaticamente
// as definições de tipos da Vite para o contexto do projeto.
// 
// Isso permite que o TypeScript reconheça e compreenda recursos específicos
// que a Vite adiciona ao ambiente de desenvolvimento, como:
// - Tipos para variáveis de ambiente (`import.meta.env`)
// - Tipagem para `import.meta` (utilizada pela Vite internamente)
//
// Sem essa linha, o TypeScript pode não reconhecer corretamente essas funcionalidades,
// gerando erros de tipo em arquivos `.ts` ou `.tsx` ao usar recursos da Vite.
//
// Essa diretiva é geralmente colocada no início do projeto dentro de um arquivo
// chamado `vite-env.d.ts` ou diretamente em arquivos onde o Vite precisa ser tipado.

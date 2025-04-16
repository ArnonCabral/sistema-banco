# 💳 Sistema Bancário - React + TypeScript + Tailwind CSS

Este projeto é uma aplicação web desenvolvida como desafio prático de front-end. Ele exibe dados de clientes, contas bancárias e agências, com foco em acessibilidade, performance, responsividade e boas práticas de desenvolvimento moderno usando **React + Vite + TypeScript**.

---

## 📌 Funcionalidades Principais

- ✅ Listagem paginada de clientes com filtro por nome e CPF/CNPJ
- ✅ Exibição detalhada de cliente com:
  - Informações pessoais completas (nome, RG, CPF, nome social, nascimento, endereço, estado civil etc.)
  - Contas bancárias com dados de saldo, limite e crédito disponível
  - Agência vinculada
- ✅ Sistema de retorno à página anterior sem perder a navegação (mantém a página atual)
- ✅ Responsividade total em todas as telas
- ✅ Acessibilidade com suporte a leitores de tela
- ✅ Dados consumidos diretamente via API CSV do Google Sheets
- ✅ Performance otimizada com carregamento rápido

---

## 🧪 Testes de Qualidade com Lighthouse

O projeto foi testado com a ferramenta **Lighthouse** e obteve os seguintes resultados:
<<<<<<< HEAD
 
| Métrica             |Nota|
|---------------------|----|
| ⚡ Performance      |83|
| ♿ Acessibilidade   |100|
| ✅ Boas Práticas    |78|
| 🔍 SEO              |82|
=======

| Métrica           | Nota |
|--------------------------
| ⚡ Performance    | 83  |
| ♿ Acessibilidade | 100 |
| ✅ Boas Práticas  | 78  |
| 🔍 SEO            | 82  |
>>>>>>> c695213845a449e7618df987c6f1a79b75640820

📄 Detalhes disponíveis no arquivo [`Lighthouse.pdf`](./Ligthhouse.pdf)

---

## 🚀 Tecnologias Utilizadas

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PapaParse](https://www.papaparse.com/) para leitura de CSV
- [Google Sheets](https://docs.google.com/spreadsheets/) como fonte de dados simulada (API)

---

## 🧭 Estrutura de Pastas

```bash
📦 src
<<<<<<< HEAD
 ┣ 📂components          # Componentes reutilizáveis (Lista, Detalhes)
 ┣ 📂services            # Funções de leitura e parse de CSV
 ┣ 📂types               # Definições de tipos TypeScript
 ┣ 📄 App.tsx            # Arquivo principal
 ┣ 📄 main.tsx           # Ponto de entrada
 ┣ 📄 index.css          # Estilos globais
=======
 ┣ 📂components        # Componentes reutilizáveis (Lista, Detalhes)
 ┣ 📂services          # Funções de leitura e parse de CSV
 ┣ 📂types             # Definições de tipos TypeScript
 ┣ 📄 App.tsx             # Arquivo principal
 ┣ 📄 main.tsx            # Ponto de entrada
 ┣ 📄 index.css           # Estilos globais
>>>>>>> c695213845a449e7618df987c6f1a79b75640820


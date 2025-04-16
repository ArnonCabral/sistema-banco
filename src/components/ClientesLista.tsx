// Importa o React e o tipo Cliente definido no projeto
import React, { useState } from "react";
import { Cliente } from "../types";

// Define os dados (propriedades) que o componente ClientesLista vai receber de fora
interface Props {
  clientes: Cliente[]; // Lista de objetos do tipo Cliente que será exibida em tabela
  onSelecionarCliente: (cliente: Cliente) => void; // Função executada ao clicar em um cliente da tabela
  paginaAtual: number; // ➕ Número da página atual da tabela (para controlar a paginação)
  setPaginaAtual: (pagina: number) => void; // ➕ Função que atualiza a página atual (ao clicar em "Próxima" ou "Anterior")
}


// Componente principal que exibe a lista de clientes
const ClientesLista: React.FC<Props> = ({ clientes, onSelecionarCliente }) => {
  // Estado para armazenar o texto digitado no filtro
  const [filtro, setFiltro] = useState("");

  // Estado para controlar qual página da lista está sendo exibida
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Guarda a página anterior antes de aplicar o filtro, para retornar depois
  const [paginaAnterior, setPaginaAnterior] = useState(1);

  // Define o número de clientes mostrados por página
  const itensPorPagina = 10;

  // Função chamada quando o campo de filtro é alterado
  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoFiltro = e.target.value;

    // Se começou a digitar um novo filtro, salva a página atual e volta para a página 1
    if (novoFiltro && !filtro) setPaginaAnterior(paginaAtual);

    // Se apagou o filtro, volta para a página que estava antes
    if (!novoFiltro && filtro) setPaginaAtual(paginaAnterior);

    // Atualiza o texto do filtro
    setFiltro(novoFiltro);
  };

  // Converte o filtro para minúsculas para facilitar a busca
  const termo = filtro.toLowerCase();

  // Filtra os clientes com base no nome ou CPF/CNPJ
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpfCnpj?.toLowerCase().includes(termo)
  );

  // Calcula o total de páginas com base nos clientes filtrados
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);

  // Calcula o índice inicial da lista para a página atual
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;

  // Cria um "recorte" da lista com base na página atual
  const clientesPaginados = clientesFiltrados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  // Função para trocar de página
  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) setPaginaAtual(pagina);
  };

  return (
    <div className="space-y-4">
      {/* Campo de filtro por nome ou CPF/CNPJ */}
      <input
        type="text"
        placeholder="Filtrar por nome ou CPF/CNPJ"
        className="w-full md:w-1/2 p-2 border rounded-md shadow-sm"
        value={filtro}
        onChange={handleFiltro}
      />

      {/* Tabela com os dados dos clientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-center">Nome</th>
              <th className="text-center">Nome Social</th>
              <th className="text-center">CPF/CNPJ</th>
              <th className="text-center">Email</th>
              <th className="text-center">Estado Civil</th>
              <th className="text-center">Endereço</th>
            </tr>
          </thead>

          <tbody>
            {/* Renderiza os clientes da página atual */}
            {clientesPaginados.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-t hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelecionarCliente(cliente)} // Ao clicar, mostra os detalhes do cliente
              >
                <td className="px-4 py-2">{cliente.nome}</td>
                <td className="px-4 py-2">{cliente.nomeSocial || "-"}</td>
                <td className="px-4 py-2">{cliente.cpfCnpj || "-"}</td>
                <td className="px-4 py-2">{cliente.email}</td>
                <td className="px-4 py-2">{cliente.estadoCivil}</td>
                <td className="px-4 py-2">{cliente.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de paginação (Anterior / Próxima) */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1} // Desativa se for a primeira página
        >
          Anterior
        </button>

        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas} // Desativa se for a última página
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

// Exporta o componente para ser usado no App
export default ClientesLista;

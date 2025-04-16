import React, { useState } from "react";
import { Cliente } from "../types";

interface Props {
  clientes: Cliente[];
  onSelecionarCliente: (cliente: Cliente) => void;
}

const ClientesLista: React.FC<Props> = ({ clientes, onSelecionarCliente }) => {
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAnterior, setPaginaAnterior] = useState(1);
  const itensPorPagina = 10;

  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoFiltro = e.target.value;
    if (novoFiltro && !filtro) setPaginaAnterior(paginaAtual);
    if (!novoFiltro && filtro) setPaginaAtual(paginaAnterior);
    setFiltro(novoFiltro);
  };

  const termo = filtro.toLowerCase();
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpfCnpj?.toLowerCase().includes(termo)
  );

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  const irParaPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) setPaginaAtual(pagina);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Filtrar por nome ou CPF/CNPJ"
        className="w-full md:w-1/2 p-2 border rounded-md shadow-sm"
        value={filtro}
        onChange={handleFiltro}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Nome Social</th>
              <th className="px-4 py-2 text-left">CPF/CNPJ</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Estado Civil</th>
              <th className="px-4 py-2 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {clientesPaginados.map((cliente) => (
              <tr
              key={cliente.id}
              className="border-t hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelecionarCliente(cliente)}
            >
                <td className="px-4 py-2">{cliente.nome}</td>
                <td className="px-4 py-2">{cliente.nomeSocial || "-"}</td>
                <td className="px-4 py-2">{cliente.cpfCnpj || "-"}</td>
                <td className="px-4 py-2">{cliente.email}</td>
                <td className="px-4 py-2">{cliente.estadoCivil}</td> {/* CORRETO AQUI */}
                <td className="px-4 py-2">{cliente.endereco}</td> {/* CORRETO AQUI */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ClientesLista;

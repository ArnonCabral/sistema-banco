import React from "react";
import { Cliente, Conta, Agencia } from "../types";

interface Props {
  cliente: Cliente;
  contas: Conta[];
  agencia: Agencia | undefined;
  onVoltar: () => void;
}

const ClienteDetalhes: React.FC<Props> = ({ cliente, contas, agencia, onVoltar }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">Detalhes do Cliente</h2>

      <button onClick={onVoltar} className="text-sm text-blue-500 underline">
        ← Voltar à lista
      </button>

      <div>
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>Nome Social:</strong> {cliente.nomeSocial || "-"}</p>
        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
        <p><strong>RG:</strong> {cliente.rg || "-"}</p>
        <p><strong>Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
        <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}</p>
        <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Contas Bancárias</h3>
        {contas.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>Tipo</th>
                <th>Saldo</th>
                <th>Limite de Crédito</th>
                <th>Crédito Disponível</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id} className="text-center border-t">
                  <td>{conta.tipo}</td>
                  <td>R$ {Number(conta.saldo).toLocaleString()}</td>
                  <td>R$ {Number(conta.limiteCredito).toLocaleString()}</td>
                  <td>R$ {Number(conta.creditoDisponivel).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Nenhuma conta bancária encontrada.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Agência</h3>
        {agencia ? (
          <>
            <p><strong>Nome:</strong> {agencia.nome}</p>
            <p><strong>Endereço:</strong> {agencia.endereco}</p>
            <p><strong>Código:</strong> {agencia.codigo}</p>
          </>
        ) : (
          <p className="text-gray-500">Agência não encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ClienteDetalhes;

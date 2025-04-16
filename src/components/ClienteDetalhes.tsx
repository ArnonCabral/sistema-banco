// Importa o React e os tipos utilizados no componente
import React from "react";
import { Cliente, Conta, Agencia } from "../types";

// Define as propriedades (props) que o componente espera receber
interface Props {
  onVoltar: () => void;              // Função chamada ao clicar no botão "Voltar"
  cliente: Cliente;                  // Objeto com os dados do cliente selecionado
  contas: Conta[];                   // Lista de contas do cliente
  agencia: Agencia | null;          // Dados da agência do cliente (pode ser nulo)
}

// Componente que mostra os detalhes do cliente selecionado
const ClienteDetalhes: React.FC<Props> = ({ cliente, contas, agencia, onVoltar }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto space-y-4">

      {/* Botão para voltar à lista de clientes */}
      <button onClick={onVoltar} className="underline text-blue-600 text-sm">
        ← Voltar
      </button>

      {/* Nome do cliente centralizado no topo */}
      <h2 className="text-2xl font-bold text-center break-words">{cliente.nome}</h2>

      {/* Bloco com os dados do cliente organizados verticalmente */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">

        {/* Mostra o ID do cliente */}
        <p><strong>ID:</strong> {cliente.id}</p>

        {/* Mostra o nome social se existir */}
        {cliente.nomeSocial && (
          <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
        )}

        {/* CPF ou CNPJ */}
        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>

        {/* RG, se existir */}
        {cliente.rg && (
          <p><strong>RG:</strong> {cliente.rg}</p>
        )}

        {/* Data de nascimento formatada para o padrão brasileiro */}
        <p><strong>Data de Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString("pt-BR")}</p>

        {/* Endereço completo */}
        <p><strong>Endereço:</strong> {cliente.endereco}</p>

        {/* E-mail */}
        <p><strong>Email:</strong> {cliente.email}</p>

        {/* Renda anual com formatação de moeda */}
        <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}</p>

        {/* Patrimônio com formatação */}
        <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}</p>

        {/* Estado civil (Solteiro, Casado, etc.) */}
        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
      </div>

      {/* Tabela de contas bancárias */}
      <div>
        <h3 className="text-lg font-semibold mt-4">Contas Bancárias</h3>

        {/* Se o cliente não tiver contas, mostra uma mensagem */}
        {contas.length === 0 ? (
          <p className="text-gray-500">Nenhuma conta bancária encontrada.</p>
        ) : (
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Tipo</th>
                <th className="p-2">Saldo</th>
                <th className="p-2">Limite</th>
                <th className="p-2">Crédito Disponível</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id} className="border-t text-center">
                  <td className="p-2">{conta.tipo}</td>
                  <td>R$ {(Number(conta.saldo) || 0).toLocaleString()}</td>
                  <td className="p-2">R$ {Number(conta.limiteCredito).toLocaleString()}</td>
                  <td className="p-2">R$ {Number(conta.creditoDisponivel).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Exibe os dados da agência vinculada ao cliente */}
      <div>
        <h3 className="text-lg font-semibold mt-4">Agência</h3>
        {agencia ? (
          <>
            <p><strong>Nome:</strong> {agencia.nome}</p>
            <p><strong>Endereço:</strong> {agencia.endereco}</p>
            <p><strong>Código:</strong> {agencia.codigo}</p>
          </>
        ) : (
          <p className="text-gray-500">Nenhuma agência encontrada.</p>
        )}
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outros lugares
export default ClienteDetalhes;

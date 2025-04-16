// Importação de hooks e componentes do projeto
import { useEffect, useState } from "react";
import ClientesLista from "./components/ClientesLista";
import ClienteDetalhes from "./components/ClienteDetalhes";
import { fetchCSV } from "./services/csvService";
import { parseCSV, sanitizeClientes } from "./services/parseService";
import { Cliente, Conta, Agencia } from "./types";
import type { ClienteRaw } from "./services/parseService";

// URLs dos dados públicos da planilha do Google Sheets (clientes, contas, agências)
const URL_CLIENTES =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const URL_CONTAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const URL_AGENCIAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

function App() {
  // Estados principais do app
  const [paginaAtual, setPaginaAtual] = useState(1); // Controle de paginação
  const [clientes, setClientes] = useState<Cliente[]>([]); // Lista de todos os clientes
  const [contas, setContas] = useState<Conta[]>([]); // Lista de contas
  const [agencias, setAgencias] = useState<Agencia[]>([]); // Lista de agências
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null); // Cliente atualmente selecionado

  // useEffect executa o carregamento inicial dos dados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Faz download dos dados brutos em CSV
        const csvClientes = await fetchCSV(URL_CLIENTES);
        const csvContas = await fetchCSV(URL_CONTAS);
        const csvAgencias = await fetchCSV(URL_AGENCIAS);

        // Converte CSV para objetos
        const dadosClientes = parseCSV<ClienteRaw>(csvClientes);
        const dadosContas = parseCSV<Conta>(csvContas);
        const dadosAgencias = parseCSV<Agencia>(csvAgencias);

        // Aplica sanitização e atualiza os estados
        setClientes(sanitizeClientes(dadosClientes as ClienteRaw[]));
        setContas(dadosContas);
        setAgencias(dadosAgencias);
      } catch (error) {
        // Em caso de erro, mostra no console
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados(); // Executa o carregamento
  }, []);

  // Filtra as contas do cliente selecionado com base no CPF/CNPJ
  const clienteContas = contas.filter(
    (conta) => conta.cpfCnpjCliente === clienteSelecionado?.cpfCnpj
  );

  // Localiza a agência correspondente ao cliente selecionado
  const clienteAgencia = agencias.find(
    (ag) => Number(ag.codigo) === Number(clienteSelecionado?.codigoAgencia)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho do sistema */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Sistema Bancário
        </h1>
        <p className="text-gray-700 text-center">
          Total de clientes: {clientes.length} | Contas: {contas.length} | Agências: {agencias.length}
        </p>
      </div>

      {/* Conteúdo principal: ou mostra detalhes ou lista de clientes */}
      <div className="max-w-6xl mx-auto">
        {clienteSelecionado ? (
          // Se houver cliente selecionado, exibe os detalhes dele
          <ClienteDetalhes
            cliente={clienteSelecionado}
            contas={clienteContas}
            agencia={clienteAgencia || null}
            onVoltar={() => setClienteSelecionado(null)} // Botão de voltar
          />
        ) : (
          // Se nenhum cliente estiver selecionado, exibe a lista paginada
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Lista de Clientes</h2>
            <ClientesLista 
              clientes={clientes} // Lista completa
              onSelecionarCliente={(cliente) => {
                setClienteSelecionado(cliente); // Salva o cliente clicado
              }}
              paginaAtual={paginaAtual} // ➕ Paginação vinda do estado
              setPaginaAtual={setPaginaAtual} // ➕ Função para mudar página
            />  
          </>
        )}
      </div>
    </div>
  );
}

export default App;

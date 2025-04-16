import { useEffect, useState } from "react";
import ClientesLista from "./components/ClientesLista";
import ClienteDetalhes from "./components/ClienteDetalhes";
import { fetchCSV } from "./services/csvService";
import { parseCSV, sanitizeClientes } from "./services/parseService";
import { Cliente, Conta, Agencia } from "./types";
import type { ClienteRaw } from "./services/parseService";

const URL_CLIENTES =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const URL_CONTAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const URL_AGENCIAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const csvClientes = await fetchCSV(URL_CLIENTES);
        const csvContas = await fetchCSV(URL_CONTAS);
        const csvAgencias = await fetchCSV(URL_AGENCIAS);

        const dadosClientes = parseCSV<ClienteRaw>(csvClientes);
        const dadosContas = parseCSV<Conta>(csvContas);
        const dadosAgencias = parseCSV<Agencia>(csvAgencias);

        setClientes(sanitizeClientes(dadosClientes as ClienteRaw[]));
        setContas(dadosContas);
        setAgencias(dadosAgencias);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  const clienteContas = contas.filter(
    (conta) => conta.cpfCnpjCliente === clienteSelecionado?.cpfCnpj
  );

  const clienteAgencia = agencias.find(
    (ag) => ag.codigo === clienteSelecionado?.codigoAgencia
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Sistema Bancário
        </h1>
        <p className="text-gray-700 text-center">
          Total de clientes: {clientes.length} | Contas: {contas.length} | Agências: {agencias.length}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {clienteSelecionado ? (
          <ClienteDetalhes
            cliente={clienteSelecionado}
            contas={clienteContas}
            agencia={clienteAgencia}
            onVoltar={() => setClienteSelecionado(null)}
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Lista de Clientes</h2>
            <ClientesLista clientes={clientes} onSelecionarCliente={setClienteSelecionado} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

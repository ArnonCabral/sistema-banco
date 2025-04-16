// Importa os tipos definidos no projeto: Cliente, ClienteRaw e Conta
// Também importa a biblioteca PapaParse que será usada para fazer o parsing do CSV
import { Cliente, ClienteRaw, Conta } from "../types";
import Papa from "papaparse";

// Função responsável por transformar (higienizar) os dados brutos dos clientes recebidos do CSV
export function sanitizeClientes(clientes: ClienteRaw[]): Cliente[] {
  return clientes.map((c: ClienteRaw): Cliente => ({
    ...c, // mantém os dados existentes, e sobrescreve os necessários abaixo

    nome: c.nome || "", // se o nome estiver vazio, define como string vazia
    nomeSocial: c.nomeSocial || "", // define nome social como vazio se não existir
    cpfCnpj: c.cpfCnpj?.replace(/\D/g, "") || "", // remove caracteres não numéricos do CPF/CNPJ
    email: c.email || "", // garante que email não venha nulo
    rg: c.rg || "", // se não houver RG, deixa vazio
    dataNascimento: c.dataNascimento || "", // usa string vazia se a data estiver ausente
    estadoCivil: (c.estadoCivil as Cliente["estadoCivil"]) || "Desconhecido", // força o valor para um dos permitidos na tipagem
    endereco: c.endereco || "", // se o endereço estiver vazio, atribui string vazia
    rendaAnual: Number(c.rendaAnual) || 0, // transforma em número e trata caso seja inválido
    patrimonio: Number(c.patrimonio) || 0, // idem ao acima
    codigoAgencia: Number(c.codigoAgencia) || 0, // converte código da agência para número
  }));
}

// Função que sanitiza os dados de contas, convertendo campos numéricos que vêm como string para number
export function sanitizeContas(contas: Conta[]): Conta[] {
  return contas.map((c) => ({
    ...c, // preserva os dados originais
    saldo: Number(c.saldo) || 0, // transforma saldo em número
    limiteCredito: Number(c.limiteCredito) || 0, // idem para limite de crédito
    creditoDisponivel: Number(c.creditoDisponivel) || 0, // idem para crédito disponível
  }));
}

// Função que converte uma string CSV para um array de objetos do tipo T usando PapaParse
export function parseCSV<T>(csvString: string): T[] {
  const result = Papa.parse<T>(csvString, {
    header: true,        // considera que a primeira linha do CSV são os nomes das colunas
    dynamicTyping: false, // mantém tudo como string, não converte automaticamente tipos
    skipEmptyLines: true, // ignora linhas em branco no CSV
  });

  // Caso ocorram erros no parse, eles serão exibidos no console
  if (result.errors.length > 0) {
    console.error("Erros no PapaParse:", result.errors);
  }

  return result.data;  // retorna o array de objetos formatados
}

// Exporta o tipo auxiliar ClienteRaw, usado antes da sanitização
export type { ClienteRaw };

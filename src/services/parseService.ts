import { Cliente, ClienteRaw } from "../types";
import Papa from "papaparse";

export function sanitizeClientes(clientes: ClienteRaw[]): Cliente[] {

  return clientes.map((c: ClienteRaw): Cliente => ({

    ...c,
    nome: c.nome || "",
    nomeSocial: c.nomeSocial || "",
    cpfCnpj: c.cpfCnpj?.replace(/\D/g, "") || "",
    email: c.email || "",
    rg: c.rg || "",
    dataNascimento: c.dataNascimento || "",
    estadoCivil: (c.estadoCivil as Cliente["estadoCivil"]) || "Desconhecido",
    endereco: c.endereco || "",
    rendaAnual: Number(c.rendaAnual) || 0,
    patrimonio: Number(c.patrimonio) || 0,
    codigoAgencia: Number(c.codigoAgencia) || 0,
  }));

}

export function parseCSV<T>(csvString: string): T[] {
  const result = Papa.parse<T>(csvString, {
    header: true,        
    dynamicTyping: false, 
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    console.error("Erros no PapaParse:", result.errors);
  }

  return result.data;  // array de T
}


export type { ClienteRaw };


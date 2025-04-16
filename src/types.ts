// Interface que define a estrutura final dos dados de um cliente após o parsing e tratamento
export interface Cliente {
  id: string; // Identificador único do cliente
  cpfCnpj: string; // Número do CPF ou CNPJ do cliente
  rg?: string; // Documento de identidade (opcional)
  dataNascimento: string; // Data de nascimento no formato string (ex: "1990-05-10")
  nome: string; // Nome completo do cliente
  nomeSocial?: string; // Nome social, se houver (opcional)
  email: string; // Endereço de e-mail do cliente
  endereco: string; // Endereço completo (rua, número, complemento)
  municipio: string; // Cidade onde o cliente mora
  estado: string; // Estado (UF) onde o cliente reside
  rendaAnual: number; // Renda anual declarada do cliente (tipo numérico)
  patrimonio: number; // Valor total do patrimônio declarado (tipo numérico)
  estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado"; // Estado civil do cliente (valores fixos permitidos)
  codigoAgencia: number; // Código da agência bancária à qual o cliente está vinculado (número)
}


// Interface que define a estrutura de uma conta bancária do cliente
export interface Conta {
  id: string; // Identificador único da conta bancária
  cpfCnpjCliente: string; // CPF ou CNPJ do cliente dono da conta
  tipo: "corrente" | "poupanca"; // Tipo da conta: "corrente" ou "poupança"
  saldo: number; // Valor atual disponível na conta
  limiteCredito: number; // Limite de crédito total da conta
  creditoDisponivel: number; // Valor de crédito ainda não utilizado
}


// Interface que define a estrutura da agência bancária
export interface Agencia {
  numero: number; // Número de ordem da agência (pode ser usado como identificador visual)
  id: string; // ID único da agência (pode ser UUID ou string gerada)
  codigo: number; // Código numérico da agência, utilizado para vincular ao cliente
  nome: string; // Nome oficial da agência (ex: "Agência Central")
  endereco: string; // Endereço físico da agência
}

//  Tipo auxiliar que representa os dados crus (brutos) vindos diretamente do CSV de clientes.
//  Ele converte os campos que precisam ser tratados para string antes do tratamento.

export type ClienteRaw = Omit<
  Cliente, // Reaproveita a interface Cliente
  "dataNascimento" | "estadoCivil" | "rendaAnual" | "patrimonio" | "codigoAgencia" // Remove esses campos porque virão como string no CSV
> & {
  dataNascimento: string; // Data de nascimento ainda como texto
  estadoCivil: string; // Estado civil ainda em texto (será convertido para tipo fixo depois)
  rendaAnual: string; // Renda anual como string (será convertida para número)
  patrimonio: string; // Patrimônio como string (será convertido para número)
  codigoAgencia: string; // Código da agência como texto (será convertido para número)
};



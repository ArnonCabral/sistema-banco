// Função responsável por buscar um arquivo CSV de uma URL e retornar seu conteúdo como texto
export async function fetchCSV(url: string): Promise<string> {
  // Faz a requisição HTTP (GET) para a URL informada
  const response = await fetch(url);

  // Extrai o conteúdo da resposta no formato de texto
  const text = await response.text();

  // Retorna o conteúdo do arquivo CSV como string (texto puro)
  return text;
}

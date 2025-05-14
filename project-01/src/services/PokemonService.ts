import { PokemonType } from "../types/PokemonTypes";

const BASE_URL = "http://localhost:3000";

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPokemonList(): Promise<PokemonType[]> {
  const response = await fetch(`${BASE_URL}/pokemon`);
  return handleResponse(response);
}

export async function fetchPokemonDetail(id: number): Promise<PokemonType> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  return handleResponse(response);
}

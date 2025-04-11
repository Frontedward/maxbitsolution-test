import axios, { AxiosError } from 'axios';
import { CocktailCode, CocktailsResponse } from '../types/cocktail';

const BASE_URL = '/api';

export const getCocktailsByCode = async (code: CocktailCode): Promise<CocktailsResponse> => {
  try {
    const response = await axios.get<CocktailsResponse>(`${BASE_URL}/search.php?s=${code}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message || 'Failed to fetch cocktails');
  }
}; 
import { Cocktail, CocktailApiResponse } from "@/types";
import api from "./axios";


export const getCocktailByName = async (name: string): Promise<Cocktail[]> => {
    const response = await api.get<CocktailApiResponse>(`search.php?s=${name}`);
    return response.data.drinks ?? [] ;
}


export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
    const response = await api.get<CocktailApiResponse>(`lookup.php?i=${id}`);
    return response.data.drinks ? response.data.drinks[0] : null;
}


export const getRandom= async (): Promise<Cocktail|null> =>{
    const response = await api.get<CocktailApiResponse>("/random.php");
    return response.data.drinks ? response.data.drinks[0] : null;
}
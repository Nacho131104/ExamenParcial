"use client";

import { Cocktail } from "@/types";

type params = {
    cocktail: Cocktail;

};

const CocktailCard = ({ cocktail }: params) => {
    const ingredientes: string[] = [];

    //metemos en el array de ingredientes los que haya en la api
    for (let i = 1; i <= 15; i++) {
        const ingrediente = cocktail[`strIngredient${i}` as keyof Cocktail] as string | null;

        if (ingrediente?.trim()) {
            ingredientes.push(ingrediente.trim());
        }
    }

    return (
        <div className="cocktail_card">

            <h2>{cocktail.strDrink}</h2>

            {cocktail.strDrinkThumb && (
                <img
                    src={cocktail.strDrinkThumb}
                    alt={`Imagen de ${cocktail.strDrink}`}
                />
            )}
                <div className="cocktail_info">
                    <p><strong>Categoria:</strong> {cocktail.strCategory}</p>
                    <p><strong>Tipo:</strong> {cocktail.strAlcoholic}</p>
                    <p><strong>Glass:</strong> {cocktail.strGlass}</p>
                    <p><strong>Instrucciones:</strong> {cocktail.strInstructions}</p>
                    <p><strong>Ingredientes:</strong></p>
                    <ul>
                        {ingredientes.map((ingrediente, index) => (
                            <li key={index}>{ingrediente}</li>
                        ))}
                    </ul>
                </div>
        </div>
    );
};

export default CocktailCard;
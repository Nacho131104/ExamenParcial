'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCocktailByName } from '@/lib/api/cocktails';
import { Cocktail } from '@/types';
import "../page.css"


const CocktailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name')?.trim() ?? '';

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Cocktail[]>([]);

    useEffect(() => {
        const finalName = name.trim();

        if (!finalName) {
            setResults([]);
            return;
        }

        setLoading(true);

        getCocktailByName(finalName).then((data) => setResults(data))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, [name]);

    return (
        <div className="cocktail-container">
            <div className="cocktail-card">
                <h1 className="title">Detalles</h1>
                {loading && <p>Buscando...</p>}
                {!loading && !name && (
                    <p>Buscar cocktail</p>
                )}
                {!loading && name && results.length === 0 && (
                    <p>No hay cocktails a nombre de: "{name}".</p>
                )}

                <div className="cocktail-list">
                    {results.map((cocktail) => (
                        <div key={cocktail.idDrink} className="cocktail-item">
                            <h2 className="cocktail-name">{cocktail.strDrink}</h2>

                            {cocktail.strDrinkThumb && (
                                <img
                                    src={cocktail.strDrinkThumb}
                                    alt={`Imagen: ${cocktail.strDrink}`}
                                    className="cocktail-image"
                                />
                            )}

                            <button
                                className="button"
                                onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}
                            >
                                Ver detalle
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CocktailPage;
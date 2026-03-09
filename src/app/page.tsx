'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import { getRandomCocktail } from '@/lib/api/cocktail';
import "./page.css"


const Home=()=>{
  const router=useRouter();  

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    const cleanName = search.trim();

    if (!cleanName) return;

    router.push(`/cocktail?name=${encodeURIComponent(cleanName)}`);
  };

  /*
  const handleRandomCocktail = async () => {
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const randomCocktail = await getRandomCocktail();

      if (!randomCocktail) {
        setError('No se pudo obtener un cocktail aleatorio.');
        return;
      }

      router.push(`/cocktail/${randomCocktail.idDrink}`);
    } catch {
      setError('Ocurrio un error al buscar un cocktail aleatorio.');
    } finally {
      setLoading(false);
    }
  };
  */
  return (
    <div className="page">
      <div className="card">
     
        <h1 className="title">Cocktails</h1>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="input"
          />
          
          <button className="button" onClick={handleSearch}>Buscar</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Home
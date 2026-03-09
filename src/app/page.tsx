'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getRandom } from '@/lib/api/cocktails';
import "./page.css"


const Home=()=>{
  const router=useRouter();  

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    const nameFinal = name.trim();

    if (!nameFinal) return;

    router.push(`/cocktail?name=${encodeURIComponent(nameFinal)}`);
  };

  const handleRandom = async() =>{
    try {

      const randomCocktail = await getRandom()
      if(!randomCocktail) setError("No se pudo generar un cocktail aleatorio")

      router.push(`/cocktail/${randomCocktail?.idDrink}`)
    }catch(e){
      setError(String(e))
    }
  }

  return (
    <div className="page">
      <div className="home-card">
     
        <h1 className="page-title">Cocktails</h1>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="input"
          />
          
          <button className="button" onClick={handleSearch}>Buscar</button>
        </div>

        <button className="button-aleatorio" onClick={handleRandom}>{loading ? "loading": "Dime algo bonito"}</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Home
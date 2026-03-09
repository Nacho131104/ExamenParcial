'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCocktailById } from '@/lib/api/cocktails';
import CocktailCard from '@/components/cocktail';
import { Cocktail } from '@/types';

const CocktailDetail = () => {
	const { id } = useParams();
    
	const [loading, setLoading] = useState(false);
	const [cocktail, setCocktail] = useState<Cocktail | null>(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);

		getCocktailById(id as string)
			.then((data) => setCocktail(data))
			.catch(() => setCocktail(null))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<div className="cocktail-container">
			<div className="cocktail-card">
				<h1 className= "title">Detalle</h1>
				
				{loading && <p>Buscando</p>}

				{cocktail && <CocktailCard cocktail={cocktail} />}
			</div>
		</div>
	);
};

export default CocktailDetail;
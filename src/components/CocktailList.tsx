import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { CocktailCode } from '../types/cocktail';
import { RootState } from '../store/store';
import { fetchCocktails } from '../store/cocktailsSlice';
import '../styles/CocktailList.scss';

const CocktailList: React.FC = () => {
  const { code = 'margarita' } = useParams<{ code?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cocktails);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (code && Object.prototype.hasOwnProperty.call(items, code)) {
      dispatch(fetchCocktails(code as CocktailCode));
      setSelectedIndex(0);
    }
  }, [code, dispatch]);

  if (!Object.prototype.hasOwnProperty.call(items, code)) {
    return <Navigate to="/404" />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const cocktails = items[code as CocktailCode];

  if (!cocktails || cocktails.length === 0) {
    return <div className="error">No cocktails found</div>;
  }

  const currentCocktail = cocktails[selectedIndex];

  const ingredients = Array.from({ length: 15 }, (_, i) => {
    const ingredient = currentCocktail[`strIngredient${i + 1}` as keyof typeof currentCocktail];
    const measure = currentCocktail[`strMeasure${i + 1}` as keyof typeof currentCocktail];
    if (!ingredient) return null;
    return { measure, ingredient };
  }).filter(Boolean);

  return (
    <div className="cocktail-layout">
      <div className="cocktail-details">
        <div className="cocktail-header">
          <h1>{currentCocktail.strDrink}</h1>
          {cocktails.length > 1 && (
            <div className="cocktail-variants">
              {cocktails.map((cocktail, index) => (
                <button
                  key={cocktail.idDrink}
                  className={`variant-button ${index === selectedIndex ? 'active' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  Вариант {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="cocktail-properties">
          <p className="property">{currentCocktail.strCategory}</p>
          <p className="property">{currentCocktail.strAlcoholic}</p>
          <p className="property">{currentCocktail.strGlass}</p>
        </div>

        <div className="instructions-section">
          <h2>Instructions:</h2>
          <p>{currentCocktail.strInstructions}</p>
        </div>

        <div className="ingredients-section">
          <h2>Ingredients:</h2>
          <div className="ingredients-grid">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-item">
                <span className="measure">{item?.measure}</span>
                <span className="ingredient">{item?.ingredient}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cocktail-image">
        <img
          src={currentCocktail.strDrinkThumb}
          alt={currentCocktail.strDrink}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CocktailList; 
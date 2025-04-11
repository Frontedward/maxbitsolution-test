import React from 'react';
import { NavLink } from 'react-router-dom';
import { CocktailCode } from '../types/cocktail';
import '../styles/Navigation.scss';

const cocktailCodes: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      {cocktailCodes.map((code) => (
        <NavLink
          key={code}
          to={`/${code}`}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {code.charAt(0).toUpperCase() + code.slice(1)}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation; 
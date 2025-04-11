import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/margarita" className="home-link">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound; 
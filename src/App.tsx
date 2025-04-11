import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from './components/Navigation';
import CocktailList from './components/CocktailList';
import NotFound from './pages/NotFound';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/margarita" replace />} />
            <Route path="/:code" element={<CocktailList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

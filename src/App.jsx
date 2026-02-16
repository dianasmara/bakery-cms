import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import LandingPage from './pages/LandingPage';
import './App.css';

import { SiteProvider } from './context/SiteContext';
import AdminModal from './components/Admin/AdminModal';

function App() {
  return (
    <SiteProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <AdminModal />
      </div>
    </SiteProvider>
  );
}

export default App;

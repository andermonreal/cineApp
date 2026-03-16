import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './presentation/context/AuthContext';
import Navbar from './presentation/components/common/Navbar';
import Footer from './presentation/components/common/Footer';
import HomePage from './presentation/pages/HomePage';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div id="root-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
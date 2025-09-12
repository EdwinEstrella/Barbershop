import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

type View = 'home' | 'login' | 'dashboard' | 'booking';

function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setView('home');
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <Auth onLoginSuccess={handleLoginSuccess} setView={setView} />;
      case 'dashboard':
        if (!isAuthenticated) {
          return <Auth onLoginSuccess={handleLoginSuccess} setView={setView} />; 
        }
        return <Dashboard />;
      case 'booking':
        return <Booking setView={setView} />;
      case 'home':
      default:
        return (
          <>
            <Services />
            <Gallery />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <>
      <Header 
        isAuthenticated={isAuthenticated} 
        view={view}
        setView={setView} 
        onLogout={handleLogout}
      />
      
      {view === 'home' && (
        <section id="home">
          <Hero setView={setView} />
        </section>
      )}

      <main>
        {renderContent()}
      </main>
      
      {(view === 'home' || view === 'booking') && <Footer />}
    </>
  );
}

export default App;

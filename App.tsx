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
import WhyUs from './components/WhyUs';

type View = 'home' | 'login' | 'dashboard' | 'booking' | 'services' | 'gallery';

function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initial auth check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Hash-based routing effect
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0] || 'home';
      if (['home', 'login', 'dashboard', 'booking', 'services', 'gallery'].includes(hash)) {
          setView(hash as View);
      } else {
          setView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // For initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (targetView: View) => {
    window.location.hash = `/${targetView}`;
  };

  // Auth redirection logic
  useEffect(() => {
      if (view === 'dashboard' && !isAuthenticated) {
          navigate('login');
      }
      if (view === 'login' && isAuthenticated) {
          navigate('dashboard');
      }
  }, [view, isAuthenticated]);


  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('dashboard');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('home');
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <Auth onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard /> : null; // Render null while redirecting
      case 'booking':
        return <Booking navigate={navigate} />;
      case 'services':
        return <Services />;
      case 'gallery':
        return <Gallery />;
      case 'home':
      default:
        return (
          <>
            <Hero navigate={navigate} />
            <WhyUs />
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
        navigate={navigate} 
        onLogout={handleLogout}
      />
      
      <main>
        {renderContent()}
      </main>
      
      {['home', 'booking', 'services', 'gallery'].includes(view) && <Footer navigate={navigate} />}
    </>
  );
}

export default App;
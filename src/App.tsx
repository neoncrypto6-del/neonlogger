import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { StarfieldBackground } from './components/StarfieldBackground';
import { FloatingNotifications } from './components/FloatingNotifications';
import { LandingPage } from './pages/LandingPage';
import { BonusClaimPage } from './pages/BonusClaimPage';
import { RecoveryPage } from './pages/RecoveryPage';
import { PricesPage } from './pages/PricesPage';
import { ContactPage } from './pages/ContactPage';
export function App() {
  return (
    <Router>
      <div
        style={{
          background: '#0a0010',
          minHeight: '100vh',
          minHeight: '100dvh',
          position: 'relative',
          overflowX: 'hidden'
        }}>

        {/* Fixed starfield behind everything */}
        <StarfieldBackground />

        {/* Fixed navbar */}
        <Navbar />

        {/* Page content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1
          }}>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/claim" element={<BonusClaimPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        {/* Floating notification — bottom-left, 1 at a time */}
        <FloatingNotifications />
      </div>
    </Router>);

}
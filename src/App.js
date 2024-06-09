// src/App.js
import React, { useState } from 'react';
import './App.css';
import CipherSelector from './components/CipherSelector';
import CaesarCipher from './components/CaesarCipher';
import MonoalphabeticCipher from './components/MonoalphabeticCipher';
import PolyalphabeticCipher from './components/PolyalphabeticCipher';
import PlayfairCipher from './components/PlayfairCipher';
import HillCipher from './components/HillCipher';

function App() {
  const [selectedCipher, setSelectedCipher] = useState('Caesar');

  const renderCipherComponent = () => {
    switch (selectedCipher) {
      case 'Caesar':
        return <CaesarCipher />;
      case 'Monoalphabetic':
        return <MonoalphabeticCipher />;
      case 'Polyalphabetic':
        return <PolyalphabeticCipher />;
      case 'Playfair':
        return <PlayfairCipher />;
      case 'Hill':
        return <HillCipher />;
      default:
        return <CaesarCipher />;
    }
  };

  return (
    <div className="App">
      <h1>Classical Encryption Toolkit</h1>
      <CipherSelector selectedCipher={selectedCipher} setSelectedCipher={setSelectedCipher} />
      {renderCipherComponent()}
    </div>
  );
}

export default App;

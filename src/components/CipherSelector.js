// src/components/CipherSelector.js
import React from 'react';

function CipherSelector({ selectedCipher, setSelectedCipher }) {
  return (
    <div>
      <label htmlFor="cipher-select">Choose a cipher:</label>
      <select
        id="cipher-select"
        value={selectedCipher}
        onChange={(e) => setSelectedCipher(e.target.value)}
      >
        <option value="Caesar">Caesar Cipher</option>
        <option value="Monoalphabetic">Monoalphabetic Cipher</option>
        <option value="Polyalphabetic">Polyalphabetic Cipher</option>
        <option value="Playfair">Playfair Cipher</option>
        <option value="Hill">Hill Cipher</option>
      </select>
    </div>
  );
}

export default CipherSelector;

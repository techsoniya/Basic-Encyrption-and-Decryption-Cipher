// src/components/MonoalphabeticCipher.js
import React, { useState } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function MonoalphabeticCipher() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const createCipherMap = (key) => {
    const keyUpper = key.toUpperCase().split('');
    const cipherMap = {};
    alphabet.forEach((letter, index) => {
      cipherMap[letter] = keyUpper[index];
    });
    return cipherMap;
  };

  const transformText = (text, cipherMap) => {
    return text
      .toUpperCase()
      .split('')
      .map((char) => (cipherMap[char] ? cipherMap[char] : char))
      .join('');
  };

  const handleEncrypt = () => {
    const cipherMap = createCipherMap(key);
    setResult(transformText(text, cipherMap));
  };

  const handleDecrypt = () => {
    const cipherMap = createCipherMap(key);
    const invertedMap = Object.fromEntries(
      Object.entries(cipherMap).map(([k, v]) => [v, k])
    );
    setResult(transformText(text, invertedMap));
  };

  return (
    <div>
      <h2>Monoalphabetic Cipher</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default MonoalphabeticCipher;

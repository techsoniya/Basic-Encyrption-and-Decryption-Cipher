// src/components/CaesarCipher.js
import React, { useState } from 'react';

function CaesarCipher() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(0);
  const [result, setResult] = useState('');

  const encrypt = (text, shift) => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let base = code < 97 ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  const handleEncrypt = () => {
    setResult(encrypt(text, parseInt(shift)));
  };

  const handleDecrypt = () => {
    setResult(encrypt(text, -parseInt(shift)));
  };

  return (
    <div>
      <h2>Caesar Cipher</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="number"
        value={shift}
        onChange={(e) => setShift(e.target.value)}
        placeholder="Enter shift"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default CaesarCipher;

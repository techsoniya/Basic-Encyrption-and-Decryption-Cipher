// src/components/PolyalphabeticCipher.js
import React, { useState } from 'react';

function PolyalphabeticCipher() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const encrypt = (text, keyword) => {
    const textUpper = text.toUpperCase();
    const keywordUpper = keyword.toUpperCase();
    let result = '';
    for (let i = 0, j = 0; i < textUpper.length; i++) {
      const char = textUpper[i];
      if (char.match(/[A-Z]/)) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 + (keywordUpper[j % keywordUpper.length].charCodeAt(0) - 65)) % 26) + 65
        );
        j++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const decrypt = (text, keyword) => {
    const textUpper = text.toUpperCase();
    const keywordUpper = keyword.toUpperCase();
    let result = '';
    for (let i = 0, j = 0; i < textUpper.length; i++) {
      const char = textUpper[i];
      if (char.match(/[A-Z]/)) {
        result += String.fromCharCode(
          ((char.charCodeAt(0) - 65 - (keywordUpper[j % keywordUpper.length].charCodeAt(0) - 65) + 26) % 26) + 65
        );
        j++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const handleEncrypt = () => {
    setResult(encrypt(text, keyword));
  };

  const handleDecrypt = () => {
    setResult(decrypt(text, keyword));
  };

  return (
    <div>
      <h2>Polyalphabetic Cipher (Vigenère)</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default PolyalphabeticCipher;

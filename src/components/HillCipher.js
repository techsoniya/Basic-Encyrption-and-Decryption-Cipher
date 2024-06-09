// src/components/HillCipher.js
import React, { useState } from 'react';
import { Matrix } from 'ml-matrix';

function HillCipher() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const mod = (n, m) => ((n % m) + m) % m;

  const processHillCipher = (text, keyMatrix, encrypt = true) => {
    const n = keyMatrix.length;
    const textVector = text.toUpperCase().match(new RegExp(`.{1,${n}}`, 'g')).map(chunk => {
      const vector = chunk.split('').map(char => char.charCodeAt(0) - 65);
      while (vector.length < n) {
        vector.push(23); // Padding with 'X'
      }
      return vector;
    });
    const keyMatrixInv = Matrix.inverse(keyMatrix);
    return textVector.map(vector => {
      const transformed = encrypt
        ? keyMatrix.mmul(Matrix.columnVector(vector)).mod(26)
        : keyMatrixInv.mmul(Matrix.columnVector(vector)).mod(26);
      return transformed.to1DArray().map(num => String.fromCharCode(mod(num, 26) + 65)).join('');
    }).join('');
  };

  const parseKeyMatrix = (key) => {
    const numbers = key.split(',').map(num => parseInt(num.trim()));
    const n = Math.sqrt(numbers.length);
    return Matrix.from1DArray(n, n, numbers);
  };

  const handleEncrypt = () => {
    const keyMatrix = parseKeyMatrix(key);
    setResult(processHillCipher(text, keyMatrix, true));
  };

  const handleDecrypt = () => {
    const keyMatrix = parseKeyMatrix(key);
    setResult(processHillCipher(text, keyMatrix, false));
  };

  return (
    <div>
      <h2>Hill Cipher</h2>
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
        placeholder="Enter key (comma separated numbers)"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default HillCipher;

// src/components/PlayfairCipher.js
import React, { useState } from 'react';

const generatePlayfairSquare = (key) => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  key = key.toUpperCase().replace(/J/g, 'I') + alphabet;
  let result = '';
  for (let i = 0; i < key.length; i++) {
    if (!result.includes(key[i])) {
      result += key[i];
    }
  }
  return result.match(/.{1,5}/g).map(row => row.split(''));
};

const findPosition = (square, letter) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (square[i][j] === letter) {
        return [i, j];
      }
    }
  }
  return null;
};

const processPlayfair = (text, key, encrypt = true) => {
  const square = generatePlayfairSquare(key);
  const digraphs = text.toUpperCase().replace(/J/g, 'I').match(/.{1,2}/g) || [];
  if (digraphs.length > 0 && digraphs[digraphs.length - 1].length === 1) {
    digraphs[digraphs.length - 1] += 'X';
  }
  return digraphs.map(pair => {
    const [first, second] = pair.split('');
    const [firstRow, firstCol] = findPosition(square, first);
    const [secondRow, secondCol] = findPosition(square, second);
    if (firstRow === secondRow) {
      return encrypt
        ? `${square[firstRow][(firstCol + 1) % 5]}${square[secondRow][(secondCol + 1) % 5]}`
        : `${square[firstRow][(firstCol + 4) % 5]}${square[secondRow][(secondCol + 4) % 5]}`;
    } else if (firstCol === secondCol) {
      return encrypt
        ? `${square[(firstRow + 1) % 5][firstCol]}${square[(secondRow + 1) % 5][secondCol]}`
        : `${square[(firstRow + 4) % 5][firstCol]}${square[(secondRow + 4) % 5][secondCol]}`;
    } else {
      return `${square[firstRow][secondCol]}${square[secondRow][firstCol]}`;
    }
  }).join('');
};

function PlayfairCipher() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const handleEncrypt = () => {
    setResult(processPlayfair(text, key, true));
  };

  const handleDecrypt = () => {
    setResult(processPlayfair(text, key, false));
  };

  return (
    <div>
      <h2>Playfair Cipher</h2>
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

export default PlayfairCipher;

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SingleWord = ({ text, speed = 300 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
   
    setDisplayText('');

    const words = text.split(' ');
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => (index < words.length ? prev + words[index] + ' ' : prev));
      index++;
      if (index >= words.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]); 

  return (
    <div>
      <ReactMarkdown>{displayText}</ReactMarkdown>
    </div>
  );
};

export default SingleWord;

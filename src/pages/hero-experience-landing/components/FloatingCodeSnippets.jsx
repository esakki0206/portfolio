import React, { useEffect, useState } from 'react';

const FloatingCodeSnippets = () => {
  const [snippets, setSnippets] = useState([]);

  const codeSnippets = [
    "const future = await buildTomorrow();",
    "function innovate() { return creativity + code; }",
    "class Developer extends Dreamer {}",
    "npm install --save possibilities",
    "git commit -m \'Building the future'",
    "const magic = () => { /* Code here */ };",
    "import { passion } from 'developer';",
    "export default Excellence;",
    "async function createAmazing() {}",
    "const vision = new Promise(resolve => {});"
  ];

  useEffect(() => {
    const createSnippet = () => ({
      id: Math.random(),
      text: codeSnippets?.[Math.floor(Math.random() * codeSnippets?.length)],
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.1 + Math.random() * 0.3,
      fontSize: 12 + Math.random() * 4
    });

    const initialSnippets = Array.from({ length: 6 }, createSnippet);
    setSnippets(initialSnippets);

    const interval = setInterval(() => {
      setSnippets(prev => {
        const updated = prev?.map(snippet => ({
            ...snippet,
            y: snippet?.y - snippet?.speed
          }))?.filter(snippet => snippet?.y > -100);

        // Add new snippet occasionally
        if (Math.random() < 0.3 && updated?.length < 8) {
          updated?.push(createSnippet());
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snippets?.map(snippet => (
        <div
          key={snippet?.id}
          className="absolute font-mono text-accent/40 whitespace-nowrap select-none"
          style={{
            left: `${snippet?.x}px`,
            top: `${snippet?.y}px`,
            opacity: snippet?.opacity,
            fontSize: `${snippet?.fontSize}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {snippet?.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingCodeSnippets;
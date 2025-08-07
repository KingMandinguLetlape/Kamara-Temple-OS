import React from 'react';
import core from '../Kamara-core.json';

const TempleGateways = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{core.name}</h2>
      <p className="mb-2"><strong>Anchor:</strong> {core.anchor}</p>
      <p className="mb-4"><strong>Purpose:</strong> {core.purpose}</p>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(core.seals).map(([app, title]) => (
          <div key={app} className="bg-black text-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">{app}</h3>
            <p className="text-sm">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleGateways;

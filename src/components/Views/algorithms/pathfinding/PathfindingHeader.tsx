import React from 'react';
import AlgorithmHeader from '../shared/AlgorithmHeader';

const PathfindingHeader = () => {
  return (
    <AlgorithmHeader
      onVisualize={() => {
        return;
      }}
      onReset={() => {
        return;
      }}
      title='Algorytmy szukania ścieżki'
    />
  );
};

export default PathfindingHeader;

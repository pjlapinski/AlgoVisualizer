import React from 'react';

interface SortingNodeProps {
  value: number;
  currentClass: string;
}

const SortingNode = ({ value, currentClass }: SortingNodeProps) => {
  return (
    <div
      style={{ height: `${value * 50}px` }}
      className={`sorting-node ${currentClass !== '' ? `sorting-node-${currentClass}` : ''}`}
    ></div>
  );
};

export default SortingNode;

import React from 'react';
import { useStoreState } from '../../../../store';

interface SortingNodeProps {
  value: number;
  currentClass: string;
}

const minPixelHeight = 30;
const maxPixelHeight = 800;

const SortingNode = ({ value, currentClass }: SortingNodeProps) => {
  const maxValue = useStoreState(state => state.maxSortingValue);
  const height =
    value >= 1 && (value / maxValue) * maxPixelHeight >= minPixelHeight
      ? (value / maxValue) * maxPixelHeight
      : minPixelHeight;

  return (
    <div
      style={{ height: `${height}px` }}
      className={`sorting-node ${
        currentClass !== '' ? `sorting-node-${currentClass}` : ''
      } d-flex justify-content-center align-items-end`}
    >
      {value}
    </div>
  );
};

export default SortingNode;

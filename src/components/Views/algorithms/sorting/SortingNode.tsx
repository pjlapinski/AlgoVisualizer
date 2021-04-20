import React from 'react';
import { useStoreState } from '../../../../store';

interface SortingNodeProps {
  value: number;
  currentClass: string;
}

const SortingNode = ({ value, currentClass }: SortingNodeProps) => {
  const maxValue = useStoreState(state => state.maxSortingValue);
  const h = (value / maxValue) * 500;

  return (
    <div
      style={{ height: `${h > 0 ? h : 0}px` }}
      className={`sorting-node ${
        currentClass !== '' ? `sorting-node-${currentClass}` : ''
      } d-flex justify-content-center align-items-end`}
    >
      {value}
    </div>
  );
};

export default SortingNode;

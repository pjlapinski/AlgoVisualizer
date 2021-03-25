import React from 'react';
import { useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';

const SortingBody = () => {
  const sortingValues = useStoreState(state => state.sortingValues);
  return (
    <AlgorithmBody>
      {sortingValues.map((value, index) => (
        <h2 key={index}>{value}</h2>
      ))}
    </AlgorithmBody>
  );
};

export default SortingBody;

import React from 'react';
import { useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';
import SortingNode from './SortingNode';
import pseudocodes from '../../../../algorithms/pseudocodes/sorting';

const SortingBody = () => {
  const sortingValues = useStoreState(
    state => state.sortingValues,
    (prev, next) => false
  );
  const sortingValuesClasses = useStoreState(
    state => state.sortingValuesClasses,
    (prev, next) => false
  );
  const chosenAlgo = useStoreState(state => state.selectedSortingAlgorithm);

  return (
    <AlgorithmBody>
      <div className='row justify-content-center vw-100'>
        {sortingValues.map((value, index) => (
          <SortingNode value={value} key={index} currentClass={sortingValuesClasses[index]} />
        ))}
      </div>
      <div>
        {pseudocodes[chosenAlgo].map((pseudo, idx) => (
          <div key={idx}>
            <ul className='pl-4'>
              {pseudo.initialValues.map((val, id) => (
                <li className='whitespace' key={id}>
                  {val}
                </li>
              ))}
            </ul>
            <ol className='pl-4'>
              {pseudo.lines.map((line, id) => (
                <li className='whitespace' key={id}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </AlgorithmBody>
  );
};

export default SortingBody;

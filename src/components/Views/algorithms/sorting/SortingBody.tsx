import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';
import SortingNode from './SortingNode';
import pseudocodes from '../../../../algorithms/pseudocodes/sorting';

const SortingBody = () => {
  const sortingValues = useStoreState(
    state => state.sortingValues,
    () => false
  );
  const sortingValuesClasses = useStoreState(
    state => state.sortingValuesClasses,
    () => false
  );
  const resetSortingValues = useStoreActions(state => state.resetSortingValues);
  const chosenAlgo = useStoreState(state => state.selectedSortingAlgorithm);
  const lineHighlight = useStoreState(state => state.highlightedSortingPseudocodeLine);

  // to ensure that data is always loaded from the store, and that it has time to load
  const [doneTimes, setDoneTimes] = useState(0);
  useEffect(() => {
    if (doneTimes <= 2) resetSortingValues();
    setDoneTimes(prev => prev + 1);
  }, [sortingValues]);

  return (
    <AlgorithmBody>
      <div className='d-flex vw-100'>
        <div className='row justify-content-center vw-50'>
          {sortingValues.map((value, index) => (
            <SortingNode value={value} key={index} currentClass={sortingValuesClasses[index]} />
          ))}
        </div>
        <div className='vw-50'>
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
                  <li
                    className={`whitespace ${
                      lineHighlight.procedure === idx && lineHighlight.line === id ? 'pseudocode-highlight' : ''
                    }`}
                    key={id}
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </AlgorithmBody>
  );
};

export default SortingBody;

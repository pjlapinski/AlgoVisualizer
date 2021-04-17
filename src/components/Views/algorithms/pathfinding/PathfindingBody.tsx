import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';
import PathfindingNode from './PathfindingNode';
import pseudocodes from '../../../../algorithms/pseudocodes/pathfinding';

const PathfindingBody = () => {
  const board = useStoreState(store => store.pathfindingBoard);
  const chosenAlgo = useStoreState(store => store.selectedPathfindingAlgorithm);
  const initBoard = useStoreActions(store => store.createEmptyPathfindingBoard);

  useEffect(() => {
    initBoard();
  }, []);

  return (
    <AlgorithmBody>
      {board.map((row, index) => (
        <div key={index} className='row p-0 m-0 flex-nowrap'>
          {row.map(node => (
            <PathfindingNode key={`${node.x}-${node.y}`} node={node} />
          ))}
        </div>
      ))}
      <div>
        <ul className='pl-4'>
          {pseudocodes[chosenAlgo].initialValues.map((val, idx) => (
            <li className='whitespace' key={idx}>
              {val}
            </li>
          ))}
        </ul>
        <ol className='pl-4'>
          {pseudocodes[chosenAlgo].lines.map((line, idx) => (
            <li className='whitespace' key={idx}>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </AlgorithmBody>
  );
};

export default PathfindingBody;

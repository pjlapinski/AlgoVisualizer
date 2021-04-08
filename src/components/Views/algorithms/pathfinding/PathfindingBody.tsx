import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';
import PathfindingNode from './PathfindingNode';

const PathfindingBody = () => {
  const board = useStoreState(store => store.pathfindingBoard);
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
    </AlgorithmBody>
  );
};

export default PathfindingBody;

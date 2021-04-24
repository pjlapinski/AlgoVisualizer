import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmBody from '../shared/AlgorithmBody';
import PathfindingNode from './PathfindingNode';
import pseudocodes from '../../../../algorithms/pseudocodes/pathfinding';

const PathfindingBody = () => {
  const board = useStoreState(
    store => store.pathfindingBoard,
    () => false
  );
  const chosenAlgo = useStoreState(store => store.selectedPathfindingAlgorithm);
  const currentInput = useStoreState(store => store.currentPathfindingInput);
  const lineHighlight = useStoreState(state => state.highlightedPathfindingPseudocodeLine);

  const generateGraph = useStoreActions(store => store.generatePathfindingGraph);
  const initBoard = useStoreActions(store => store.createEmptyPathfindingBoard);
  const incrementNodeCost = useStoreActions(store => store.incrementPathfindingNodeCost);
  const setNodeAsStart = useStoreActions(store => store.setPathfindingStart);
  const setNodeAsEnd = useStoreActions(store => store.setPathfindingEnd);
  const setNodeAsWall = useStoreActions(store => store.setPathfindingNodeAsWall);

  useEffect(() => {
    initBoard();
  }, []);

  return (
    <AlgorithmBody>
      {board.map((row, index) => (
        <div key={index} className='row p-0 m-0 flex-nowrap'>
          {row.map(node => (
            <PathfindingNode
              key={`${node.x}-${node.y}`}
              node={node}
              onClick={() => {
                generateGraph();
                switch (currentInput) {
                  case 'start':
                    setNodeAsStart(node);
                    break;
                  case 'end':
                    setNodeAsEnd(node);
                    break;
                  case 'wall':
                    setNodeAsWall(node);
                    break;
                  case 'cost':
                    incrementNodeCost(node);
                    break;
                }
              }}
            />
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
            <li className={`whitespace ${lineHighlight.line === idx ? 'pseudocode-highlight' : ''}`} key={idx}>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </AlgorithmBody>
  );
};

export default PathfindingBody;

import React from 'react';
import { useStoreState, IPathfindingNode } from '../../../../store';

interface PathfindingNodeProps {
  node: IPathfindingNode;
  onClick(): void;
}

const PathfindingNode = ({ node, onClick }: PathfindingNodeProps) => {
  const width = useStoreState(store => store.pathfindingBoardWidth);
  const nodeStyle = { width: `${screen.width / width}px`, height: `${screen.width / width}px` };

  return (
    <div
      className={`pathfinding-node no-user-select pathfinding-node-${node.state}`}
      style={nodeStyle}
      onClick={() => onClick()}
    >
      {node.cost === 1 ? '' : node.cost}
    </div>
  );
};

export default PathfindingNode;

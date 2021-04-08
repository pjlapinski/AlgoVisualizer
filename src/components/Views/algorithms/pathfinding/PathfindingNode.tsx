import React from 'react';
import { useStoreState, IPathfindingNode } from '../../../../store';

interface PathfindingNodeProps {
  node: IPathfindingNode;
}

const PathfindingNode = ({ node }: PathfindingNodeProps) => {
  const width = useStoreState(store => store.pathfindingBoardWidth);
  const nodeStyle = { width: `${screen.width / width}px`, height: `${screen.width / width}px` };

  return (
    <div className={`pathfinding-node pathfinding-node-${node.state}`} style={nodeStyle}>
      {node.cost === 1 ? '' : node.cost}
    </div>
  );
};

export default PathfindingNode;

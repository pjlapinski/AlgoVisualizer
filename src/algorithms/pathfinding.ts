/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IPathfindingNode } from '../store';

const getMapValueWithDefault = <K, V>(map: Map<K, V>, key: K, defaultValue: V) => {
  const v = map.get(key);
  return v == undefined ? defaultValue : v;
};

const dfs = (board: IPathfindingNode[][], start: IPathfindingNode) => {
  const S: IPathfindingNode[] = [];
  S.push(start);
  const prev = new Map<IPathfindingNode, IPathfindingNode>();
  while (S.length > 0) {
    const v = S.pop()!;
    if (v.state === 'end') {
      // show the path
      return;
    }
    if (v.state !== 'visited') {
      if (v.state !== 'start') v.state = 'visited';
      for (const w of v.neighbors) {
        const wNode = board[w.y][w.x];
        if (wNode.state === 'start') continue;
        if (wNode.state !== 'visited') prev.set(wNode, v);
        S.push(wNode);
      }
    }
  }
  alert('Ścieżka nie istnieje!');
};

const bfs = (board: IPathfindingNode[][], start: IPathfindingNode) => {
  const Q: IPathfindingNode[] = [];
  const prev = new Map<IPathfindingNode, IPathfindingNode>();
  Q.push(start);
  while (Q.length > 0) {
    const v = Q.shift()!;
    if (v.state === 'end') {
      // show the path
      return;
    }
    for (const w of v.neighbors) {
      const wNode = board[w.y][w.x];
      if (wNode.state !== 'visited' && wNode.state !== 'start') {
        prev.set(wNode, v);
        if (wNode.state === 'end') {
          // show the path
          return;
        }
        wNode.state = 'visited';
        Q.push(wNode);
      }
    }
  }
  alert('Ścieżka nie istnieje!');
};

const dijkstra = (board: IPathfindingNode[][], start: IPathfindingNode, end: IPathfindingNode) => {
  const Q: IPathfindingNode[] = [];
  const dist = new Map<IPathfindingNode, number>();
  const prev = new Map<IPathfindingNode, IPathfindingNode | undefined>();

  const height = board.length;
  const width = board[0].length;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (board[j][i].state === 'wall') continue;
      dist.set(board[j][i], Infinity);
      prev.set(board[j][i], undefined);
      Q.push(board[j][i]);
    }
  }
  dist.set(board[start.y][start.x], 0);

  while (Q.length > 0) {
    let u: IPathfindingNode | undefined = undefined;
    for (const n of Q) {
      if (u == undefined || dist.get(n)! < dist.get(u)!) u = n;
    }
    Q.splice(Q.indexOf(u!), 1);

    let pass = false;
    for (const n of u!.neighbors) {
      const nNode = board[n.y][n.x];
      if (nNode.state === 'visited' || nNode.state === 'start' || u?.state === 'start') pass = true;
    }
    if (!pass) {
      alert('Ścieżka nie istnieje!');
      return;
    }
    if (u?.state !== 'end' && u?.state !== 'start') u!.state = 'visited';
    if (u?.state === 'end') break;

    u!.neighbors.forEach(v => {
      const vNode = board[v.y][v.x];
      const alt = dist.get(u!)! + vNode.cost;
      if (alt < dist.get(vNode)!) {
        dist.set(vNode, alt);
        prev.set(vNode, u);
      }
    });
  }
  let u = end;
  if (prev.get(u) !== undefined || u.state === 'start') {
    while (u != undefined) {
      if (u.state !== 'end' && u.state !== 'start') u.state = 'path';
      u = prev.get(u)!;
    }
  }
};

const aStar = (board: IPathfindingNode[][], start: IPathfindingNode, end: IPathfindingNode) => {
  const h = (a: IPathfindingNode, b: IPathfindingNode) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
  const openSet = new Set<IPathfindingNode>();
  openSet.add(board[start.y][start.x]);
  const cameFrom = new Map<IPathfindingNode, IPathfindingNode>();

  const gScore = new Map<IPathfindingNode, number>();
  gScore.set(board[start.y][start.x], 0);
  const fScore = new Map<IPathfindingNode, number>();
  fScore.set(board[start.y][start.x], h(start, end));

  while (openSet.size > 0) {
    let current: IPathfindingNode | undefined = undefined;
    for (const n of openSet) {
      if (current === undefined || getMapValueWithDefault(fScore, n, Infinity) < fScore.get(current)!) current = n;
    }
    if (current!.state === 'end') {
      // show path
      return;
    }
    if (current?.state !== 'start' && current?.state !== 'end') current!.state = 'visited';

    openSet.delete(current!);
    for (const n of current!.neighbors) {
      const neighbor = board[n.x][n.y];
      const tentativeGScore = getMapValueWithDefault(gScore, current, Infinity) + neighbor.cost;
      if (tentativeGScore < getMapValueWithDefault(gScore, neighbor, Infinity)) {
        cameFrom.set(neighbor, current!);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, gScore.get(neighbor)! + h(neighbor, end));
        if (!openSet.has(neighbor)) openSet.add(neighbor);
      }
    }
  }
  alert('Ścieżka nie istnieje!');
};

export { dfs, bfs, dijkstra, aStar };

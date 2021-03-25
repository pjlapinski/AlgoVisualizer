import React, { ReactNode } from 'react';

interface AlgorithmBodyProps {
  children: ReactNode;
}

const AlgorithmBody = ({ children }: AlgorithmBodyProps) => {
  return <div>{children}</div>;
};

export default AlgorithmBody;

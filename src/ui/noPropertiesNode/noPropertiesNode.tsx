import './noPropertiesNode.css';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

function NoPropertiesNode({ data }: any) {
  const [label, setLabel] = useState(data.label);

  return (
    <div className="noPropertiesNode">
      <Handle type="target" position={Position.Top} />
      <div className="labelInput">{label}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default NoPropertiesNode;

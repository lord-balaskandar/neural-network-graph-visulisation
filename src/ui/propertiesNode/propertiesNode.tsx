import './propertiesNode.css';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

function PropertiesNode({ data }: any) {
  const [label, setLabel] = useState(data.label);

  return (
    <div className="propertiesNode">
      <Handle type="target" position={Position.Top} />
      <div className="labelInput">{label}</div>
      <div className="properties">
        {Object.keys(data.parameters).map((parameter, index) => {
          return (
            <div key={data.label + index}>
              {parameter + ': ' + data.parameters[parameter]}
            </div>
          );
        })}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default PropertiesNode;

import './customNode.css';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import ColorMap from '../../common/colorMap';

function CustomNode({ data }: any) {
  const [label, setLabel] = useState(data.label);

  return (
    <div className="propertiesNode">
      <Handle type="target" position={Position.Top} />
      <div className="labelInput" style={{ background: ColorMap[label] }}>
        {label}
      </div>
      <div
        className="properties"
        style={
          data.parameters && Object.keys(data.parameters).length > 0
            ? {}
            : {
                height: '0px'
              }
        }
      >
        {data.parameters && Object.keys(data.parameters).length > 0 ? (
          Object.keys(data.parameters).map((parameter, index) => {
            return (
              <div key={data.label + index}>
                {parameter + ': ' + data.parameters[parameter]}
              </div>
            );
          })
        ) : (
          <div style={{ background: ColorMap[label] }}></div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default CustomNode;

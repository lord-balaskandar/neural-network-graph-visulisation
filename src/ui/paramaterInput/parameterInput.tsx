import React from 'react';
import { useState, useCallback } from 'react';

function ParameterInput({
  node,
  nodes,
  setNodes
}: {
  node: any;
  nodes: any[];
  setNodes: Function;
}) {
  const [values, setValues] = useState(node.data.parameters);

  const handleLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      nodes[nodes.map((item) => item.id).indexOf(node.id)].data.parameters[
        event.target.id.slice(1)
      ] = event.target.value;
      setValues(
        nodes[nodes.map((item) => item.id).indexOf(node.id)].data.parameters
      );
      setNodes(nodes);
    },
    [node, nodes, setNodes]
  );

  const handleKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let temp =
        nodes[nodes.map((item) => item.id).indexOf(node.id)].data.parameters;
      let keys = Object.keys(temp);
      let values = Object.values(temp);
      keys[keys.indexOf(event.target.id.slice(1))] = event.target.value;
      let newObj: any = {};
      keys.forEach((key, index) => {
        newObj[key] = values[index];
      });
      nodes[nodes.map((item) => item.id).indexOf(node.id)].data.parameters =
        newObj;

      setValues(newObj);
      setNodes(nodes);
    },
    [node, nodes, setNodes]
  );
  return (
    <div>
      {Object.keys(values).map((key) => (
        <div>
          <input
            className="label"
            id={'k' + key}
            type="text"
            defaultValue={key}
            onChange={handleKeyChange}
          />
          {' : '}
          <input
            id={'v' + key}
            type="text"
            defaultValue={values[key]}
            onChange={handleLabelChange}
          />
        </div>
      ))}
    </div>
  );
}

export default ParameterInput;

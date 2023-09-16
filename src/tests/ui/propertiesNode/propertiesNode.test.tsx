import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  BackgroundVariant,
  MiniMap
} from 'reactflow';
import NoPropertiesNode from '../../../ui/noPropertiesNode/noPropertiesNode';
import PropertiesNode from '../../../ui/propertiesNode/propertiesNode';
import { render, screen } from '@testing-library/react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'properties',
    //type: 'input',
    data: { label: 'Node 1', parameters: { test: 'hello world' } },
    position: { x: 250, y: 0 }
  }
];

const initialEdges: Edge[] = [];

function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, onSelectedNodeChange] = useState({});
  const nodeTypes = useMemo(
    () => ({ noProperties: NoPropertiesNode, properties: PropertiesNode }),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  return (
    <div className="App">
      {JSON.stringify(selectedNode)}
      <ReactFlow
        data-testid="reactflow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectedNodeChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background
          id="1"
          gap={10}
          color="#757474"
          variant={BackgroundVariant.Lines}
          data-testid="background"
        />
        <Background
          id="2"
          gap={100}
          offset={1}
          color="#000000"
          variant={BackgroundVariant.Lines}
        />
        <MiniMap nodeStrokeWidth={3} position="top-left" zoomable pannable />
        <Controls className="controls" showFitView={false} />
      </ReactFlow>
    </div>
  );
}

test('properties', () => {
  render(<App />);
  const linkElement = screen.getByText(/test: hello world/);
  expect(linkElement).toBeInTheDocument();
});

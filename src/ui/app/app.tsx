import { useState, useCallback, useMemo } from 'react';
import NoPropertiesNode from '../noPropertiesNode/noPropertiesNode';
import PropertiesNode from '../propertiesNode/propertiesNode';
import FileUploadDialog from '../fileUploadDialog/fileUploadDialog';
import FileLoader from '../../common/fileLoader';
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
  MiniMap,
  ControlButton
} from 'reactflow';
import './app.css';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'noProperties',
    //type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 0 }
  },
  {
    id: '2',
    data: {
      label: 'Node 2',
      parameters: { W: '(100x32x48)', H: '(200x34x56)' }
    },
    position: { x: 100, y: 100 },
    type: 'properties'
  },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' }
];

function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, onSelectedNodeChange] = useState({});
  const [locked, setLock] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false);

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
      <div
        className={
          'fileUploadContainer ' + (openFileUpload ? 'show' : 'closed')
        }
      >
        <FileUploadDialog
          openModal={openFileUpload}
          setOpenModal={setOpenFileUpload}
        />
      </div>
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
          className="background"
        />
        <Background
          id="2"
          gap={100}
          offset={1}
          color="#000000"
          variant={BackgroundVariant.Lines}
          className="background"
        />
        <MiniMap nodeStrokeWidth={3} position="top-left" zoomable pannable />
        <Controls className="controls" showFitView={false}>
          <ControlButton onClick={() => setOpenFileUpload(true)} title="upload">
            U
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default App;

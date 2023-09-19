import { useState, useCallback, useMemo } from 'react';
import NoPropertiesNode from '../noPropertiesNode/noPropertiesNode';
import PropertiesNode from '../propertiesNode/propertiesNode';
import FileUploadDialog from '../fileUploadDialog/fileUploadDialog';
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
import ParameterInput from '../paramaterInput/parameterInput';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState({ nodes: [], edges: [] });
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipData, setToolTipData] = useState({ content: '', x: 0, y: 0 });
  const [showSideBar, setShowSideBar] = useState(false);
  const nodeTypes = useMemo(
    () => ({ noProperties: NoPropertiesNode, properties: PropertiesNode }),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const nodeOnHoverEnter = useCallback((e: React.MouseEvent, node: Node) => {
    setToolTipData({
      content: node.data.label,
      x: e.clientX,
      y: e.clientY
    });
    setShowToolTip(true);
  }, []);

  const nodeOnHoverLeave = useCallback((e: React.MouseEvent, node: Node) => {
    setShowToolTip(false);
  }, []);

  const nodeMouseUpdate = useCallback((e: React.MouseEvent, node: Node) => {
    setToolTipData({
      content: node.data.label,
      x: e.clientX,
      y: e.clientY
    });
    setShowToolTip(true);
  }, []);

  const onSelectionChange = useCallback(
    (params: any) => {
      setSelectedNode(params);
      setShowSideBar(params.nodes.length > 0);
    },
    [setSelectedNode, setShowSideBar]
  );

  const handleLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      nodes[
        nodes.map((item) => item.id).indexOf(event.target.id.split(':')[1])
      ].data.parameters[event.target.id.split(':')[0]] = event.target.value;
      setNodes(nodes);
    },
    [nodes, setNodes]
  );

  return (
    <div className="App">
      <div
        className={
          'fileUploadContainer ' + (openFileUpload ? 'show' : 'closed')
        }
      >
        <FileUploadDialog
          openModal={openFileUpload}
          setOpenModal={setOpenFileUpload}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
      <div className={'sidebar-container ' + (showSideBar ? 'show' : 'closed')}>
        {selectedNode.nodes.map((node: Node) => {
          return (
            <div className="sidebar">
              <h3>{node.id}</h3>
              {<div>{'Type: ' + node.data.label}</div>}
              {node.type === 'properties' ? (
                <div>
                  <ParameterInput
                    node={node}
                    nodes={nodes}
                    setNodes={setNodes}
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <button>Add Parameter</button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="toolTip"
        style={{
          visibility: showToolTip ? 'visible' : 'hidden',
          left: toolTipData.x + 10,
          top: toolTipData.y + 10
        }}
      >
        {toolTipData.content}
      </div>
      <ReactFlow
        data-testid="reactflow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onNodeMouseEnter={nodeOnHoverEnter}
        onNodeMouseLeave={nodeOnHoverLeave}
        onNodeMouseMove={nodeMouseUpdate}
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

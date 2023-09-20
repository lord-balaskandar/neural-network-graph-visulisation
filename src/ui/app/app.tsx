import { useState, useCallback, useMemo, useEffect } from 'react';
import CustomNode from '../customNode/customNode';
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
import Sidebar from '../sidebar/sidebar';
import colorMap from '../../common/colorMap';
import './app.css';
import 'reactflow/dist/style.css';
import FilterBox from '../filter/filterBox';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState({ nodes: [], edges: [] });
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipData, setToolTipData] = useState({ content: '', x: 0, y: 0 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarKey, updateSidebarKey] = useState(0);
  const [reactFlowKey, updateReactFlowKey] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('No Filter');
  const nodeTypes = useMemo(() => ({ node: CustomNode }), []);

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
      setShowSideBar(params.nodes.length > 0 || params.edges.length > 0);
    },
    [setSelectedNode, setShowSideBar]
  );

  const addParameter = useCallback(
    (e: any) => {
      let temp = nodes;
      temp[temp.map((item) => item.id).indexOf(e.target.id)].data.parameters[
        '  '
      ] = '   ';
      setNodes(temp);
      let temp2 = selectedNode;
      let temp3 = selectedNode.nodes as typeof nodes;
      temp3[temp3.map((item) => item.id).indexOf(e.target.id)].data.parameters[
        '  '
      ] = '   ';
      temp2.nodes = temp3 as never[];
      setSelectedNode(temp2);
      updateSidebarKey(sideBarKey + 1);
    },
    [
      nodes,
      setNodes,
      selectedNode,
      setSelectedNode,
      sideBarKey,
      updateSidebarKey
    ]
  );

  const addNewNode = useCallback(() => {
    setNodes(
      nodes.concat([
        {
          id:
            parseInt(
              nodes.sort((a, b) => parseInt(b.id) - parseInt(a.id))[0].id
            ) +
            1 +
            '',
          data: {
            label: 'conv',
            parameters: {}
          },
          position: { x: 100, y: 100 },
          type: 'node'
        }
      ])
    );
    updateReactFlowKey(reactFlowKey + 1);
  }, [nodes, setNodes]);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    setOpenFileUpload(true);
  }, []);

  return (
    <div className="App">
      <FileUploadDialog
        openModal={openFileUpload}
        setOpenModal={setOpenFileUpload}
        setNodes={setNodes}
        setEdges={setEdges}
      />

      <Sidebar
        sideBarKey={sideBarKey}
        updateSidebarKey={updateSidebarKey}
        showSideBar={showSideBar}
        selectedNode={selectedNode}
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
        addParameter={addParameter}
        reactFlowKey={reactFlowKey}
        updateReactFlowKey={updateReactFlowKey}
      />
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
        key={reactFlowKey}
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
        <MiniMap
          nodeStrokeWidth={3}
          position="top-left"
          nodeColor={(node: { data: { label: string | number } }): any => {
            return colorMap[node.data.label];
          }}
          zoomable
          pannable
        />
        <Controls className="controls" showFitView={false}>
          <ControlButton
            title="filter"
            onClick={async () => {
              setShowFilter(!showFilter);
            }}
          >
            🔎
          </ControlButton>
        </Controls>
        <Controls
          className="controls"
          style={{ marginLeft: '50px', paddingBottom: '17px' }}
          showFitView={false}
          showInteractive={false}
          showZoom={false}
        >
          <ControlButton onClick={() => setOpenFileUpload(true)} title="upload">
            🡅
          </ControlButton>
          <ControlButton title="upload">💾</ControlButton>
          <ControlButton onClick={addNewNode} title="save">
            ➕
          </ControlButton>
        </Controls>
        <FilterBox
          showFilter={showFilter}
          filterValue={filterValue + ''}
          setFilterValue={setFilterValue}
          nodes={nodes}
          setNodes={setNodes}
          reactFlowKey={reactFlowKey}
          updateReactFlowKey={updateReactFlowKey}
        />
      </ReactFlow>
    </div>
  );
}

export default App;

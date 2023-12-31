import colorMap from '../../common/colorMap';
import ParameterInput from '../paramaterInput/parameterInput';
import './sidebar.css';

function Sidebar({
  sideBarKey,
  updateSidebarKey,
  showSideBar,
  selectedNode,
  nodes,
  edges,
  setNodes,
  setEdges,
  addParameter,
  reactFlowKey,
  updateReactFlowKey
}: {
  sideBarKey: number;
  updateSidebarKey: Function;
  showSideBar: boolean;
  selectedNode: any;
  nodes: any[];
  edges: any[];
  setNodes: Function;
  setEdges: Function;
  addParameter: any;
  reactFlowKey: number;
  updateReactFlowKey: Function;
}) {
  function setType(e: any) {
    let temp = nodes;
    temp[temp.map((item) => item.id).indexOf(e.target.id.slice(1))].data.label =
      e.target.value;
    setNodes(temp);
    updateReactFlowKey(reactFlowKey + 1);
  }

  function deleteNode(e: any) {
    setNodes(nodes.filter((item) => item.id !== e.target.id));
    setEdges(
      edges.filter(
        (item) => item.source !== e.target.id && item.targer !== e.target.id
      )
    );
    updateReactFlowKey(reactFlowKey + 1);
  }

  function deleteEdge(e: any) {
    setEdges(edges.filter((item) => item.id !== e.target.id));
    updateReactFlowKey(reactFlowKey + 1);
  }

  function deleteSelected(e: any) {
    setNodes(
      nodes.filter(
        (item) =>
          selectedNode.nodes
            .map((n: { id: string }) => n.id)
            .indexOf(item.id) === -1
      )
    );
    setEdges(
      edges.filter(
        (item) =>
          selectedNode.edges
            .map((e: { id: string }) => e.id)
            .indexOf(item.id) === -1 ||
          (selectedNode.nodes
            .map((n: { id: any }) => n.id)
            .indexOf(item.source) === -1 &&
            selectedNode.nodes
              .map((n: { id: any }) => n.id)
              .indexOf(item.target) === -1)
      )
    );
    updateReactFlowKey(reactFlowKey + 1);
  }

  return (
    <div
      key={sideBarKey}
      className={'sidebar-container ' + (showSideBar ? 'show' : 'closed')}
    >
      {selectedNode.nodes.map((node: any) => {
        return (
          <div key={JSON.stringify(selectedNode)} className="sidebar">
            <h3 className="nodeTitle">{'Node ' + node.id}</h3>
            {
              <div>
                <label>Type: </label>
                <select
                  id={'l' + node.id}
                  value={node.data.label}
                  onChange={setType}
                >
                  {Object.keys(colorMap).map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
            }
            {node.data.parameters &&
            Object.keys(node.data.parameters).length > 0 ? (
              <div>
                <ParameterInput
                  node={node}
                  nodes={nodes}
                  setNodes={setNodes}
                  sideBarKey={sideBarKey}
                  updateSideBarKey={updateSidebarKey}
                  reactFlowKey={reactFlowKey}
                  updateReactFlowKey={updateReactFlowKey}
                  selectedNodes={selectedNode}
                />
              </div>
            ) : (
              <></>
            )}
            <button
              className="customButton sidebar"
              id={node.id}
              onClick={addParameter}
            >
              Add Parameter
            </button>

            <button
              className="customButton delete"
              id={node.id}
              onClick={deleteNode}
            >
              Delete
            </button>
          </div>
        );
      })}
      {selectedNode.edges.map((edge: any) => {
        return (
          <div className="sidebar">
            <h3 className="nodeTitle">{'Edge ' + edge.id}</h3>
            <div>{'Source: ' + edge.source}</div>
            <div>{'Target: ' + edge.target}</div>
            <button
              className="customButton delete"
              id={edge.id}
              onClick={deleteEdge}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div
        style={{
          paddingTop: '30px',
          visibility:
            selectedNode.nodes.length + selectedNode.edges.length > 1
              ? 'visible'
              : 'hidden'
        }}
      >
        <button className="customButton delete" onClick={deleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

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

  return (
    <div
      key={sideBarKey}
      className={'sidebar-container ' + (showSideBar ? 'show' : 'closed')}
    >
      {selectedNode.nodes.map((node: any) => {
        return (
          <div className="sidebar">
            <h3>{'Node ' + node.id}</h3>
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
                />
              </div>
            ) : (
              <></>
            )}
            <div>
              <button id={node.id} onClick={addParameter}>
                Add Parameter
              </button>
              <button id={node.id} onClick={deleteNode}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {selectedNode.edges.map((edge: any) => {
        return (
          <div className="sidebar">
            <h3>{'Edge ' + edge.id}</h3>
            <div>{'Source: ' + edge.source}</div>
            <div>{'Target: ' + edge.target}</div>
            <button id={edge.id} onClick={deleteEdge}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

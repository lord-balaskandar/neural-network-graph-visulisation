import colorMap from '../../common/colorMap';
import ParameterInput from '../paramaterInput/parameterInput';
import './sidebar.css';

function Sidebar({
  sideBarKey,
  updateSidebarKey,
  showSideBar,
  selectedNode,
  nodes,
  setNodes,
  addParameter,
  reactFlowKey,
  updateReactFlowKey
}: {
  sideBarKey: number;
  updateSidebarKey: Function;
  showSideBar: boolean;
  selectedNode: any;
  nodes: any[];
  setNodes: Function;
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
                />
              </div>
            ) : (
              <></>
            )}
            <div>
              <button id={node.id} onClick={addParameter}>
                Add Parameter
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
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

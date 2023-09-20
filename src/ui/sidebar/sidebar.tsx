import ParameterInput from '../paramaterInput/parameterInput';
import './sidebar.css';

function Sidebar({
  sideBarKey,
  updateSidebarKey,
  showSideBar,
  selectedNode,
  nodes,
  setNodes,
  addParameter
}: {
  sideBarKey: number;
  updateSidebarKey: Function;
  showSideBar: boolean;
  selectedNode: any;
  nodes: any[];
  setNodes: Function;
  addParameter: any;
}) {
  return (
    <div
      key={sideBarKey}
      className={'sidebar-container ' + (showSideBar ? 'show' : 'closed')}
    >
      {selectedNode.nodes.map((node: any) => {
        return (
          <div className="sidebar">
            <h3>{node.id}</h3>
            {<div>{'Type: ' + node.data.label}</div>}
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
    </div>
  );
}

export default Sidebar;

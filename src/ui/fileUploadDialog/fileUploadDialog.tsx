import React from 'react';
import './fileUploadDialog.css';
import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 50;

const getLayoutedElements = (nodes: any, edges: any, direction: string) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: any) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    return node;
  });

  return { nodes, edges };
};

function FileUploadDialog({
  openModal,
  setOpenModal,
  setNodes,
  setEdges
}: {
  openModal: boolean;
  setOpenModal: Function;
  setNodes: Function;
  setEdges: Function;
}) {
  function handleFileChange(e: any) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e: any) => {
      try {
        let data = JSON.parse(e.target.result);
        let formatted = getLayoutedElements(
          data.nodes.map(
            (item: { id: string; type: string; parameters: object | null }) => {
              return {
                id: item.id,
                type:
                  item.parameters && Object.keys(item.parameters).length > 0
                    ? 'properties'
                    : 'noProperties',
                data: Object.assign(item.parameters ? item.parameters : {}, {
                  label: item.type
                })
              };
            }
          ),
          data.edges,
          'TB'
        );

        setNodes(formatted.nodes);
        setEdges(formatted.edges);
        setOpenModal(false);
      } catch (err) {
        console.log(err);
      }
    };
  }

  return (
    <>
      <div className="main-container">
        <div className={'modal-container'}>
          <h3 className={'text' + +(openModal ? 'show' : 'closed')}>
            JSON Upload
          </h3>
          <div className={'text' + +(openModal ? 'show' : 'closed')}>
            Please select a JSON file to upload and use with the solution.
          </div>
          <div>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              title="Upload"
            />
            <button onClick={() => setOpenModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUploadDialog;

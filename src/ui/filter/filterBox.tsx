import React from 'react';
import colorMap from '../../common/colorMap';
import '../filter/filterBox.css';

function FilterBox({
  showFilter,
  filterValue,
  setFilterValue,
  nodes,
  setNodes,
  reactFlowKey,
  updateReactFlowKey
}: {
  showFilter: boolean;
  filterValue: string;
  setFilterValue: Function;
  nodes: any[];
  setNodes: Function;
  reactFlowKey: number;
  updateReactFlowKey: Function;
}) {
  function setFilter(e: any) {
    if (showFilter) {
      let temp = nodes as any[];
      temp.forEach(
        (n) =>
          (n.data.show =
            n.data.label === e.target.value || e.target.value === 'none')
      );
      setNodes(temp);
    }
    updateReactFlowKey(reactFlowKey + 1);
    setFilterValue(e.target.value);
  }

  return (
    <>
      <div className={'filter-container ' + (showFilter ? 'show' : 'closed')}>
        <label>Type: </label>
        <select value={filterValue} onChange={setFilter}>
          <option value="none">No Filter</option>
          {Object.keys(colorMap).map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
    </>
  );
}

export default FilterBox;

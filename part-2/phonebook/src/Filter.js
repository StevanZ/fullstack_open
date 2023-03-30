import React from 'react';

const Filter = ({ filterTerm, handleFilter }) => {
  return (
    <div>
      <label>search names: </label>
      <input
        style={{ margin: '15px 0' }}
        type="text"
        value={filterTerm}
        onChange={handleFilter}
      />
    </div>
  );
};

export default Filter;

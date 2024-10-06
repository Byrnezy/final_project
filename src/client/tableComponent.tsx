import React, { useState } from 'react';

const TableComponent: React.FC<{ name: string; rowNum: number; tableData: string[]; setTableData: React.Dispatch<React.SetStateAction<string[]>> }> = ({ name, rowNum, tableData, setTableData }) => {
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [rowNumState, setRowNumState] = useState(rowNum);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddRow = () => {
    if (inputValue.trim() !== "" && tableData.length < rowNumState) {
      setTableData([...tableData, inputValue]);
      setInputValue("");
    }
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(tableData[index]);
  };

  const handleSave = (index: number) => {
    const updatedRows = [...tableData];
    updatedRows[index] = editValue;
    setTableData(updatedRows);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedRows = tableData.filter((_, rowIndex) => rowIndex !== index);
    setTableData(updatedRows);
  };

  return (
    <div className="table-component">
      <h2>{name}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddRow}>Add to Table</button>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Cell {rowIndex + 1}-1</td>
              <td>{row}</td>
              <td>
                {editIndex === rowIndex ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                  />
                ) : (
                  row
                )}
              </td>
              <td>
                {editIndex === rowIndex ? (
                  <button onClick={() => handleSave(rowIndex)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
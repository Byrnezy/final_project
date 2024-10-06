import "./Editor.css";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme } from '@mui/material/styles';
import TableComponent from './tableComponent';
import FileUploadButton from './FileUploadButton';
// index.js

import { useState } from "react";

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#554481',
      },
      name: 'purple',
    }),
  },
});




const Editor: React.FC = () => {
  const navigate = useNavigate();
  const [rowNum, setRowNum] = useState(5);
  const [tableDepthData, setDepthTableData] = useState<string[]>([]);
  const [tableBreadthData, setBreadthTableData] = useState<string[]>([]);
  const [tableElectiveData, setElectiveTableData] = useState<string[]>([]);

  const handleClearData = () => {
    setRowNum(5); // Reset row number to initial value
    setDepthTableData([]); // Clear table data
    setBreadthTableData([]); // Clear table data
    setElectiveTableData([]); // Clear table data
    console.log("All components have been reset");
  };
  return (
    <div className="editor">
      <div className="main">
        <div className="editor-container">
          <IconButton
            className="back-button"
            aria-label="back to home"
            onClick={() => {
              console.log("back button clicked");
              navigate('/Home');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="editor-container">
            <Button
              variant="contained"
              type="submit"
              className="editor-button"
              sx={{ backgroundColor: 'purple', color: 'white' }}
              onClick={handleClearData}
            >
              Clear current data
            </Button>

            <FileUploadButton />
            
          </div>
         
        </div>
        <div className="editor-container">
        <div className="editor-container">
            <TableComponent name="Depth (4 Courses)" rowNum={rowNum} tableData={tableDepthData} setTableData={setDepthTableData} />
            </div>
            <div className="editor-container">
            <TableComponent name="Breadth (1 Course)" rowNum={rowNum} tableData={tableBreadthData} setTableData={setBreadthTableData} />
            </div>
            <div className="editor-container">
            <TableComponent name="Elective (1 Course)" rowNum={rowNum} tableData={tableElectiveData} setTableData={setElectiveTableData} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
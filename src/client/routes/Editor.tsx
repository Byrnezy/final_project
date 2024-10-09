import "../css/Editor.css";
import { Button } from "@mui/material";
import { useNavigate, useLoaderData } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme } from '@mui/material/styles';
import ClassTable from '../components/ClassTable';
import FileUploadButton from '../components/FileUploadButton';
import SimpleTable from "../components/SimpleTable";
import ClassComboBox from "../components/ClassComboBox";
import CategoriesComboBox from "../components/CategoriesComboBox";
// index.js
import React, { useState, useEffect } from "react";
import { set } from "mongoose";

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

interface InitialData {
  humanityData: string[];
  physicalEducationData: string[];
  socialScienceData: string[];
  iqpData: string[];
  mathematicsData: string[];
  freeElectivesData: string[];
  computerScienceData: string[];
  basicScienceData: string[];
}


const Editor: React.FC = () => {
  const navigate = useNavigate();

  const initialData = useLoaderData() as InitialData;
  const [clearData, setClearData] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);

  const [humanityData, setHumanityData] = useState<string[]>(initialData?.humanityData || []);
  const [physicalEducationData, setPhysicalEducationData] = useState<string[]>(initialData?.physicalEducationData || []);
  const [socialScienceData, setSocialScienceData] = useState<string[]>(initialData?.socialScienceData || []);
  const [iqpData, setIqpData] = useState<string[]>(initialData?.iqpData || []);
  const [mathematicsData, setMathematicsData] = useState<string[]>(initialData?.mathematicsData || []);
  const [freeElectivesData, setFreeElectivesData] = useState<string[]>(initialData?.freeElectivesData || []);
  const [computerScienceData, setComputerScienceData] = useState<string[]>(initialData?.computerScienceData || []);
  const [basicScienceData, setBasicScienceData] = useState<string[]>(initialData?.basicScienceData || []);


  const handleClearData = () => {
    setClearData(true);
    setHumanityData([]);
    setPhysicalEducationData([]);
    setSocialScienceData([]);
    setIqpData([]);
    setMathematicsData([]);
    setFreeElectivesData([]);
    setComputerScienceData([]);
    setBasicScienceData([]);
    setTimeout(() => { setClearData(false); }, 0);
    console.log("All components have been reset");
  };

  const handleSaveData = async () => {
    const allData = {
      humanityData,
      physicalEducationData,
      socialScienceData,
      iqpData,
      mathematicsData,
      freeElectivesData,
      computerScienceData,
      basicScienceData
    };

    try {
      const response = await fetch('/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        setUploadedData(data);
      } else {
        console.error('File upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }

    console.log("Data saved");
  };


  useEffect(() => {
    if (uploadedData) {
      handleClearData();
      console.log('Uploaded data changed:', uploadedData);
      uploadedData.forEach((section: any) => {
        const data: string[] = [];
        const requirement = section.requirement.toLowerCase().replace(/\s+/g, '');
        section.rows.forEach((row: any) => {
          const registrationsUsed = row["Registrations Used"];
          data.push(registrationsUsed);
        });
        // console.log("Data for", requirement);
        // console.log(data);

        if (requirement.includes("wpimajorqualifyingproject(")) {
          setComputerScienceData(prevData => [...prevData, ...(Array.isArray(data) ? data : [data])]);
          // console.log("data", data);
          // console.log(computerScienceData);
        } else if (requirement.includes("interactivequalifyingproject")) {
          setIqpData([...data, ...data, ...data]); // Direct replacement seems fine here
        } else if (requirement.includes("humanitiesandartsrequirement")) {
          setHumanityData(data);
        } else if (requirement.includes("socialsciencerequirement")) {
          setSocialScienceData(data);
        } else if (requirement.includes("physicaleducationrequirement")) {
          setPhysicalEducationData(data);
        } 
        else if (requirement.includes("probabilityandstatisticsrequirement") || requirement.includes("mathematicsrequirement")) {
         setMathematicsData(prevData => [...prevData, ...(Array.isArray(data) ? data : [data])]);
        //   console.log("Mathematics data", mathematicsData);
         } else if (requirement.includes("basicsciencediscipline") || requirement.includes("basicand/orengineeringscience")) {
           setBasicScienceData(prevData => [...prevData, ...(Array.isArray(data) ? data : [data])]);
        //   console.log("Basic Science data", basicScienceData);
         } else if (requirement.includes("corerequirement") || requirement.includes("systemsrequirement") || requirement.includes("theoryandlanguagesrequirement") || requirement.includes("designrequirement") || requirement.includes("socialimplications")) {
           setComputerScienceData(prevData => [...prevData, ...(Array.isArray(data) ? data : [data])]);
        //   console.log("Computer Science data", computerScienceData);
         } 
        else if (requirement.includes("freeelective")) {
          setFreeElectivesData(data);
        }
        else {}

      });
    }
  }, [uploadedData]);




  return (
    <div className="mainEdit">
      <div className="editor-container">
        <IconButton
          className="back-button"
          aria-label="back to home"
          onClick={() => {
            console.log("back button clicked");
            navigate('/home');
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div className="editor-header">
          <Button
            variant="contained"
            type="submit"
            className="editor-button"
            sx={{ backgroundColor: 'purple', color: 'white' }}
            onClick={handleClearData}
          >
            Clear current data
          </Button>
          <FileUploadButton setUploadedData={setUploadedData} />
        </div>
      </div>

      <div className="AutoComplete">
        <CategoriesComboBox />
        <ClassComboBox />
      </div>

      <div className="tracking-sheet-container">
        <div className="column-1">
          <SimpleTable title="Humanities (6)" numInputs={6} clear={clearData} data={humanityData} />
          <SimpleTable title="Physical Education (4)" numInputs={4} clear={clearData} data={physicalEducationData} />
          <SimpleTable title="Social Science (2)" numInputs={2} clear={clearData} data={socialScienceData} />
          <SimpleTable title="IQP (3)" numInputs={3} clear={clearData} data={iqpData} />
          <SimpleTable title="Mathematics (7)" numInputs={7} clear={clearData} data={mathematicsData} />
        </div>
        <div className="column-2">
          <SimpleTable title="Free Electives (3)" numInputs={3} clear={clearData} data={freeElectivesData} />
          <SimpleTable title="Computer Science (18)" numInputs={18} clear={clearData} data={computerScienceData} />

          <SimpleTable title="Basic Science (5)" numInputs={5} clear={clearData} data={basicScienceData} />
        </div>
      </div>

      <Button
        variant="contained"
        type="submit"
        className="submit-button"
        sx={{ backgroundColor: 'purple', color: 'white' }}
        onClick={handleSaveData}
      >
        Save
      </Button>

    </div >

  );
};

export default Editor;
import React, { useState, useEffect} from "react";
import './App.css';
import TableCSVdata from "./TableCSVdata";
import TableResult from "./TableResult";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [title, setTitle] = useState();
  const [longestWorkDays, setLongestWorkDays] = useState();
  const [longestProjectId, setLongestProjectId] = useState(null);
  const [person1, setPerson1] = useState();
  const [person2, setPerson2 ] = useState();
  const [showTable, setShowTable] = useState(false);

  const fileReader = new FileReader();

  // WHEN THE FILE IS SELECTED FROM THE FOLDER
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  //TO CHECK IF THERE IS UPLOADED FILE - SET DIFFERENT TITLES AND TABLE/NO TABLE
  useEffect(() => {
    if(file) {
      if(longestWorkDays>0){
        let titleH2 = 'Here you can see the employees who worked thogether on a common project for the longest time'
        setTitle(titleH2);
        setShowTable(true);
      }else{
        let titleH = 'There is no match for employees who worked thogether on a common project'
        setTitle(titleH);
        setShowTable(false);
      }
    }
  }, [longestWorkDays]);

  //WHEN THE SELECTED FILE IS SUBMITED
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
        setFile(null) //AFTER READING A FILE, CLEAR AND SUBMIT BTN IS DISABLED
      };
      fileReader.readAsText(file);
    }
  };

  //MAKING THE CSV DATA TO ARRAY
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
    const csvRows = string.slice(string.indexOf("\r\n") + 1).split("\r\n");
    csvRows.pop(); //REMOVING THE LAST NEW LINE BECAUSE ITS SHOWING UNDEFINE AT LAST POSITION

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        if (header === "EmpID" || header === "ProjectID") {
          object[header] = +values[index]; //TO NUMBER
        } else {
          object[header] = values[index];
        }
        return object;
      }, {});
      return obj;
    });
    setLongestWorkDays(0); // WHEN NEW FILE IS UPLOADED TO MAKE LONGEST DAY TO 0 AND SET TITLE/ TABLE
    findLongestCoworkers(array);
    setArray(array);
  };

  // FUNCTION TO FIND IF THERE IS COMMON PROJECT AND FOR HOW LONG
  const findLongestCoworkers = (data) => {
    for (let i = 0; i < data.length; i++) {
      let projectID = data[i].ProjectID;
      for (let j = 0; j < data.length; j++) {
        if (i !== j && projectID === data[j].ProjectID) {
          let ymdFrom1 = data[i].DateFrom;
          let ymdTo1 = data[i].DateTo;
          let ymdFrom2 = data[j].DateFrom;
          let ymdTo2 = data[j].DateTo;

          let workingDaysThogether = daysWorkedTogether(
            ymdFrom1,
            ymdTo1,
            ymdFrom2,
            ymdTo2
          );
          if (workingDaysThogether > longestWorkDays) {
            setLongestWorkDays(workingDaysThogether);
            setLongestProjectId(projectID);
            setPerson1(data[i].EmpID);
            setPerson2(data[j].EmpID);
          }
        }
      }
    }
  };

  // FUNCTION TO CHEK THE WORKING DAYS TOGETHER
  const daysWorkedTogether = (from1, end1, from2, end2) => {
    const startDate1 = new Date(from1);
    const endDate1 = checkForNullDate(end1) ? new Date() : new Date(end1); 
    const startDate2 = new Date(from2);
    const endDate2 = checkForNullDate(end2) ? new Date() : new Date(end2); 

    const start = startDate1 < startDate2 ? startDate2 : startDate1; //TAKING THE BIGEST START DATE
    const end = endDate1 < endDate2 ? endDate1 : endDate2; // TAKING THE SMALEST END DATE
    if (end >= start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

   //CHEK IF DATE IS NULL TO RETURN TRUE
   const checkForNullDate = date => {
    return (!date || date === 'null' || date.trim() === "");
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div className="containerPage">
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        {/* BTN TO CHOOSE FILE FROM MY FOLDER */}
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        {/* CLICK IMPORT BTN TO READ THE CHOSEN FILE */}
        <button
          className="buttonSubmit"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      {/* THE RESULTS */}
      <br />
     <div className="resuldContainer">

      {/* RENDER THE HOLE CSV FILE */}
      <TableCSVdata 
      array= {array}
      headerKeys ={headerKeys}
      />

      <br />
      {/* SHOWING TITLE ONLY WHEN DATA IS DISPLAYED */}
      <h2> {title}</h2>

      {/* RENDER THE PAIR EMPLOYEES */}
      {showTable && <TableResult 
      person1 = {person1}
      person2 = {person2}
      longestProjectId = {longestProjectId}
      longestWorkDays = {longestWorkDays}
      />}
      
     </div>
    </div>
  );
}

export default App;
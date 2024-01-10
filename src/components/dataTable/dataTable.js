import React, { useState, useEffect } from "react";
import "./dataTable.css"; 
import {
  copperMineOneData,
  copperMineTwoData,
  copperMineThreeData,
  copperMineFourData, 
  copperMineFiveData,
  coalData, 
  ironMineOneData,
  ironMineTwoData
} from "../../constants";

function TableData(props) {
  const { selectedData, selectedSubMineData } = props; 
  const [tableColumns, setTableColumn] = useState("");
  const [tableDatas, setTableData] = useState("");

  function dataColumn(selctedFilter) { 
    let tableColumnList;
    if (selctedFilter === "copper") {
      if (selectedSubMineData === "copperMineOne") {
        tableColumnList = Object.keys(copperMineOneData[0]);
        setTableColumn(tableColumnList);
        setTableData(copperMineOneData);
      } else if (selectedSubMineData === "copperMineTwo") {
        tableColumnList = Object.keys(copperMineTwoData[0]);
        setTableColumn(tableColumnList);
        setTableData(copperMineTwoData);
      } else if (selectedSubMineData === "copperMineThree") {
        tableColumnList = Object.keys(copperMineThreeData[0]);
        setTableColumn(tableColumnList);
        setTableData(copperMineThreeData);
      } else if (selectedSubMineData === "copperMineFour") {
        tableColumnList = Object.keys(copperMineFourData[0]);
        setTableColumn(tableColumnList);
        setTableData(copperMineFourData);
      } else if (selectedSubMineData === "copperMineFive") {
        tableColumnList = Object.keys(copperMineFiveData[0]);
        setTableColumn(tableColumnList);
        setTableData(copperMineFiveData);
      }
    } else if (selctedFilter === "coal") {
      tableColumnList = Object.keys(coalData[0]);
      setTableColumn(tableColumnList);
      setTableData(coalData);
    } else if (selctedFilter === "iron") {
      if (selectedSubMineData === "ironMineOne") {
        tableColumnList = Object.keys(ironMineOneData[0]);
        setTableColumn(tableColumnList);
        setTableData(ironMineOneData);
      } else if (selectedSubMineData === "ironMineTwo") {
        tableColumnList = Object.keys(ironMineTwoData[0]);
        setTableColumn(tableColumnList);
        setTableData(ironMineTwoData);
      }  
    }
  }

  useEffect(() => {
    dataColumn(selectedData);
  }, [selectedData, selectedSubMineData]);

  return (
    <div className="col-xl-12 col-sm-12 mb-12">
      <div className="card dashboard text-white bg-primary o-hidden h-100">
        <table>
          <thead>
            <tr>
              {tableColumns &&
                tableColumns.map((element) => {
                  return <th scope="col">{element}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {tableDatas &&
              tableDatas.map((element, index) => {
                return (
                  <tr>
                    {tableColumns &&
                      tableColumns.map((element) => {
                        return (
                          <td data-label={element}>
                            {tableDatas[index][element]}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TableData;

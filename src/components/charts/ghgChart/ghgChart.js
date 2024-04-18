import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import {
  GHGDummyData,
  coalGhgData,
  copperMineOneGhgData,
  copperMineTwoGhgData,
  copperMineThreeGhgData,
  coalData,
  copperMineFourGhgData,
  copperMineFiveGhgData
} from "../../../constants";

var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function GhgChartComp(props) {
  const { selectedData, selectedSubMineData } = props;
  console.log(selectedSubMineData);
  const separatedChartTitle = selectedSubMineData.split(/(?=[A-Z])/);
  let firstWord = separatedChartTitle[0].charAt(0).toUpperCase() + separatedChartTitle[0].slice(1);
  separatedChartTitle[0] = firstWord;
  const chartTitle = separatedChartTitle.join(' ');
  const [tableOption, setTableOption] = useState("");
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
  }

  const getChartTitle = ()=>{
    const separatedChartTitle = selectedSubMineData.split(/(?=[A-Z])/);
    let chartTitle = separatedChartTitle.join(' ');
    if(selectedSubMineData === 'copperMineOne'){
      chartTitle = 'EGA Plant Al Taweelah';
    }else if(selectedSubMineData === 'copperMineTwo'){
      chartTitle = 'EGA Plant Jebel Ali';
    }else if(selectedSubMineData === 'copperMineThree'){
      chartTitle = 'GAC Mining';
    }
    return chartTitle;
  }

  const dataForGhg = (selectedData) => { 
    let ghgTable; 
    if (selectedData === "copper") {
      if (selectedSubMineData === "copperMineOne") {
        ghgTable = copperMineOneGhgData;
      } else if (selectedSubMineData === "copperMineTwo") {
        ghgTable = copperMineTwoGhgData;
      } else if (selectedSubMineData === "copperMineThree") {
        ghgTable = copperMineThreeGhgData;
      }
      else if (selectedSubMineData === "copperMineFour") {
        ghgTable = copperMineFourGhgData;

      } else if (selectedSubMineData === "copperMineFive") {
        ghgTable = copperMineFiveGhgData;

      }
    } else if (selectedData === "coal") {
        ghgTable = coalGhgData;
        
    } else if (selectedData === "iron") {
      if (selectedSubMineData === "ironMineOne") {
        ghgTable = copperMineThreeGhgData;
      } else if (selectedSubMineData === "ironMineTwo") {
        ghgTable = copperMineThreeGhgData;
      }
    } 
    const allYears = ghgTable.map((eachYears) => eachYears.Year);
    const ghgDataWIthOutYears = ghgTable.map((eachdata) => {
      let { Year, ...rest } = eachdata;
      return rest;
    });
    const allKeys = Object.keys(ghgDataWIthOutYears[0]); 
    const options = {
      title: {
				text: selectedData === 'coal' ? 'Coal Mine': getChartTitle(), 
			},
      animationEnabled: true,
      exportEnabled: false,
      axisY: {
        includeZero: true,
        suffix: "ktCo2e",
      },
      toolTip: {
        shared: true,
        reversed: true,
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        itemclick: toggleDataSeries,
      },
      data: allKeys.map((eacKey, keyIndex) => {
        return {
          type: "stackedColumn",
          name: allKeys[keyIndex].toString(),
          showInLegend: true,
          yValueFormatString: "#,###k",
          dataPoints: allYears.map((eachData, index) => {
            return {
              label: allYears[index].toString(),
              y: ghgDataWIthOutYears[index][allKeys[keyIndex]],
            };
          }),
        };
      }),
    };
    setTableOption(options);
  };

  useEffect(() => { 
    dataForGhg(selectedData);
  }, [selectedData,selectedSubMineData]);

  return (
    <div className="col-xl-12 col-sm-12 mb-12">
      <div className="card dashboard text-white bg-warning o-hidden h-100">
        <CanvasJSChart options = {tableOption} 
       //onRef={ref => this.chart = ref}
       />
      </div>
    </div>
  );
}

export default GhgChartComp;

import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import {
  trifDummyData,
  copperMineOneTrifData,
  copperMineTwoTrifData,
  copperMineFourTrifData,
  copperMineFiveTrifData,
  copperMineThreeData,
  coalData
} from "../../../constants";

var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function TrifChartComp(props) {
  const { selectedData, selectedSubMineData } = props;
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


  const dataForHazard = (selectedData) => {
    let hazarDousTable;
    if (selectedData === "copper") {
      if (selectedSubMineData === "copperMineOne") {
        hazarDousTable = copperMineOneTrifData;
      } else if (selectedSubMineData === "copperMineTwo") {
        hazarDousTable = copperMineTwoTrifData;
      } else if (selectedSubMineData === "copperMineThree") {
        hazarDousTable = copperMineThreeData; // To be replaced
      } else if (selectedSubMineData === "copperMineFour") {
        hazarDousTable = copperMineFourTrifData;
      } else if (selectedSubMineData === "copperMineFive") {
        hazarDousTable = copperMineFiveTrifData;
      }
    } else if (selectedData === "coal") {
      hazarDousTable = coalData;
      // } else if (selectedData === "iron") {
      //   if (selectedSubMineData === "ironMineOne") {
      //     hazarDousTable = copperMineThreehazarDousData;
      //   } else if (selectedSubMineData === "ironMineTwo") {
      //     hazarDousTable = copperMineThreehazarDousData;
      //   }
    }

    const allYears = hazarDousTable.map((eachYears) => eachYears.Year);
    const hazarDousDataWIthOutYears = hazarDousTable.map((eachdata) => {
      let { Year, ...rest } = eachdata;
      return rest;
    });
    const allKeys = Object.keys(hazarDousDataWIthOutYears[0]);
    const options = {
      title: {
				text: getChartTitle(), 
			},
      animationEnabled: true,
      exportEnabled: false,
      axisY: {
        includeZero: true,
        suffix: "",
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
              y: hazarDousDataWIthOutYears[index][allKeys[keyIndex]],
            };
          }),
        };
      }),
    };
    setTableOption(options);
  };

  useEffect(() => {
    dataForHazard(selectedData);
  }, [selectedData, selectedSubMineData]);

  return (
    <div className="col-xl-12 col-sm-12 mb-12">
      <div className="card dashboard text-white bg-warning o-hidden h-100">
        <CanvasJSChart
          options={tableOption}
          //onRef={ref => this.chart = ref}
        />
      </div>
    </div>
  );
}

export default TrifChartComp;

import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import {
  coalData,
  totalOpEnergyData,
  coalTotalOpData,
  copperMineOneTotalOpData,
  copperMineTwoTotalOpData,
  copperMineThreeTotalOpData,
  copperMineFourTotalOpData,
  copperMineFiveTotalOpData,
} from "../../../constants";

var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function TotalOpEnergyChartComp(props) {
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

  const dataForTotalOp = (selectedData) => {
    let totalOpTable;
    if (selectedData === "copper") {
      if (selectedSubMineData === "copperMineOne") {
        totalOpTable = copperMineOneTotalOpData;
      } else if (selectedSubMineData === "copperMineTwo") {
        totalOpTable = copperMineTwoTotalOpData;
      } else if (selectedSubMineData === "copperMineThree") {
        totalOpTable = copperMineThreeTotalOpData;
      } else if (selectedSubMineData === "copperMineFour") {
        totalOpTable = copperMineFourTotalOpData;
      } else if (selectedSubMineData === "copperMineFive") {
        totalOpTable = copperMineFiveTotalOpData;
      }
    } else if (selectedData === "coal") {
      totalOpTable = coalTotalOpData;
      // } else if (selectedData === "iron") {
      //   if (selectedSubMineData === "ironMineOne") {
      //     totalOpTable = copperMineThreetotalOpData;
      //   } else if (selectedSubMineData === "ironMineTwo") {
      //     totalOpTable = copperMineThreetotalOpData;
      //   }
    }

    const allYears = totalOpTable.map((eachYears) => eachYears.Year);
    const totalOpDataWIthOutYears = totalOpTable.map((eachdata) => {
      let { Year, ...rest } = eachdata;
      return rest;
    });
    const allKeys = Object.keys(totalOpDataWIthOutYears[0]);
    const options = {
      title: {
				text: getChartTitle(), 
			},
      animationEnabled: true,
      exportEnabled: false,
      axisY: {
        includeZero: true,
        suffix: "TJ",
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
              y: totalOpDataWIthOutYears[index][allKeys[keyIndex]],
            };
          }),
        };
      }),
    };
    setTableOption(options);
  };

  useEffect(() => {
    dataForTotalOp(selectedData);
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

export default TotalOpEnergyChartComp;

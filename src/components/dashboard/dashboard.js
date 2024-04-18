import React, { useState,useEffect,useRef } from "react";
import "./dashboard.css";
import logo from "../../img/logo.png";
import sitelogo from "../../img/sitelogo.jpg";
import egaLogo from "../../img/egaLogo.jpg";
import chatIcon from "../../img/chat.png";
import Loader from "../loader/loader";
import TableData from "../dataTable/dataTable";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Iframe from 'react-iframe'
import HazardAndnonHazardChartComp from "../charts/hazardAndnonHazardChart/hazardAndnonHazardChart";
import GhgChartComp from "../charts/ghgChart/ghgChart";
import TotalOpEnergyChartComp from "../charts/totalOpEnergyChart/totalOpEnergyChart";
import TrifChartComp from "../charts/trifChart/trifChart";

function Dashboard(props) {
  let url = ""; 
  const {shouldShowData, selectedData, selectedSubMineData,} = props;  
  const [showLoader, setShowLoader] = useState(false); 
  useEffect(()=>{ 
       },
   [selectedData,selectedSubMineData])
  return (
    <div className="right">
      <div className="tab-content">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-default fixed-top"
          id="mainNav"
        >
          <a className="navbar-brand" href={url}>
            <img src={sitelogo} data-retina="true" alt="" width="163" height="36" />
          </a>
          <h5>Transition to Zero Carbon Mine</h5>
          <div className="collapse navbar-collapse" id="navbarResponsive"></div>
        </nav>

        <div id="overview" className="tab-pane active"> 
          <div className={!showLoader && !shouldShowData ? "content withSpace": "content"}>
          {!showLoader && !shouldShowData ? (
            <>
            <img src={egaLogo} data-retina="true" alt="" width="450" height="156" style={{opacity:.5}} />
            <p>Please select filter from left panel to show data</p>
            </>
                  // <Loader />
                ) : (
          <Tabs>
            <TabList>
              {/* <Tab>Table View</Tab> */}
              <Tab>GHG Emission</Tab>
              <Tab>Hazardous -non Hazardous waste</Tab>
              <Tab>Total Op Energy</Tab>
              <Tab>TRIF</Tab>
            </TabList>
            <div className="content-wrapper">
              <div className="container">
               
                  <div className="row">
                  {/* <TabPanel> 
                    <TableData 
                    selectedData={selectedData} 
                    selectedSubMineData={selectedSubMineData}/>
                  </TabPanel> */}
                    <TabPanel> 
                      <GhgChartComp 
                      selectedData={selectedData} 
                      selectedSubMineData={selectedSubMineData} />
                    </TabPanel> 
                    <TabPanel> 
                      <HazardAndnonHazardChartComp 
                      selectedData={selectedData} 
                      selectedSubMineData={selectedSubMineData} />
                    </TabPanel> 
                    <TabPanel> 
                      <TotalOpEnergyChartComp 
                      selectedData={selectedData} 
                      selectedSubMineData={selectedSubMineData} />
                    </TabPanel> 
                    <TabPanel> 
                      <TrifChartComp 
                      selectedData={selectedData} 
                      selectedSubMineData={selectedSubMineData} />
                    </TabPanel> 
                    <div> 

{/* <Iframe url="https://www.google.com"
        width="640px"
        height="320px"
        id=""
        className=""
        referrerpolicy= {"strict-origin-when-cross-origin"}
        sandbox={["allow-same-origin", "allow-scripts"]}
        display="block"
        position="relative"/> */}
                    </div>
                  </div>
              </div>
            </div> 
          </Tabs>
            )}
          </div>
        </div>
      </div>
      {/* <a
        className="chat-bot"
        href="https://susmanager.streamlit.app/" target="_blank" rel="noreferrer" title="Get your query answered"
      >
        <img src={chatIcon} data-retina="true" alt="" width="80" height="80" />
      </a> */}
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import "./leftbar.css";

import imbLogo from "../../img/ibm_logo.png";
import { selectionOptions } from "../../constants";
import { useEffect } from "react";
function Leftbar(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const {setShowData,setSelectedData,setSelectedSubMineData} = props;
  /**
   * Main Menu Value Selection 
   * @param {*} ev 
   * @param {*} index 
   */
  const onValueChange = (selectedMainmenu, selectedMainmenuObj) => {
    setShowErr(false);
    setSelectedOption(selectedMainmenu);
  };

  
 /**
  * Sub Menu Value Selection 
  * @param {*} eachMineData 
  */
  const onSubmenuSelection = (eachMineData)=>{
    setSelectedSubmenu(eachMineData.value);
  }
  const formSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === "") {
      setShowErr(true);
      setShowData(false);
    } else {
      setShowErr(false);
      setShowData(true);
      setSelectedData(selectedOption);
      setSelectedSubMineData(selectedSubmenu);
      console.log(selectedSubmenu)
    }
  };

  useEffect(() => {
    selectedOption ? setShowSubMenu(true) : setShowSubMenu(false); 
  }, [selectedOption]);

   
  return (
    <>
      <div className="left" style={{ marginTop: "4%" }}>
        <form onSubmit={formSubmit}>
          <ul>
            <div className="card dashboard text-white bg-custom o-hidden h-100 custom-margin">
              <div className="card-body">
                <div className="mr-5">
                  <h5>Please choose the benchMark here</h5>
                </div>
              </div>
              <ul className="selectionOption">
                {selectionOptions.map((option, indx) => (
                  <>
                    <li>
                      <input
                        type="radio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={()=>onValueChange(option.value,option)}
                      />{" "}
                      {option.label}
                    </li>
                    {option.subMine &&
                      showSubMenu &&
                      selectedOption === option.value &&
                      option.subMine.map((eachmine) => (
                        <li className={eachmine.value === selectedSubmenu ? "subMenu selected":"subMenu"} onClick={()=>onSubmenuSelection(eachmine)}>{eachmine.label}</li>
                      ))}
                  </>
                ))}
              </ul>
              {showErr && <span className="err">Please select one option</span>}
              <span className="card-footer text-white clearfix small z-1">
                <button className="float-right">Submit</button>
              </span>
              
            <a className="chat-bot"
              href="https://susmanager.streamlit.app/" target="_blank" rel="noreferrer" title="Get your query answered"
              >Chat with Sustainability Assistant</a>
            </div>
          </ul>
        </form>

        <p className="btm_logo">
          <img src={imbLogo} alt="created by IBM" />
        </p>
      </div>
    </>
  );
}

export default Leftbar;

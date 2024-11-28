
import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import css
import "../styles/Instance_Services.css";
import "../styles/check.css";

//import images
import logo from "../images/azure-logo.jpg";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

 //for running a map function
 const keys = [...Array(10).keys()];

const Server = [
  "Azure ML",
  "Azure OpenAI Service ",
  "Azure AI Vision pricing",
  " Azure AI Search",
  " Azure Analysis Services",
  "HDInsight on AKS",
];
const Os = ["windows", "macos", "linux", "ubuntu"];

//ec2 instance
const azure_ml_ginstance = [
  "D2 v3",
  " D4 v3",
  "D8 v3",
  "D16 v3",
  "D32 v3",
  "D64 v3",
];
const azure_ml_dinstance = [
  "D2s v3",
  "D4s v3",
  "D8s v3",
  "D16s v3",
  "D32s v3",
  "D64s v3",
  "D1-5 v2",
];
//ec2 cpu
const azure_ml_vcpu = ["2 vcpu", "4 vcpu", "8 vcpu"];
//ec2 storage
const azure_ml_category = ["General purpose", "D2-64 v3"];

//rds_instance
const azure_openai_model = ["Realtime API", "Chat Completions API"];
//red_vcpu
const azure_openai_vcpu = ["2 vcpu", "4 vcpu", "8 vcpu"];
//rds_storage
const rds_storage = [
  "General Purpose SSD (gp2) - Storage",
  "General Purpose SSD (gp3) - Storage",
  "General Purpose SSD (gp3) - IOPS",
  "General Purpose SSD (gp3) - Throughput",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MultipleSelect = (props) => {
  const theme = useTheme();
  //props
  let { cloud } = props.cloud;

  const [service, setService] = React.useState("");
  const [os, setOs] = React.useState("");
  const [instance, setInstance] = React.useState("");
  const [vcpu, setVcpu] = React.useState("");
  const [storage,setStorage]=React.useState("");
  const [ram,setRam]=React.useState("")
  const [i1, setI1] = React.useState("");
  const [i2, setI2] = React.useState("");

  //type of instance assigning
  let Instance = [];
  let Vcpu = [];
  // let Storage = [];
  let Category = [];
  let I2 = [];
  let I1 = [];
  {
    if (service === "Azure ML") {
      Instance = azure_ml_category;
      Vcpu = azure_ml_vcpu;
      I1 = azure_ml_ginstance;
      I2 = azure_ml_dinstance;
    } else if (service === "Azure OpenAI Service ") {
      Instance = azure_openai_model;
      Vcpu = azure_openai_vcpu;
      //   Storage=[];
      I2 = [];
      I1 = [];
    }
  }

  const options = [
    { label: "Azure ML", value: "Azure ML" },
    { label: "Azure OpenAI Service ", value: "Azure OpenAI Service " },
    { label: "Azure AI Vision pricing", value: "Azure AI Vision pricing" },
    { label: "Azure AI Search", value: "Azure AI Search" },
    { label: "Azure Analysis Services", value: "Azure Analysis Services" },
    { label: "HDInsight on AKS", value: "HDInsight on AKS" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle the checkbox change
  const handleCheckboxChange = (e, value) => {
    if (e.target.checked) {
      setService(value)
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    }
  };

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container py-3 mt-5 border-primary container1">
        <div className="logo text-center my-2 ">
          <img
            src={logo}
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          ></img>
        </div>
        <div className="row  d-flex flex-row justify-content-center  py-2">
          <h3 className="text-center">
            {cloud === "AWS"
              ? `Aws Instances And Its Configurations`
              : `Azure Instances And Its Configurations`}
          </h3>
          <div className="col-12 col-ms-12 col-md-12 col-lg-4 ">
            <div className="instance ">
              <FormControl sx={{ m: 1, width: 300 }}>
                {/* <InputLabel id="demo-multiple-name-label">Server</InputLabel>
                <Select
                  className="w-100"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // multiple
                  value={server}
                  onChange={(e) => {
                    setServer(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {Server.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select> */}

                <div className="dropdown-container">
                  <div
                    className="dropdown-header w-100"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Select Service ({selectedOptions.length})
                  </div>

                  {dropdownOpen && (
                    <div className="dropdown-list">
                      {/* Search Input */}
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      {/* Checkboxes */}
                      <div className="checkbox-list">
                        {filteredOptions.map((option) => (
                          <label key={option.value} className="checkbox-item">
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={selectedOptions.includes(option.value)}
                              onChange={(e) =>
                                handleCheckboxChange(e, option.value)
                              }
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
            </div>
          </div>

          <div className="col-12 col-ms-12 col-md-12 col-lg-4 ">
            <div className="instance ">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="os">OS</InputLabel>
                <Select
                  className="w-100"
                  labelId="os"
                  id="demo-multiple-name"
                  // multiple
                  value={os}
                  onChange={(e) => {
                    setOs(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {Os.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-12 col-ms-12 col-md-12 col-lg-4 ">
            <div className="instance ">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">
                  {service === "Azure ML" ? "Instance Category" : "Select Model"}
                </InputLabel>
                <Select
                  className="w-100"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // multiple
                  value={instance}
                  onChange={(e) => {
                    setInstance(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {Instance.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="row  d-flex flex-row justify-content-center ">
          <div className="col-12 col-sm-12 col-md-12 col-xl-4 ">
            <div className="instance w-100">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Vcpu</InputLabel>
                <Select
                  className="w-100"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // multiple
                  value={vcpu}
                  onChange={(e) => {
                    setVcpu(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {Vcpu.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col-12 col-ms-12 col-md-12 col-lg-4 ">
            <div className="instance ">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Storage</InputLabel>
                <Select
                  className="w-100"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // multiple
                  value={storage}
                  onChange={(e) => {
                    setStorage(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {keys.map((key) => (
                    key !==0 && <MenuItem
                      key={key}
                      value={key*50}
                      // style={getStyles(name, personName, theme)}
                    >
                      {key*50}
                    </MenuItem>
                  
                    
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
           <div className='col-12 col-ms-12 col-md-12 col-lg-4 '><div className='instance '>
            <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Ram</InputLabel>
        <Select
          className='w-100'
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={ram}
          onChange={(e)=>setRam(e.target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {keys.map((key) => (
            key !==0 && 
            <MenuItem
              key={key}
              value={key*2}
              // style={getStyles(name, personName, theme)}
            >
              {key*2}
            </MenuItem>
          ))}
        </Select></FormControl>
        </div></div>
        </div> 


        {/* row -3  */}
        {/* <div className='row  d-flex flex-row justify-content-center '>
            <div className='col-12 col-ms-12 col-md-12 col-lg-4 '><div className='instance w-100'>
            <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Instance</InputLabel>
        <Select
          className='w-100'
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {Instances.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select></FormControl>
        </div></div>
            
            <div className='col-12 col-ms-12 col-md-12 col-lg-4 '><div className='instance '>
            <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Instance</InputLabel>
        <Select
          className='w-100'
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {Instances.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select></FormControl>
        </div></div>
            <div className='col-12 col-ms-12 col-md-12 col-lg-4 '><div className='instance '>
            <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Instance</InputLabel>
        <Select
          className='w-100'
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {Instances.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select></FormControl>
        </div></div>
          </div> */}
      </div>
    </>
  );
};
export default MultipleSelect;

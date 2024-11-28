// Dropdowns.js
import React, { useState } from "react";
import "../styles/calc.css"; // Importing CSS for styling
import Navbar from '../Layout/Navbar';


const Dropdowns = () => {
  const [configurations, setConfigurations] = useState({
    day: "",
    ram: 0,
    cpu: 0,
    storage: 0,
    access_type: "",
    public_ip: 0,
    lab_setup: "",
    no_of_servers: 0,
    no_of_days: 0,
});
//for running a map function
const keys = [...Array(10).keys()];

  const [ram_cost, setRam_cost] = useState(0);
  const [cpu_cost, setCpu_cost] = useState(0);
  const [ssd_cost, setSsd_cost] = useState(0)
  const [public_ip_cost, setPublic_ip_cost] = useState(0)
  // Handle change for each dropdown
  const handleCollectConfig = (e) => {
    e.preventDefault()
    setConfigurations(
      { ...configurations, [e.target.name]: e.target.value }
    )
    
    
  }; 
  const handle=(e)=>{
    e.preventDefault();
    console.log(e)
  }
  // let ram = 7.5;
  // let cpu = 40;
  // let ssd = 0.25;
  // let public_ip_charges = 1500;
  let lab_setup_cost = {
    Basic: 0,
    Intermediate: 4000,
    Security_Labs: 8000,
    Advanced_Labs: 10000,
    Infrastructure_Labs: 12000,
  }

    // calculateCost();
    const handleData = (event) => {
      event.preventDefault();
      const regex = '/([0-9]*[\.]{0,1}[0-9]{0,2})/s';
      // return value.match(regex)[0];
      if(Number(event.target.ram_cost.value)){setRam_cost(Number(event.target.ram_cost.value))}
      if(Number(event.target.cpu_cost.value)){setCpu_cost(Number(event.target.cpu_cost.value))}
      if(Number(event.target.ssd_cost.value)){setSsd_cost(Number(event.target.ssd_cost.value))}
      if(Number(event.target.public_ip_cost.value)){setPublic_ip_cost(Number(event.target.public_ip_cost.value))}
      
      
      
  
      // //callback function
      calculateCost();
    }

  const [total_cost, setTotal_cost] = useState(0);
  const calculateCost = () => {
    //server per day calculation
    let server_day_charges = Math.ceil(Number((configurations.ram) * ram_cost)+ (Number(configurations.cpu) * cpu_cost)+ (Number(configurations.storage) * ssd_cost));
    { (configurations.day === 'Half Day') ? (server_day_charges = server_day_charges - (server_day_charges * 0.3)) : server_day_charges = server_day_charges }
  
    ///  lab setup charges
    let config = '';
    {
      if (configurations.lab_setup === 'Basic') {
        config = lab_setup_cost.Basic
      }
      else if (configurations.lab_setup === 'Intermediate') {
        config = lab_setup_cost.Intermediate
      }
      else if (configurations.lab_setup === 'Security_Labs') {
        config = lab_setup_cost.Security_Labs
      }
      else if (configurations.lab_setup === 'Advanced_Labs') {
        config = lab_setup_cost.Advanced_Labs
      }
      else if (configurations.lab_setup === 'Infrastructure_Labs') {
        config = lab_setup_cost.Infrastructure_Labs
      }
    }

    let lab_setup_charges = Math.ceil(config);

    //public ip charges
    let public_ipcharges = configurations.public_ip * public_ip_cost;
    //server_cost_batch
    let server_cost_per_batch = Math.ceil(server_day_charges * (Number(configurations.no_of_servers) * Number(configurations.no_of_days)));
    
   
    setTotal_cost( lab_setup_charges  + public_ipcharges +  server_cost_per_batch);
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="container-fluid p-3 bg-light">
          <div className="row p-4 h6">
            <div className="col-sm-12 col-md-6 col-lg-6 col-12 d-flex justify-content-between flex-row flex-wrap border border-4 border-info p-4 rounded my-2">
              <div className="row w-100 ">
                <form  className="d-flex flex-row flex-wrap w-100" onSubmit={handle}>
                  <div className="col-sm-12 col-md-6 col-lg-6 col-12 w-40 px-2">
                    <div className="dropdown ">
                      <label htmlFor="dropdown1">Select Day</label>
                      <select
                        name="day"
                        id="dropdown1"
                        value={configurations.day}
                        onChange={handleCollectConfig}
                      >
                        <option value="">Select Day</option>
                        <option value="Full Day">Full Day</option>
                        <option value="Half Day">Half Day</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="dropdown2">Select Ram</label>
                      <select
                        name="ram"
                        id="dropdown2"
                        value={configurations.ram}
                        onChange={handleCollectConfig}
                      >
                        
                        {keys.map((item)=>(
                          item===0 ? <option value="">Select Ram</option> :
                          <option value={item*4}>{item*4}</option>))
                          }

                        {/* <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option> */}
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="dropdown3">Select Cpu</label>
                      <select
                        name="cpu"
                        id="dropdown3"
                        value={configurations.cpu}
                        onChange={handleCollectConfig}
                      >
                        {keys.map((item)=>(
                          item===0 ? <option value="">Select cpu</option> :
                          <option value={item*2}>{item*2}</option>))
                          }
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="dropdown3">Select Storage</label>
                      <select
                        name="storage"
                        id="dropdown3"
                        value={configurations.storage}
                        onChange={handleCollectConfig}
                      >
                        {keys.map((item)=>(
                          item===0 ? <option value="">Select Storage</option> :
                          <option value={item*50}>{item*50}</option>))
                          }
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 col-12 w-40 px-2  ">
                    <div className="dropdown ">
                      <label htmlFor="dropdown4">Select AccessType</label>
                      <select
                        name="access_type"
                        id="dropdown3"
                        value={configurations.access_type}
                        onChange={handleCollectConfig}
                      >
                        <option value="">Select AccessType</option>
                        <option value="Https"> Https</option>
                        <option value="RDP"> RDP</option>
                        <option value="VNC"> VNC</option>
                        <option value="VPN"> VPN</option>
                        <option value="Public Ip"> Public Ip</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="dropdown5">Select Public Ip</label>
                      <select
                        name="public_ip"
                        id="dropdown3"
                        value={configurations.public_ip}
                        onChange={handleCollectConfig}
                      >
                        <option value="">Select Public Ip</option>
                        <option value="0">N/A</option>
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="dropdown6">Select Lab Type</label>
                      <select
                        name="lab_setup"
                        id="dropdown3"
                        value={configurations.lab_setup}
                        onChange={handleCollectConfig}
                      >
                        <option value="">Select Lab Type</option>
                        <option value="Basic"> Basic</option>
                        <option value="Intermediate"> Intermediate</option>
                        <option value="Security_Labs"> Seurity</option>
                        <option value="Advanced_Labs"> Advanced Labs</option>
                        <option value="Infrastructure_Labs"> Infrastructure Labs</option>
                      </select>
                    </div>



                    <div className="dropdown">
                      <label htmlFor="dropdown7">Select No of servers</label>
                      <select
                        name="no_of_servers"
                        id="dropdown3"
                        value={configurations.no_of_servers}
                        onChange={handleCollectConfig}
                      >
                        {keys.map((item)=>(
                          item===0 ? <option value="">Select No of servers</option> :
                          <option value={item}>{item*1}</option>))
                          }
                      </select>
                    </div>

                    <div className="dropdown my-10">
                      <label htmlFor="dropdown8 ">Select No of days</label>
                      <select
                        name="no_of_days"
                        id="dropdown8"
                        value={configurations.no_of_days}
                        onChange={handleCollectConfig}
                      >
                        {keys.map((item)=>(
                          item===0 ? <option value="">Select No of days</option> :
                          <option value={item}>{item*1}</option>))
                          }
                      </select>
                    </div>
                    <div >
                   
                  </div>
                  
                  </div>
                  <div className="total cost text-center w-100"><h2 className=" my-2">Total cost:{total_cost}</h2>
                  <button type="submit" className="btn btn-primary mt-2">Confirm</button>
                  </div>
                </form>
              </div>





            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-12 p-4 d-flex justify-content-center ">
              <div className="input_data w-50 p-3  h6 border border-4 rounded border-info h-100">
                <form onSubmit={(e) => { handleData(e) }} >
                  <div className="form-group m-2">
                    <label for="ram_cost">Enter Ram Cost</label>
                    <input type="text" className="form-control" id="ram_cost" placeholder="Enter cost"
                    />
                  </div>
                  <div className="form-group m-2">
                    <label for="cpu_cost">Enter Cpu Cost</label>
                    <input type="text" className="form-control" id="cpu_cost" placeholder="Cpu Cost" />
                  </div>
                  <div className="form-group m-2">
                    <label for="ssd_cost">Enter SSD Cost</label>
                    <input type="text" className="form-control" id="ssd_cost" placeholder="Ssd Cost" />
                  </div>
                  <div className="form-group m-2">
                    <label for="public_ip_cost">Enter Ip cost</label>
                    <input type="text" className="form-control" id="public_ip_cost" placeholder="Public Ip Cost" />
                  </div>
                  <div className="text-center my-4"><button type="submit " className="btn btn-primary w-100">Total Cost</button></div>


                </form><h2 className="text-center my-2">Total cost:{total_cost}</h2>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>

  );
};

export default Dropdowns;

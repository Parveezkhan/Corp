import React from "react";

//import css
import "../styles/Catalog.css";
//import side nav component
import Side_Nav from "../Layout/Side_Nav.js";

//import icons
import { IoMdSettings } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrSystem } from "react-icons/gr";

//import images
import ec2 from '../images/ec2image.jpg'


const Catalog = () => {
  return (
    <>
      <Side_Nav />
      <div className="container catalog-container">
        <div className="catalog-information p-4">
          <div className="catalog-title m-4 text font-weight-bold text-primary">Amazon Elastic Cloud Computing</div>
          <div className="catalog-navigation my-4">
            Dashboard > Courses > Amazon Web > Services > Account-Lab
          </div>
          <div className="nav-settings d-flex ">
            <div className="configurations border border-2 mx-2  text-start">
             <img src={ec2} alt="" style={{ height:"150px"}} className=" w-100"></img>
             <div className="p-2">
             <h3>Configurations for EC2</h3>
              <p><span>EC2 Instance</span>: tb.micro</p>
              <p><span>Operating System</span>: Windows </p>
              <p><span>Ram</span>: 4 GiB</p>
              <p><span>Storage</span>: 100 GB</p>
             </div>
              
            </div>
          <div className="lab-details justify-content-center  p-3  border border-2 d-flex justify-content-between mx-2">
            {/* <div className="icon"><GrSystem /></div> */}
            <div className="d-flex  flex-column align-items-center">
            <div className="title"><span className="m-2"><GrSystem /></span>Amazon Elastic Cloud Computing</div>
            <div className="start-btn text-center"><button className="btn btn-success m-2" style={{width:'100px'}}>Start</button></div>

            </div>
            
            <div className="catalog-settings">
          <IoMdSettings /><RiArrowDropDownLine />
          </div>
        </div>
          
          </div>
          
        </div>
        

      </div>
    </>
  );
};

export default Catalog;

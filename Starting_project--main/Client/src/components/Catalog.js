import React,{useEffect, useState} from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";

//import css
import "../styles/Catalog.css";
//import side nav component
import Side_Nav from "../Layout/Side_Nav.js";

//import icons
import { IoMdSettings } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrSystem } from "react-icons/gr";

//import images
import ec2 from "../images/ec2image.jpg";

const Catalog = () => {
  const [cardData , setCardData] = useState();
  const [awsConfigIds,setawsConfigIds] = useState([]);
  const [configurations,setConfigurations] = useState([]);

  let params = useParams();
  useEffect(() => {
    const get = async () => {
      try {
        const cats = await axios.get(`http://localhost:5000/api/services/awsCatalog/${params.id}`);
        const serviceAwsData = cats.data.getCatalogs.serviceAws;
        
        setCardData(serviceAwsData);  // Set card data with serviceAws
        // Map through serviceAwsData to get configuration ids
        const ids = serviceAwsData.map((service) => service.id);
        setawsConfigIds(ids);  // Set awsConfigIds with the ids from the serviceAws data
        const getConfigurations = await axios.post('http://localhost:5000/api/services/awsConfigArray',

          {ids}
        )
        setConfigurations(getConfigurations.data.data);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    get();
  }, []);
  // useEffect(()=>{
  //   const configArray=async ()=>{
  //     try{
  //       const getConfigurations = await axios.post('http://localhost:5000/api/services/awsConfigArray',

  //         {awsConfigIds}
  //       )
  //       console.log(getConfigurations)
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
      
  //   }
  //   configArray();
    
  // },[])
  return (
   <>
      <Side_Nav />
      <div className="container catalog-container">
        <div className="catalog-information p-4">
          <div className="catalog-title m-4 text font-weight-bold text-primary">
            Amazon Web Services
          </div>
          <div className="catalog-navigation my-4">
            Dashboard > Courses > Amazon Web > Services > Account-Lab
          </div>
          <div className="nav-settings d-flex ">
          {/* <h2>{configurations.catalogName}</h2> */}
            <div className="card configurations border border-2 mx-2  text-start">
              
              {configurations.map((service)=>(
                <>
                <img class="card-img-top img-fluid " src={ec2} alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">Configurations for {service.service}</h5>
                  <p class="card-text">
                    <span>{service.service} Instance</span>: {service.instance}
                  </p>
                  <p className="card-text">
                    <span>Operating System</span>: {service.os}
                  </p>
                  <p className="card-text">
                    <span>Ram</span>:  {service.ram}
                  </p>
                  <p className="card-text">
                    <span>Storage</span>: {service.storage}
                  </p>
                </div></>
                
              ))
              }
              
              {/* <div className="p-2">
             <h3>Configurations for EC2</h3>
              <p><span>EC2 Instance</span>: tb.micro</p>
              <p><span>Operating System</span>: Windows </p>
              <p><span>Ram</span>: 4 GiB</p>
              <p><span>Storage</span>: 100 GB</p>
             </div> */}
            </div>
            <div className="lab-details justify-content-center  p-3  border border-2 d-flex justify-content-between mx-2">
              {/* <div className="icon"><GrSystem /></div> */}
              <div className="d-flex  flex-column align-items-center">
                <div className="title">
                  <span className="m-2">
                    <GrSystem />
                  </span>
                  Amazon Elastic Cloud Computing
                </div>
                <div className="start-btn text-center">
                  <button
                    className="btn btn-success m-2"
                    style={{ width: "100px" }}
                    onClick={handleService}
                  >
                    Start
                  </button>
                </div>
              </div>

              <div className="catalog-settings">
                <IoMdSettings />
                <RiArrowDropDownLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;

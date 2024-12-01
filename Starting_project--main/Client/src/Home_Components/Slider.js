import React from 'react'


//import images

import logo from "../images/Logo...png"
import image from "../images/cloud1.webp"

const Slider = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide carosel " data-ride="carousel">
            <div className="carousel-inner w-60 h-40">
              <div className="carousel-item active inner-carosel">
                <img className="d-block w-100 h-100" src={logo} alt="First slide"/>
              </div>
              <div className="carousel-item inner-carosel" >
                <img className="d-block w-100 h-100" src={image} alt="Second slide"  />
              </div>
              
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
              {/* <span className="sr-only">Previous</span> */}
             </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span> 
               {/* <span class="sr-only">Next</span> */}
             </a>   
          </div>
  )
}

export default Slider
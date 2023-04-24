import './App.css';
import React, { useState, useEffect} from 'react';

import { Card, Row, Col, Container } from 'react-bootstrap';
import { BsThermometerHalf, BsMoisture, BsClock } from 'react-icons/bs';


function App() {

  function fetchLatestData() {

    fetch("./data.json", {cache: "no-store"})
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayDataHome(data);
        // if(carouselHum && carouselTemp) {
        //   displayDataHumPic(data, carouselHum);
        //   displayDataTempPic(data, carouselTemp)
        //   } 
      })
      .catch(function (err) {
        console.log('error:' +err);
      })
      
      
  }
  
  
  function displayDataHome(jsonData)
  {
    //let mainContainer = document.getElementById("sensor_data");
    
    for (let element in jsonData)
    {
      
      
      let dataParagraph = document.getElementById(element)
      dataParagraph.classList.add("fs-4")
      dataParagraph.classList.add("text-primary-emphasis")
      
      if (element === "temp_c" || element === "temp_f")
      {
        dataParagraph.innerHTML = `${jsonData[element]}&#176;`
      }
      
      else if (element === "humidity")
      {
        dataParagraph.innerHTML = `${jsonData[element]}%`
      }
      
      else
      {
        const timeArray = jsonData[element].split(" ")
        dataParagraph.innerHTML = `Date: ${timeArray[0]} <br> Time: ${timeArray[1]}`
      }
      
    }
  }

  if (/*carouselHum && carouselTemp ||*/ window.location.href.endsWith("/index.html"))
  {
	
	setInterval(fetchLatestData, 5000);
	
  }


  return (
    /*<Container>
    <Row className="py-5 bg-dark">
    <Col>
    <Card className="shadow rounded-pill">
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          <BsThermometerHalf />
          Temperature (&#176;C)
        </Card.Title>
        <div className="d-flex justify-content-center align-items-center">	
          <p id="temp_c"></p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col>
    <Card className="shadow rounded-pill">
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          <BsThermometerHalf />
          Temperature (&#176;F)
        </Card.Title>
        <div className="d-flex justify-content-center align-items-center">	
          <p id="temp_f"></p>
          <p></p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col>
    <Card className="shadow rounded-pill">
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          <BsMoisture />
          &nbsp; Humidity
        </Card.Title>
        <div className="card-text d-flex justify-content-center align-items-center">	
          <p id="humidity"></p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col>
    <Card className="shadow rounded-pill">
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          <BsClock />
          &nbsp; Last Update
        </Card.Title>
        <div className="d-flex justify-content-center align-items-center">	
          <p id="date"></p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  </Row>
  </Container>*/

  <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Album example</h1>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    
  );
}

export default App;

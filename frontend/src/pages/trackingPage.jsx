import React, { useState } from 'react'
import Navbar from "../components/NavbarTracking"
import ApplicationFormModal from '../components/ApplicationFormModal';
import {Container, Row, Col, Button, Badge} from "react-bootstrap"
import testData from "../data"
import "../trackingPage.css"
import moment from 'moment';

export default function Tracking() {


  const [selectedTerm, setSelectedTerm] = useState(null)
  const [terms, setTerms] = useState(testData)
  const [showModal, setShowModal] = useState(false);

  const handleStatus = (status) => {
    var badgeBg = "primary"
    if (status === "Rejected") {
      badgeBg = "danger"
    }
    else if (status === "Interview") {
      badgeBg = "warning"
    }

    else if (status === "Offer Accepted") {
      badgeBg = "success"
    }

    return <Badge className='fw-normal' bg={badgeBg}>{status}</Badge>
  }

  const handleTerm = termName => {
    setSelectedTerm(termName)
  }
  
  const handleNewTerm = () => {
    var newIndex = terms.length + 1;
    const newTerm = { term_name: `Term ${newIndex}`, applications: [] };
    setTerms([newTerm, ...terms]);
    setSelectedTerm(`Term ${newIndex}`);
  };


  const handleAddApplication = (newApplication) => {
    // Find the current term in the terms array
    const updatedTerms = terms.map((term) => {
      if (term.term_name === selectedTerm) {
        // Update the applications for the current term
        return {
          ...term,
          applications: [newApplication, ...term.applications],
        };
      }
      return term;
    });

    // Update the state with the modified terms array
    setTerms(updatedTerms);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const calculateTimeDifference = (applicationDate) => {
    const now = moment();
    const appliedDate = moment(applicationDate);
    const daysAgo = now.diff(appliedDate, 'days');

    if (daysAgo === 0) {
      return `Applied today`
    }

    return `Applied ${daysAgo} days ago`;
  };

  return (
    <div>
        {/* Navbar */}
        <Navbar />

        {/* Main Contents */}
        <Container fluid>
          <Row>
            {/* Sidebar */}
            <Col xs={2} className="bg-primary text-white" style={{minHeight: "100vh", minWidth:"200px", }}>
              <ul style={{listStyle: "none", margin: "0", padding: "0"}}>

                {terms.map(term => (
                  <li key={term.term_name} onClick={()=>handleTerm(term.term_name)} 
                  className="term" style={{backgroundColor: selectedTerm === term.term_name ? 'rgba(0, 0, 0, 0.5)' : ''}}> 
                  {term.term_name}

                  {selectedTerm === term.term_name && (
                    <span style={{ fontSize: '20px', cursor: 'pointer'}}>
                      ...
                    </span>)}
                </li>
                ))}
              {/* Add new terms */}
              <li className="term" onClick={handleNewTerm}>Add new term <span>+</span></li>
              </ul>
              
            </Col>

            {/* Applications for that term */}
            <Col>
              <Container fluid>
              {terms.filter((term) => term.term_name === selectedTerm).map((term) => (
                term.applications.map((application, index) => (
                  
                  <Row className='pt-3'>
                    <hr></hr>
                    {/* Image */}
                    <Col className="text-center">
                      <img width="50px" src={application.logo} alt="" />
                    </Col>

                    {/* Application Details */}
                    <Col xs={8} className='m-auto'>
                      <h5>{application.role} </h5> 
                      <small className="text-body-secondary">
                      {application.company}</small>
                      <br />
                      <small>{calculateTimeDifference(application.date)}</small> {handleStatus(application.status)}
                    
                    </Col>

                    {/* Update status button */}
                    <Col>
                      <Button variant="primary">Update Status</Button>
                    </Col>
                  </Row>
                ))
              ))}

              {/* Add new applications */}
              <hr/>
              <Button className="float-end" onClick={handleShowModal}>Add new application <span>+</span></Button>

              {/* Application Form Modal */}
              <ApplicationFormModal
                showModal={showModal}
                handleClose={handleCloseModal}
                onAddApplication={handleAddApplication}
              />

              </Container>
   
            </Col>
            

          </Row>
        </Container>
    </div>
  )

}

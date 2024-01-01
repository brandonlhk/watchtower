import React, { useState } from 'react'
import Navbar from "../components/NavbarTracking"
import ApplicationFormModal from '../components/ApplicationFormModal';
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import testData from "../data"
import "../trackingPage.css"
import moment from 'moment';

export default function Tracking() {


  const [selectedTerm, setSelectedTerm] = useState(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [terms, setTerms] = useState(testData)
  const [showModal, setShowModal] = useState(false);

  const handleTerm = termName => {
    setSelectedTerm(termName)
    setMenuOpen(false)
  }
  
  const handleNewTerm = () => {
    var newIndex = terms.length + 1;
    const newTerm = { term_name: `Term ${newIndex}`, applications: [] };
    setTerms([...terms, newTerm]);
    setSelectedTerm(`Term ${newIndex}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleAddApplication = (newApplication) => {
    // Find the current term in the terms array
    const updatedTerms = terms.map((term) => {
      if (term.term_name === selectedTerm) {
        // Update the applications for the current term
        return {
          ...term,
          applications: [...term.applications, newApplication],
        };
      }
      return term;
    });

    // Update the state with the modified terms array
    setTerms(updatedTerms);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleRename = () => {
    console.log("rename term", selectedTerm)
  }

  const handleDelete = () => {
    console.log("delete term", selectedTerm)
  }

  const calculateTimeDifference = (applicationDate) => {
    const now = moment();
    const appliedDate = moment(applicationDate);
    const daysAgo = now.diff(appliedDate, 'days');
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
                    <span style={{ fontSize: '20px', cursor: 'pointer'}} onClick={toggleMenu}>
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
              <ul>
                  {terms.filter((term) => term.term_name === selectedTerm).map((term) => (
                    term.applications.map((application, index) => (
                      <li key={index}>
                        <p>Company: {application.company}</p>
                        <p>{application.role}</p>
                        <p>{calculateTimeDifference(application.date)}</p>
                        <p>Status: {application.status}</p>
                      </li>
                    ))
                  ))}

                  {/* Add new applications */}
                  {}
                <hr style={{marginTop: "20px"}}/>
              <Button className="float-end" onClick={handleShowModal}>Add new application <span>+</span></Button>
              {/* Application Form Modal */}
              <ApplicationFormModal
                showModal={showModal}
                handleClose={handleCloseModal}
                onAddApplication={handleAddApplication}
              />
              </ul>
            </Col>
            

          </Row>
        </Container>
    </div>
  )

}

import React, { useState } from 'react'
import Navbar from "../components/NavbarTracking"
import ApplicationFormModal from '../components/ApplicationFormModal';
import UpdateApplicationModal from "../components/UpdateApplicationModal"
import {Container, Row, Col, Button, Badge} from "react-bootstrap"
import testData from "../data"
import "../trackingPage.css"
import moment from 'moment';
import Bin from "../images/bin.png"


export default function Tracking() {


  const [selectedTerm, setSelectedTerm] = useState(null)
  const [terms, setTerms] = useState(testData)
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleStatus = (status) => {
    var badgeBg = "primary"
    if (status === "Rejected" || status === "Offer Rejected") {
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

  // add applications
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

  // update applications
  const handleUpdateApplication = (updatedApplication) => {
    // Update the application with the given ID
    const updatedTerms = terms.map((term) => ({
      ...term,
      applications: term.applications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      ),
    }));
  
    setTerms(updatedTerms);
  
    // If applications are stored in a database, send an update request to the server
    // axios.put(`/api/applications/${updatedApplication.id}`, updatedApplication).then(() => console.log('Application updated'));
  
    // Close the update modal
    handleCloseUpdateModal();
  };

  const handleDeleteApplication = (applicationId) => {
    const updatedTerms = terms.map((term) => ({
      ...term, 
      applications: term.applications.filter((app) => app.id !== applicationId)
    }))

    setTerms(updatedTerms)
      // If applications are stored in a database, send a delete request to the server
      // axios.delete(`/api/applications/${applicationId}`).then(() => console.log('Deleted'));

  }

  // add application modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  // update modal
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    // Clear the selected application when the modal is closed
    setSelectedApplication(null);
  };

  const calculateTimeDifference = (applicationDate) => {
    const now = moment();
    const appliedDate = moment(applicationDate, "YYYY-MM-DD");
    const daysAgo = now.diff(appliedDate, 'days');
    
    return daysAgo === 0 ? "Applied today" : `Applied ${daysAgo} days ago`;
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
                    <Col xs={2} className="border" style={{maxWidth: "128px"}}>
                      <img src={application.logo} alt="" style={{ width: '100%', objectFit: 'contain' }}/>
                    </Col>

                    {/* Application Details */}
                    <Col xs={8} className='border'>
                      <h5>{application.role} </h5> 
                      <small className="text-body-secondary">
                      {application.company}</small>
                      <br />
                      <small>{calculateTimeDifference(application.date)}</small> {handleStatus(application.status)}
                    
                    </Col>

                    {/* Update status button */}
                    <Col xs={2} className='border'>
                      <Button variant="outline-primary" 
                      onClick={() => {
                        setSelectedApplication(application)
                        handleShowUpdateModal()}}>Update Application</Button>

                      <Button variant="link" 
                      onClick={() => 
                      handleDeleteApplication(application.id)}>
                        <img src={Bin} alt="" className="bin" style={{width: "25px"}}/></Button>
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

              {/* Update Form Modal */}
              <UpdateApplicationModal
              showModal={showUpdateModal}
              handleClose={handleCloseUpdateModal}
              onUpdateApplication={handleUpdateApplication}
              selectedApplication={selectedApplication}
            />
              </Container>
   
            </Col>
            

          </Row>
        </Container>
    </div>
  )

}

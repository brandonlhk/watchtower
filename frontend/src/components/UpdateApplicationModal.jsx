import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import {v1 as uuidv1} from "uuid"

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function UpdateApplicationModal({ showModal, handleClose, onUpdateApplication, selectedApplication }) {
  const [newApplication, setNewApplication] = useState({
    id: selectedApplication.id,
    company: selectedApplication.company,
    role: selectedApplication.role,
    date: selectedApplication.date,
    status: selectedApplication.status,
    logo: selectedApplication.logo
  });

  const [autocompleteOptions, setAutocompleteOptions] = useState([]);


  useEffect(() => {
    // Fetch autocomplete options when the component mounts
    fetchAutocompleteOptions(newApplication.company);

    // Set the initial status to "Applied" if it's an empty string
    if (!newApplication.status) {
      setNewApplication((prevApplication) => ({
        ...prevApplication,
        status: 'Applied',
      }));
    }
  }, [newApplication.company, newApplication.status]);

  const fetchAutocompleteOptions = async (query) => {
    try {
      // Make a request to the Clearbit API to get company suggestions
      const response = await axios.get('https://autocomplete.clearbit.com/v1/companies/suggest', {
        params: {
          query
        },
      });

      // Extract company names from the API response
      const companies = response.data.map((company) => ({
        name: company.name,
        logo: company.logo
      }));

      // Update autocomplete options
      setAutocompleteOptions(companies);
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the company name in the state
    setNewApplication((prevApplication) => ({ ...prevApplication, [name]: value }));
  };

  const handleAutocompleteOptionClick = (company) => {
    // Find the selected company in the autocompleteOptions array
    const selectedCompany = autocompleteOptions.find((option) => option.name === company);
  
    // Update the application state with the selected company information
    setNewApplication((prevApplication) => ({
      ...prevApplication,
      company: selectedCompany.name,
      logo: selectedCompany.logo,
    }));
  
    // Close the autocomplete options
    setAutocompleteOptions([]);
  };
  

  const handleUpdateApplication  = () => {
    // Log the date to check its format
    console.log("App Date:", newApplication.date);
  
    // Call the onAddApplication function with the newApplication
    onUpdateApplication(updatedApplication);
  
    // Reset the form state
    setNewApplication({
      id:  uuidv1(),
      company: '',
      role: '',
      date: getCurrentDate(),
      status: '',
      logo: ''
    });
  
    // Close the modal
    handleClose();
  };
  

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Company */}
          <Form.Group controlId="company" className="mb-3">
            <FloatingLabel controlId="company" label="Company">
              <Form.Control
                type="text"
                placeholder="Enter company name"
                name="company"
                value={newApplication.company}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            {/* Display the autocomplete options as a list */}
            {autocompleteOptions.length > 0 && newApplication.company.length > 0 && (
              <ListGroup className="autocomplete-options shadow"     style={{
                position: 'absolute',
                width: '94%',
                zIndex: '100',
                maxHeight: '200px',
                overflowY: 'auto',
              }}>
                {autocompleteOptions.map((company, index) => (
                  <ListGroup.Item key={index} onClick={() => handleAutocompleteOptionClick(company.name)} style={{textWrap: "wrap"}}>
                    <img src={company.logo} alt="" width="50px" className="me-3"/>
                    <span >{company.name}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form.Group>
          {/* Role */}
          <Form.Group controlId="role" className="mb-3">
            <FloatingLabel controlId="role" label="Role">
              <Form.Control
                type="text"
                placeholder="Enter role"
                name="role"
                value={newApplication.role}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
          {/* Application Date */}
          <Form.Group controlId="date" className="mb-3">
            <FloatingLabel controlId="date" label="Application Date">
              <Form.Control
                type="Date"
                placeholder="Enter application date"
                name="date"
                value={newApplication.date}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>
          {/* Status */}
          <Form.Group controlId="status" className="mb-3">
            <FloatingLabel controlId="status" label="Status">
              <Form.Select
                name="status"
                value={newApplication.status}
                onChange={handleInputChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer Accepted">Offer Accepted</option>
                <option value="Offer Rejected">Offer Rejected</option>
                <option value="Rejected">Application Rejected</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddApplication}>
          Add Application
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

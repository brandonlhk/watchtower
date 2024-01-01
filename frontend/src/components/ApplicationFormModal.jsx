import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

export default function ApplicationFormModal({ showModal, handleClose, onAddApplication }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [appDate, setAppDate] = useState("");
  const [status, setStatus] = useState('');

  const handleAddApplication = () => {
    if (!company || !role || !appDate || !status) {
      alert('Please fill in all required fields.');
      return;
    }

    const newApplication = {
      company,
      role,
      appDate,
      status,
    };

    onAddApplication(newApplication);

    // Clear the form fields
    setCompany('');
    setRole('');
    setAppDate('');
    setStatus('');

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
          <Form.Group controlId="formCompany" className="mb-4">
            <FloatingLabel controlId="formCompany" label="Company">
              <Form.Control type="text" value={company} placeholder="" onChange={(e) => setCompany(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formRole" className="mb-4">
            <FloatingLabel controlId="formRole" label="Role">
              <Form.Control type="text" value={role} placeholder="" onChange={(e) => setRole(e.target.value)} />
            </FloatingLabel>

          </Form.Group>
          <Form.Group controlId="formAppDate" className="mb-4">
            <FloatingLabel controlId="formAppDate" label="Application Date">
              <Form.Control type="text" value={appDate} placeholder="" onChange={(e) => setAppDate(e.target.value)} />
            </FloatingLabel>

          </Form.Group>
          <Form.Group controlId="formStatus">
            <FloatingLabel controlId="formAppDate" label="Status">
              <Form.Control type="text" value={status} placeholder="" onChange={(e) => setStatus(e.target.value)} />
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

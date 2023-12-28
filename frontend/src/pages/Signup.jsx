import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from "../components/Navbar"
import SignupImg from "../images/signup.jpg"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Signup() {
    return (
        <div>
            {/* Navbar */}
            <Navbar/>

            {/* Content */}
            <Row>
                {/* Image */}
                <Col><img src={SignupImg} alt="" className="img-fluid"/></Col>
                {/* Form */}
                <Col>

                </Col>
            </Row>
        </div>
    )
}
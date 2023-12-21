import React from "react"
import Navbar from '../components/Navbar'
import heroImage from "../images/hero_image.jpg"
import mockUp from "../images/device_mockup.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../landingPage.css'

export default function Landing() {
    return (
        <div>
            {/* Navbar */}
            <Navbar/>

            {/* Hero Image */}
            <div className='landingContainer position-relative'>
                <div className="imageWrapper">
                    <img src={heroImage} alt='' className='img-fluid heroImage'/>
                </div>
                <div className='overlayText position-absolute bottom-0 start-0 p-5'>
                    <h3>Track your internship and job applications across multiple platforms all onto one place</h3>
                </div>
            </div>

            {/* About content */}
            <div>
                <h1 className='text-center mt-3 mb-4'>What is WatchTower?</h1>

                {/* Content */}
                <Container>
                    <Row gap="3">
                        <Col></Col>
                        <Col sm={4} className='me-5'><img src={mockUp} alt="" className='img-fluid mockup'/></Col>
                        <Col sm={4} style={{fontSize: "25px"}}><p>We understand the frustrations of internship & job searching and we aim to lessen that pain! WatchTower helps keep track of your application statuses, interviews and remind you when you would receive news of your application!</p>
                        <br />
                        
                        <p>Application, interviews, acceptance and rejection... WatchTower can handle all!</p></Col>
                        <Col></Col>
                    </Row>

                    {/* Sign up */}
                    <Row className="mt-3">
                        <Col></Col>
                        <Col sm={8} className="text-center" style={{fontSize: "20px"}}><p>Don’t have an account yet? Sign up to start tracking your applications - it’s free!</p></Col>
                        <Col></Col>
                    </Row>
                    {/* Sign up button */}
                    <Row className="mb-5">
                        <Col></Col>
                        <Col sm={8} className="text-center"><Button className="px-5" href="signup">Sign up</Button></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}
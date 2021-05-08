import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const Footer = () =>
{
    return (
        <footer style={{ marginTop: 10, background: '#c60062' }}>
            <Navbar variant="dark">
                <Container>
                    <Row style={{ width: '100%' }}>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Contact Details</Navbar.Brand>
                            <ul>
                                <li style={{ color: 'white' }}>
                                    Email: contact@ishmishdreams.com
                                </li>
                                <li style={{ color: 'white' }}>
                                    Phone: +91 9911 000 989
                                </li>
                            </ul>
                        </Col>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Privacy Policy</Navbar.Brand>
                            <ul>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/privacypolicy">Privacy Policy</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/returnpolicy">CANCELLATIONS, RETURNS & REFUNDS</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/termsandconditions">Terms and Conditions</Nav.Link>
                                </li>
                            </ul>
                        </Col>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Social Media Links</Navbar.Brand>
                            <ul>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://www.facebook.com/Ishmishdreams-105303715005678">Facebook</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://www.instagram.com/ishmishdreams/">Instagram</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://wa.me/919911000989">Whatsapp</Nav.Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Navbar>

            <Navbar bg="dark" variant="dark">
                <Col style={{ color: 'white' }} className='text-center py-3'>
                    Copyright &copy; IshMishDreams <br />
                    <a href="https://slanzapanika.com" style={{ color: 'white', textTransform: 'capitalize' }}>Designed & Developed By: Darshan (SlanzApanika) </a>
                </Col>
            </Navbar>
        </footer>
    )
}

export default Footer

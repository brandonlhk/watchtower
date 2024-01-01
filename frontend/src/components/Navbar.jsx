import branding from '../images/watchtower_nobackground.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Header() {
    return (
        <Navbar className='shadow-sm bg-light' sticky="top">
        <Container fluid className="mx-4">
          <Navbar.Brand href="#home">
            <img
              src={branding}
              width="200"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          {/* Show if its button or profile picture */}
          <Button className='px-5' href='#test'>Login</Button>
        </Container>
      </Navbar>
    )
}
import branding from '../images/watchtower_nobackground.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Header() {
    return (
        <Navbar className='shadow-sm p-3 mb-5'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={branding}
              width="200"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Button className='px-5' href='#test'>Login</Button>
        </Container>
      </Navbar>
    )
}
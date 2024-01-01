import branding from '../images/watchtower_nobackground.png'
import { Dropdown, Image, Navbar, Container } from 'react-bootstrap';
import '../profileDropdown.css'

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
          <Dropdown>
            
            <Dropdown.Toggle id="profile-dropdown" variant="link" className="profile-dropdown-toggle">
              <Image
                src="https://via.placeholder.com/150" // Replace with the actual URL of your profile image
                roundedCircle
                style={{ width: '60px', height: '60px' }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
            
          </Dropdown>

        </Container>
      </Navbar>
    )
}
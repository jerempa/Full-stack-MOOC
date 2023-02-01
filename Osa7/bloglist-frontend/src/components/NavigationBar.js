import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const NavigationBar = () => {
    const padding = {
        padding: 5
      }
    return (
        // <Link style={padding} to="/">blogs</Link>
        // <Link style={padding} to="/users">users</Link>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">users</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar> 
    )
}

export default NavigationBar
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Menu() {
    return (
        <Navbar>
            <Container>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/usuarios">Usuarios</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Operações" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/batepapo">Batepapo</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
import React, { useContext } from 'react'
import { Link } from '@reach/router'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Context } from '../../Context'
import { LogoutButtonComponent, LoginButtonComponent } from '../../components/login/logout'

function Header(){
    const { isAuth, nombre, username } = useContext(Context)

    return <Navbar bg="white" expand="lg" className="hola">
    <Link to="/" className="navbar-brand text-primary">TweetMe</Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Link to="/" className="nav-link">Home</Link>
        </Nav>
        <Nav>
           {isAuth && <NavDropdown title={nombre} id="basic-nav-dropdown">
                <Link to={`/profile/${username}`} className="dropdown-item">Mi perfil</Link>
                <Link to={`/profile/${username}/settings`} className="dropdown-item">Editar información</Link>
            </NavDropdown>}
            { !isAuth && <LoginButtonComponent />}
            { isAuth && <LogoutButtonComponent /> }
        </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Header

// dropdown-item
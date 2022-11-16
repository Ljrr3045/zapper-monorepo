import "./Navbar.css";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import WalletButton from "./WalletButton";

function NavbarSection() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
					<img
						src="https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png"
						alt="Logo"
						className="d-inline-block align-text-top navbar_polygon-logo"
					/>
					<h5 className="navbar_project-name">
						Zapper Dapp
					</h5>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <WalletButton/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarSection;

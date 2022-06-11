import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NaviBar({
  callform,
  displayname,
  showuseremail,
  getdisplayname,
  getshowuseremail,
  auth,
  getDatedmb,
  getDatestart,
  rank,
  setrank,
}) {
  const navigate = useNavigate();
  const logfunc1 = () => {
    callform("LOG");
  };
  const logfunc2 = () => {
    callform("REG");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div className="displayPersonalData">
              <div className="test">{showuseremail}</div>
              <div className="test">{rank}</div>
              <div className="test">{displayname}</div>
            </div>
            {displayname ? (
              <>
                <div
                  className="NavLinkButton"
                  onClick={() => {
                    navigate("/PrivateOffice");
                  }}
                >
                  <div>Личный кабинет</div>
                </div>
                <div
                  className="NavLinkButton"
                  onClick={() => {
                    navigate("/Timer");
                  }}
                >
                  <div>Таймер</div>
                </div>
              </>
            ) : null}
          </Nav>
          <Nav>
            {displayname ? (
              <button
                onClick={() => {
                  auth.signOut();
                  auth.currentUser = null;
                  getdisplayname(null);
                  getshowuseremail(null);
                  getDatedmb(null);
                  getDatestart(null);
                  setrank(null);
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <button onClick={logfunc1}>Log In</button>
                <button onClick={logfunc2}>SignUp</button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

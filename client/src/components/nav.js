import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import { AuthContext } from "../auth/AuthContext";
import { ROLES } from "../data/consts";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser ? (
              <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Brand>PULSEBS</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="container-fluid">
                      {context.authUser.type === ROLES.STUDENT && (
                        <NavItem>
                          <NavLink className="nav-link" to="/student/home">
                            Student
                          </NavLink>
                        </NavItem>
                      )}
                      {context.authUser.type === ROLES.STUDENT && (
                        <NavItem>
                          <NavLink className="nav-link" to="/student/calender">
                            Calender
                          </NavLink>
                        </NavItem>
                      )}
                      {context.authUser.type === ROLES.TEACHER && (
                        <NavItem>
                          <NavLink className="nav-link" to="/teacher/home">
                            Teacher
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem className="ml-auto">
                        <NavLink
                          className="nav-link"
                          to="/logout"
                          onClick={() => context.logoutUser()}
                        >
                          Logout
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Navigation;
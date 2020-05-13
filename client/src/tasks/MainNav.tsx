import React from "react";
import styled from "styled-components";

import mainLogo from "../assets/kog_logo_flat.png";
import mainLogo2x from "../assets/kog_logo_flat@2x.png";
import mainLogo3x from "../assets/kog_logo_flat@3x.png";

import timi from "../assets/icons/24/timi.png";
import timi2x from "../assets/icons/24/timi@2x.png";
import timi3x from "../assets/icons/24/timi@3x.png";

const MainNavContainer = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  width: 100%;
  justify-content: space-between;

  img {
    max-width: 125px;
  }

  @media (min-width: 768px) {
    margin: 1rem 0 1rem 0.5rem;
  }
`;

const NavItem = styled.div`
  margin: 1rem 0.5rem;
  cursor: pointer;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoutBtn = styled.div`
  border: none;
  cursor: pointer;
  margin: 1rem 0 1rem 0.5rem;
  background: none;
  font-size: 0.75rem;

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    margin-right: 1.5rem;
    font-size: 1rem;
  }
`;

const MainNav = () => {
  return (
    <MainNavContainer>
      <img
        src={mainLogo}
        srcSet={`${mainLogo2x} 2x, ${mainLogo3x} 3x`}
        alt="Kognitive Logo"
      />
      <NavItem>Tasks</NavItem>
      <NavItem>Schedule</NavItem>
      <NavItem>Learn</NavItem>
      <RightContainer>
        <img src={timi} srcSet={`${timi2x} 2x, ${timi3x} 3x`} alt="Timi Logo" />
        <LogoutBtn onClick={() => console.log("logout")}>Logout</LogoutBtn>
      </RightContainer>
    </MainNavContainer>
  );
};

export default MainNav;

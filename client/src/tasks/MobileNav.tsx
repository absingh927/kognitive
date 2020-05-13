import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import home from "../assets/icons/24/icons-24-home-white.png";
import home2x from "../assets/icons/24/icons-24-home-white@2x.png";
import home3x from "../assets/icons/24/icons-24-home-white@3x.png";

import schedule from "../assets/icons/24/icons-24-cal.png";
import schedule2x from "../assets/icons/24/icons-24-cal@2x.png";
import schedule3x from "../assets/icons/24/icons-24-cal@3x.png";

import chat from "../assets/icons/24/icons-24-chat.png";
import chat2x from "../assets/icons/24/icons-24-chat@2x.png";
import chat3x from "../assets/icons/24/icons-24-chat@3x.png";

import learn from "../assets/icons/24/icons-24-learn.png";
import learn2x from "../assets/icons/24/icons-24-learn@2x.png";
import learn3x from "../assets/icons/24/icons-24-learn@3x.png";

import account from "../assets/icons/36/reactangle.png";
import account2x from "../assets/icons/24/reactangle@2x.png";
import account3x from "../assets/icons/24/reactangle@3x.png";

const NavContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  background-color: #000;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.img`
  margin: 1rem 0.5rem;
  cursor: pointer;
`;

const MobileNav = () => {
  const location = useLocation();
  console.log("Mobile Nav", location);
  return (
    <NavContainer>
      <NavItem src={home} srcSet={`${home2x} 2x, ${home3x} 3x`} alt="Home" />
      <NavItem
        src={schedule}
        srcSet={`${schedule2x} 2x, ${schedule3x} 3x`}
        alt="Schedule"
      />
      <NavItem src={chat} srcSet={`${chat2x} 2x, ${chat3x} 3x`} alt="Chat" />
      <NavItem
        src={learn}
        srcSet={`${learn2x} 2x, ${learn3x} 3x`}
        alt="Learn"
      />
      <NavItem
        src={account}
        srcSet={`${account2x} 2x, ${account3x} 3x`}
        alt="Account"
      />
    </NavContainer>
  );
};

export default MobileNav;

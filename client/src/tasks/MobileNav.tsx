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

import account from "../assets/icons/36/rectangle.png";
import account2x from "../assets/icons/36/rectangle@2x.png";
import account3x from "../assets/icons/36/rectangle@3x.png";

const NavContainer = styled.div`
  padding: 1.5rem 0.5rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.img<{ isActive?: boolean }>`
  margin: 1rem 0.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 0.5rem;
  background: ${(props) => (props.isActive ? "#007bff" : "none")};
`;

const MobileNav = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavItem
        src={home}
        srcSet={`${home2x} 2x, ${home3x} 3x`}
        alt="Home"
        isActive={location.pathname === "/tasks"}
      />
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

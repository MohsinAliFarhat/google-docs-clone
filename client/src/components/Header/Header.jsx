import React from 'react';
import "./Header.css";
import GoogleDocsIcon from '../../assets/google-docs-icon.svg';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { SignInModal } from '../SignInModal/SignInModal'
import UserIcon from "../../assets/user-icon.svg";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();

  const showSignInModal = () => {
    setshowModal(true);
  }

  const closeSignInModal = () => {
    setshowModal(false);
  }

  const isUserSignedIn = () => {
    const isSignedIn = localStorage.getItem("accessToken") ? true : false
    return isSignedIn
  }

  const logOut = () =>{
    localStorage.clear();
    navigate('/')
  }

  const showUserDetail = () => {
    return (
      <div>
        <div className='d-flex flex-row' role="button">
          <NavDropdown title={menuTitle()} id="basic-nav-dropdown" >
            <NavDropdown.Item onClick={logOut}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    )
  }

  const menuTitle = () => {
    return (
      <span>
        <img src={UserIcon} className="mt-1 me-2" height="20px" />
        <span>{localStorage.getItem("name")}</span>
      </span>
    )
  }

  return (
    <div className='d-flex p-2 border-bottom'>

      <div className='icon p-2'>
        <img src={GoogleDocsIcon} alt="" />
      </div>
      <div className='p-3 px-1'>Google Docs</div>

      <div className='mt-3 ms-auto me-5'>
        {!isUserSignedIn() && <Button onClick={showSignInModal} variant="primary">Sign In</Button>}
        {isUserSignedIn() && showUserDetail()}
      </div>
      {showModal ? <SignInModal showModal={showModal} closeModal={closeSignInModal.bind(this)} /> : ""}

    </div>
  )
}

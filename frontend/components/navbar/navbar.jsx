import React from 'react';

import { Link, hashHistory } from 'react-router-dom';
import Modal from 'react-modal';

import GreetingContainer from '../greeting/greeting_container';
import SessionFormContainer from '../session_form/session_form_container';


const customStyles = {
  content : {
    minWidth              : '300px',
    // position              : 'fixed',
    width                 : '300px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    margin                : 'auto',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#F5F5F5',
    borderRadius          : '0px',
    paddingTop            : '30px',
    paddingBottom         : '30px',
    border                : '1px',
    fontFamily            : "'Libre Franklin', 'sans-serif'",
    fontSize              : '14px',
    fontWeight            : '300',
    padding               : '40px 10px',
    zIndex                : '1050',
    textAlign             : 'center',
    color                 : '#6A6A6A',
    justifyContent        : 'center'
        // background: 'rgb(127, 127, 127)'
    // opacity               : '1'
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      formType: '',
    }

    this.handleLogin= this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeForm = this.changeForm.bind(this);

  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleLogin() {
    this.setState({ isOpen: true, formType: 'login' });
  }

  handleSignup() {
    this.setState({ isOpen: true, formType: 'signup' });

  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  changeForm(e) {
    e.preventDefault();
    if(this.state.formType === 'login') {
      this.setState({ formType: 'signup' });
    } else {
      this.setState({ formType: 'login' });
    }
  }

  render() {
  return (
    <nav className="nav-bar">
      <div className="left">
        <Link to="/" ><h3>IndieNoMo</h3></Link>
        <button className="nav-btn">Explore</button>
        <button className="nav-btn">How It Works</button>
        <button className="nav-btn">Equity Offerings</button>
      </div>
      <div className="right">
        <button className="nav-right-btn">START A CAMPAIGN</button>
        <GreetingContainer
          onClick={this.handleOpen}
          handleLogin={this.handleLogin}
          handleSignup={this.handleSignup}/>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
          style={customStyles}
          contentLabel="">
          <SessionFormContainer
            formType={this.state.formType}
            changeForm={this.changeForm}
            handleClose={this.handleClose} />
        </Modal>
      </div>
    </nav>);
  }
}

export default NavBar;

import React from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

// import GreetingContainer from './greeting/greeting_container';
// import SessionFormContainer from './session_form/session_form_container';
import NavBarContainer from './navbar/navbar_container';
import Homepage from './homepage/homepage_container';
import CampaignIndexContainer from './campaigns/campaign_index_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from 'react-modal'

const App = () => {
  return (
    <div>
      <NavBarContainer />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/campaigns/all" component={CampaignIndexContainer} />
    </div>
  );
}

export default App;

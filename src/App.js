import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout/Layout';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';
import VerifyEmail from './containers/Auth/VerifyEmail/VerifyEmail';
import RecoverPassword from './containers/Auth/RecoverPassword/RecoverPassword';
import Logout from './containers/Auth/Logout/Logout';
import Projects from './containers/Home/Projects'
import Home from './containers/Home/Home'
import Payment from './containers/Home/Payment'
import Landing from './containers/Home/Landing'
import Contact from './containers/Contact'
import ContactAbout from './containers/ContactAbout'
import Terms from './containers/Terms'
import TermCondition from './containers/TermCondition'
import Profile from './pages/profile/Profile';
import Sidebar from './pages/profile/Sidebar';
import My_Causes from "./pages/profile/My_Causes"
import My_Projects from "./pages/profile/My_Projects"
import Transactions from "./pages/profile/Transactions"
import TransacHistory from "./pages/causes/TransacHistory"
import Settings from "./pages/profile/Settings"
import Preference from "./pages/Preference"
import CausesGrid from "./pages/CausesGrid"
import About from './modules/views/About'

// Card
import Card from "./pages/Card"
import CardProjectRaise from "./pages/projects/my_projects/details/CardProjectRaise"

// Projects Details page
import Details from "./pages/projects/my_projects/details/Details"
import Donation from "./pages/projects/my_projects/details/Donation"
import Thanks from "./containers/Home/Thanks"
import Edit from "./containers/Home/Edit"

const withSidebar = Component => 
  <Sidebar>
    <Component  />
  </Sidebar>

const App = ({ loggedIn, emailVerified }) => {
  let routes;

  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/my-profile" component={Profile} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/my-projects" component={() => withSidebar(My_Projects)}/>
          <Route exact path="/my-causes" component={() => withSidebar(My_Causes)} />
          <Route exact path="/transactions" component={() => withSidebar(Transactions)} />
          <Route exact path="/transacthistory" component={() => withSidebar(TransacHistory)}/>
          <Route exact path="/transacthistory" component={() => withSidebar(TransacHistory)}/>
				  <Route exact path="/settings" component={() => withSidebar(Settings)}/>
				  <Route exact path="/my-profile"	component={() => withSidebar(Profile)}/>
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/card" component={Card} />
				  <Route exact path="/projectraise" component={CardProjectRaise}/>
				  <Route exact path="/details" component={Details} />
				  <Route exact path="/donation" component={Donation}/>
          <Route exact path="/edit" component={Edit} />
				  <Route exact path="/thanks" component={Thanks} />
          <Route exact path="/causes-grid" component={CausesGrid} />
          <Route exact path="/register" component={Preference} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={ContactAbout}/>
          <Route exact path="/termconditions" component={TermCondition}/>
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/recover" component={RecoverPassword} />
        <Route exact path="/contact-us" component={Contact}/>
        <Route exact path="/terms" component={Terms}/>
        
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);

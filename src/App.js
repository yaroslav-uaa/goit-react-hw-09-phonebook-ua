import { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import AppBar from './components/AppBar';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/AppBar/UserMenu/PrivateRoute';
import PublicRoute from './components/AppBar/UserMenu/PublicRoute';
// import Container from './components/Container';
// import HomeView from './views/HomeView/HomeView';
// import RegisterView from './views/RegisterView/RegisterView';
// import LoginView from './views/LoginView/LoginView';
// import ContactsView from './views/ContactsView/ContactsView';
// import SignInView from './views/LoginView/SignInView';
// import SignUpView from './views/RegisterView/SignUpView';
import './App.css';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView'));
const SignInView = lazy(() => import('./views/LoginView/SignInView'));
const SignUpView = lazy(() => import('./views/RegisterView/SignUpView'));

class App extends Component {
  componentDidMount() {
    this.props.onGetCuurentUser();
  }

  render() {
    return (
      <>
        <AppBar />
        <Suspense fallback={<p>Загружаємо...</p>}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={SignUpView}
            />
            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={SignInView}
            />
            <PrivateRoute path="/contacts" component={ContactsView} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCuurentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);

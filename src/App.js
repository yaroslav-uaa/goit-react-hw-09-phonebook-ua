import { Suspense, lazy, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import AppBar from './components/AppBar';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import './App.css';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));
const SignInView = lazy(() => import('./views/LoginView/SignInView'));
const SignUpView = lazy(() => import('./views/RegisterView/SignUpView'));
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView'));

// componentDidMount() {
//   this.props.onGetCurrentUser();
// }

export default function App() {
  const dispatch = useDispatch();

  const onGetCurrentUser = useCallback(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    onGetCurrentUser();
  }, [onGetCurrentUser]);

  return (
    <>
      <AppBar />
      <Suspense fallback={<p>Загружаємо...</p>}>
        <Switch>
          <PublicRoute exact path="/" component={HomeView} />
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
          <PrivateRoute
            path="/contacts"
            redirectTo="/login"
            component={ContactsView}
          />
        </Switch>
      </Suspense>
    </>
  );
}

// const mapDispatchToProps = {
//   onGetCurrentUser: authOperations.getCurrentUser,
// };

// export default connect(null, mapDispatchToProps)(App);

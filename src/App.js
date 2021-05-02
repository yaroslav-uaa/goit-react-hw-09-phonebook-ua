import { Suspense, lazy, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router';
import AppBar from './components/AppBar';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';

import { ToastContainer, cssTransition, toast } from 'react-toastify';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import authSelectors from './redux/auth/auth-selectors';
import MyLoader from './components/MyLoader';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));
const SignInView = lazy(() => import('./views/LoginView/SignInView'));
const SignUpView = lazy(() => import('./views/RegisterView/SignUpView'));
const ContactsView = lazy(() => import('./views/ContactsView/ContactsView'));

// componentDidMount() {
//   this.props.onGetCurrentUser();
// }

const zoomIn = cssTransition({
  enter: 'animate__animated animate__zoomIn',
  exit: 'animate__animated animate__bounceOutRight',
});

export default function App() {
  const dispatch = useDispatch();

  const error = useSelector(authSelectors.getErrorValue);
  const userName = useSelector(authSelectors.getUserName);

  const onGetCurrentUser = useCallback(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    onGetCurrentUser();
  }, [onGetCurrentUser]);

  useEffect(() => {
    error && toast.error(`${error}`);
    userName && toast.success(`Welcome dear ${userName}`);
  }, [error, userName]);

  return (
    <>
      <ToastContainer transition={zoomIn} autoClose={2000} />
      <AppBar />
      <Suspense fallback={<MyLoader />}>
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

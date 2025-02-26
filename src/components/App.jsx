import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing, selectIsLoggedIn } from "../redux/auth/selectors";
import styles from "./App.module.css";

import Loader from "./Loader/Loader";
import Layout from "./Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isRefreshing && isLoggedIn !== null) {
      setIsAppReady(true);
    }
  }, [isRefreshing, isLoggedIn]);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/registration"
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<div>Not Found Such Page</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import Loader from "./components/Loader";
import firebase from "./firebase/config";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { getUserById, setLoading, setNeedVerification } from "./store/actions/authActions";
import { RootState } from "./store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

const App = () => {
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const { loading } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(setLoading(true));
		const unsub = firebase.auth().onAuthStateChanged(async (user) => {
			if(user) {
				dispatch(setLoading(true));
				await dispatch(getUserById(user.uid));
				if(!user.emailVerified) {
					dispatch(setNeedVerification());
				}
			}
			dispatch(setLoading(false));
		});

		return () => {
			unsub();
		};
	}, [dispatch]);
	
	if(loading) {
		return <Loader/>
	}

  return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
          path="/"
          element={
            <PublicRoute
              element={<HomeScreen />}
            />
          }
        />
				<Route
          path="/signup"
          element={
            <PublicRoute
              element={<SignUpScreen />}
            />
          }
        />
				<Route
          path="/signin"
          element={
            <PublicRoute
              element={<SignInScreen />}
            />
          }
        />
				<Route
          path="/forgot-password"
          element={
            <PublicRoute
              element={<ForgotPasswordScreen />}
            />
          }
        />
				<Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<DashboardScreen />}
            />
          }
        />
			</Routes>
		</BrowserRouter>
  );
}

export default App;

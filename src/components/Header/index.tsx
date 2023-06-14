import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Button from "../UI/Button";

import "./styles.scss";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const {authenticated} = useSelector((state: RootState) => state.auth);

	const onLogout = () => {
		dispatch(signout());
	}

	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-brand">
					<Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}>RecipeWebApp</Link>
				</div>
			</div>
			<div className="navbar-end">
				<div className="navbar-items">
					{!authenticated ? <div className="buttons is-flex">
							<Button 
								text="Sign up"
								onClick={() => navigate("/signup")} 
								className="is-primary"
							/>
							<Button 
								text="Sign in"
								onClick={() => navigate("/signin")} 
							/>
						</div>
						:
						<Button text="Sign out" onClick={onLogout} /> 
					}
				</div>
			</div>
		</nav>
	)
};

export default Header;
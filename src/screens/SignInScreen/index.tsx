import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { signin, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Link } from "react-router-dom";

const SignInScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const { error } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		return () => {
			if(error) {
				dispatch(setError(""));
			}
		}
	}, [error, dispatch]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if(error) {
			dispatch(setError(""));
		}
		setLoading(true);
		dispatch(signin({email, password}, () => setLoading(false)));
	}

	return (
		<section className="section">
			<div className="container">
				<h2 className="has-text-centered is-size-2 mb-3">Sign In</h2>
				<form className="form" onSubmit={onSubmit}>
					{error && <Message type="danger" msg={error} />}
					<Input 
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						placeholder="Email"
						label="Email"
					/>
					<Input 
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						placeholder="Password"
						label="Password"
					/>
					<p>
						<Link to="/forgot-password">Forgot password?</Link>
					</p>
					<Button 
						text={loading ? "Loading..." : "Sign In"} 
						className="is-primary is-fullwidth mt-5"
						disabled={loading}
					/>
				</form>
			</div>
		</section>
	)
};

export default SignInScreen;

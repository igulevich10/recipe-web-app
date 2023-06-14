import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Message from "../../components/UI/Message";
import { signup, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const SignUpScreen = () => {
	const [firstName, setFirstName] = useState("");
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
		dispatch(signup({email, password, firstName}, () => setLoading(false)));
	}

	return (
		<section className="section">
			<div className="container">
				<h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
				<form className="form" onSubmit={onSubmit}>
					{error && <Message type="danger" msg={error} />}
					<Input 
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.currentTarget.value)}
						placeholder="First Name"
						label="First Name"
					/>
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
					<Button 
						text={loading ? "Loading..." : "Sign Up"} 
						className="is-primary is-fullwidth mt-5"
						disabled={loading}
					/>
				</form>
			</div>
		</section>
	)
};

export default SignUpScreen;

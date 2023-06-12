import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import { sendPasswordResetEmail, setError, setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const ForgotPasswordScreen = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const { error, success } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		return () => {
			if(error) {
				dispatch(setError(""));
			}
			if(success) {
				dispatch(setSuccess(""));
			}
		}
	}, [error, dispatch, success]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if(success) {
			dispatch(setSuccess(""));
		}
		if(error) {
			dispatch(setError(""));
		}
		setLoading(true);
		await dispatch(sendPasswordResetEmail(email, "Email has been sent!"));
		setLoading(false);
	};

	return (
		<section className="section">
			<div className="container">
				<h2 className="has-text-centered is-size-2 mb-3">Reset Password</h2>
				<form className="form" onSubmit={onSubmit}>
					{error && <Message type="danger" msg={error} />}
					{error && <Message type="success" msg={success} />}
					<Input 
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						placeholder="Email"
						label="Email"
					/>
					<Button 
						text={loading ? "Loading..." : "Send password reset email"} 
						className="is-primary is-fullwidth mt-5"
						disabled={loading}
					/>
				</form>
			</div>
		</section>
	)
};

export default ForgotPasswordScreen;
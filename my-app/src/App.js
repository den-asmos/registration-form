import './App.css';
import { useRef, useState } from 'react';

const initialState = { email: '', password: '', passwordSubmit: '' };

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, value) => {
			setState({ ...state, [fieldName]: value });
		},
		resetState: () => setState(initialState),
	};
};

const validateEmail = (email) => {
	if (!/[-._\w]+@([\w-]+\.)+[\w]{2,4}/g.test(email) && email) {
		return 'Wrong input';
	}
	return null;
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	const { email, password, passwordSubmit } = getState();

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const registerButtonRef = useRef(null);

	const onChange = ({ target }) => updateState(target.name, target.value);

	const onEmailBlur = ({ target }) => {
		setEmailError(validateEmail(target.value));
	};

	const onPasswordSubmitBlur = () => {
		if (password !== passwordSubmit) {
			setPasswordError(`Passwords don't match`);
		} else {
			setPasswordError(null);

			if (!emailError && email && password) {
				registerButtonRef.current.focus();
			}
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(getState());
		resetState();
	};

	return (
		<div className="wrapper">
			<div className="registration">
				<h1>Registration</h1>
				<form onSubmit={onSubmit}>
					<div className="input-box">
						<input
							name="email"
							type="email"
							id="email"
							value={email}
							onChange={onChange}
							onBlur={onEmailBlur}
							placeholder=" "
						/>
						<label htmlFor="email">Email</label>
						{emailError && <div className="error">{emailError}</div>}
					</div>

					<div className="input-box">
						<input
							name="password"
							type="password"
							id="password"
							value={password}
							onChange={onChange}
							placeholder=" "
						/>
						<label htmlFor="password">Password</label>
					</div>

					<div className="input-box">
						<input
							name="passwordSubmit"
							type="password"
							id="passwordSubmit"
							value={passwordSubmit}
							onChange={onChange}
							onBlur={onPasswordSubmitBlur}
							placeholder=" "
						/>
						<label htmlFor="passwordSubmit">Confirm Password</label>
						{passwordError && <div className="error">{passwordError}</div>}
					</div>
					<div className="btn">
						<button
							type="submit"
							disabled={emailError || passwordError}
							ref={registerButtonRef}
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

import './App.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldSchema = yup.object().shape({
	email: yup.string().required().email('Wrong input'),
	password: yup.string().required('Password is requiered'),
	passwordSubmit: yup.string().oneOf([yup.ref('password')], `Passwords don't match`),
});

export const App = () => {
	const registerButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		defaultValues: { email: '', password: '', passwordSubmit: '' },
		resolver: yupResolver(fieldSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordSubmitError = errors.passwordSubmit?.message;

	useEffect(() => {
		if (isValid) {
			registerButtonRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className="wrapper">
			<div className="registration">
				<h1>Registration</h1>
				<form
					onSubmit={handleSubmit((event) => {
						sendFormData(event);
						reset();
					})}
				>
					<div className="input-box">
						<input
							name="email"
							type="email"
							id="email"
							{...register('email')}
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
							{...register('password')}
							placeholder=" "
						/>
						<label htmlFor="password">Password</label>
						{passwordError && <div className="error">{passwordError}</div>}
					</div>

					<div className="input-box">
						<input
							name="passwordSubmit"
							type="password"
							id="passwordSubmit"
							{...register('passwordSubmit')}
							placeholder=" "
						/>
						<label htmlFor="passwordSubmit">Confirm Password</label>
						{passwordSubmitError && <div className="error">{passwordSubmitError}</div>}
					</div>
					<div className="btn">
						<button
							type="submit"
							disabled={emailError || passwordError || passwordSubmitError}
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

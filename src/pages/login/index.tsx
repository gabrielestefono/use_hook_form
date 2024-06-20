import Image from 'next/image';
import styles from '../../styles/login.module.scss';
import logo from './logo.png';
import { useForm } from 'react-hook-form';
import { FormEvent } from 'react';

export default function Login(){
	const { register, watch, unregister } = useForm();

	const mostrarSubmit = (e: FormEvent)=>{
		e.preventDefault();
		console.log(watch('email'))
		console.log(watch('password'))
		unregister('email');
		console.log(watch('email'))
	}

	return (
		<main className={styles.login}>
			<div>
				<h1>Taskfy</h1>
				<h2>Login</h2>
				<Image src={logo} alt=''/>
			</div>
			<form onSubmit={mostrarSubmit}>
				<input type="email" {...register('email')}/>
				<input type="password" {...register('password')}/>
				<input type="submit" value="Enviar" />
			</form>
		</main>
	)
}
import React, { useState } from 'react';
import './login.css';
import { PiStarOfDavidFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { role, token, login, logout } = useAuth();

    let navegacion = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log("intentando")
            console.log('Datos de inicio de sesión:', { username, password });
            
            const response = await axios.post(
                'http://localhost:8080/clements-plast/login',
                {
                    username,
                    password,
                },
            );
            const token = response.data.token;
            login(token);



            // Almacenar el token
            //setToken(token);
            console.log(token);

            navegacion("/clement-plast/inicio")

        } catch (error) {
            console.error('Error de autenticación', error);
            console.log("No se pudo")
        }
    };

    return (
        <div className='super-contenedor'>
            <div className='contenedor'>
                <div className='logo'>
                    <PiStarOfDavidFill />
                    <span> Clement's Plast</span>
                </div>
                <div className='contenido'>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className='title'>Inicio de sesión</div>
                        <div className='input-box underline'>
                            <input
                                type='text'
                                name='username'
                                placeholder='Ingresa tu username'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className='underline'></div>
                        </div>
                        <div className='input-box'>
                            <input
                                type='password'
                                name='password'
                                placeholder='Ingresa tu contraseña'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='underline'></div>
                        </div>
                        <div className='input-box button'>
                            <input type='submit' value='Ingresar' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


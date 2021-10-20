import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    async function handleSubmit(event) {
      event.preventDefault();
      
      try {
        setError('');

        const response = await api.post('/sessions', { email, password });
    
        const { _id } = response.data;
        
        localStorage.setItem('user', _id);

        history.push('/dashboard');
        }
        catch(e) {
            if (e.response && e.response.data) {
                setError(e.response.data.message);
            }
        }
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="password">SENHA *</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <label className="error">{error}</label>

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}
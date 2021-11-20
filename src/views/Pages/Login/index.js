import React, { useState } from 'react'

import user from '../../../assets/user.jpg'

import api from '../../../components/Api'
import { login } from '../../../components/Auth';

const Login = (props) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleLogin = async () => {

        if (email === null || password === null) {
            alert("Todos os campos devem ser preenchidos!!")
            return;
        }

        const form = new FormData()
        form.append('email', email)
        form.append('password', password)

        try {
            const { data: { api_key } } = await api.post('/api/login', form)

            login(api_key)

            props.history.push("/")

        } catch (error) {
            const { data: { success } } = error

            if (!success) {
                alert("Dados incorretos..!")
            }
        }


    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card mt-5 w-50">
                <div className="card-header">
                    <div className=" d-flex justify-content-center">
                        <img src={user} alt="Login" style={img} />
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="emailNick"
                                placeholder="Usuário"
                                value={email}
                                onChange={((e) => setEmail(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Senha"
                                value={password}
                                onChange={((e) => setPassword(e.target.value))}
                            />
                        </div>

                    </form>
                </div>
                <div className="card-footer w-100" >
                    <div className="d-flex justify-content-center w-100 ">
                        <button type="button" onClick={() => handleLogin()} className="btn btn-primary w-100">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const img = {
    height: "40%",
    width: "40%",
    borderRadius: "50%",
};


export default Login;
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../Redux/Reducers/UserReducer';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    userLogin = () => {
        var { username, password } = this.state
        var userInfo = { username, password }
        axios.post('/api/v1/login', userInfo)
            .then(response => {
                this.props.setUser(response.data);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.message
                });
            });
    };

    showPassword = () => {
        let passwordInput = document.getElementById('inputPassword');
        passwordInput.type === 'password' 
            ? passwordInput.type = 'text'
            : passwordInput.type = 'password'
    };

    render(){
        return(
            <div className='container'>
                <h1 className='mt-3'>Login</h1>
                <p className='text-danger mt-1 mb-1'>{this.state.errorMessage}</p>
                <div className='input-group mb-3 mt-3'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Username..'
                        onChange={(e) => this.setState({ username: e.target.value })} />
                    <input 
                        id='inputPassword'
                        type='password' 
                        className='form-control' 
                        placeholder='Password..'
                        onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <div className='input-group d-flex justify-content-center'>
                    <div className='mb-3'>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            id='show-password-handle'
                            onClick={this.showPassword}
                        />
                        <label className='form-check-label' htmlFor='show-password-handle'>
                            Show Password
                        </label>
                    </div>
                </div>
                <div className='input-group mb-3 d-flex justify-content-center'>
                    <button
                        onClick={() => this.userLogin()} 
                        className='btn btn-outline-primary mr-3'>Login</button>
                    <Link to='/' className='btn btn-outline-danger ml-3'>Cancel</Link>
                </div>
            </div>    
        )
    }
}

export default connect(null, {setUser})(withRouter(Login));
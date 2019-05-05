import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../Redux/Reducers/UserReducer';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };

    componentDidMount(){
        axios.get('/api/v1/session-info').then(response => {
            this.props.setUser(response.data)
        });
    };

    usernameDisplay = () => {
        if(this.props.user.user.username){
            return (
                <li className='nav-item'>
                    <hr />
                    <p className='mb-1'>
                        {this.props.user.user.username} - {this.props.user.user.title}
                    </p>
                    <hr />
                </li>
            )
        }
    }

    logout = () => {
        axios.post('/api/v1/logout').then(response => {
            this.props.setUser(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    titleCheck = () => {
        if(this.props.user.user.title === 'Friend'){
            return (
                <li className='nav-item'>
                    <button 
                        onClick={() => this.sendMessage()}
                        style={{ border: 'none', background: 'none'}}
                        className='nav-link text-primary ml-2'>
                        Alert
                    </button>
                </li>
            )
        }
    }

    userCheck = () => {
        if(!this.props.user.user.username) {
            return (
                <li className='nav-item'>
                    <Link to='/chat' 
                        style={{ border: 'none', background: 'none', float: 'left'}}
                        className='nav-link text-secondary ml-2 disabled'>
                        Chat
                    </Link>
                </li>
            )
        }
        return (
            <li className='nav-item'>
                <Link to='/chat' 
                    style={{ border: 'none', background: 'none', float: 'left'}}
                    className='nav-link text-primary ml-2'>
                    Chat
                </Link>
            </li>
        )
    }

    sendMessage = () => {
        axios.post('/api/v1/send-message').then(response => {
            console.log(response)
        })
    }

    loggedIn = () => {
        if(this.props.user.user.username) {
            return (
                <li className='nav-item'>
                    <button
                        onClick={() => this.logout()}
                        style={{ border: 'none', background: 'none', float: 'left'}}
                        className='nav-link text-danger ml-2'>
                        Logout
                    </button>
                </li>
            )
        } else {
            return (
                <li className='nav-item'>
                    <Link to='/login'
                        style={{ border: 'none', background: 'none', float: 'left'}}
                        className='nav-link text-primary ml-2'>
                        Login
                    </Link>
                </li>
            )
        }
    }

    render () {
        return(
            <div>
                <nav className='navbar-light bg-light'>
                    <a className='navbar-brand'>Angel Connect</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav mr-auto'>
                            {this.usernameDisplay()}
                            {this.titleCheck()}
                            {this.userCheck()}
                            {this.loggedIn()}
                        </ul>
                    </div>
                </nav>    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { setUser })(withRouter(Navbar))
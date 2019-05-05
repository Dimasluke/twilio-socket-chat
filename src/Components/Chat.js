import React, { Component } from 'react';
import { setMessages } from '../Redux/Reducers/MessageReducer';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import socketIo from 'socket.io-client';
const io = socketIo();

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            messages: []
        }

        io.on('room joined', data => {
            let message = '';
            if(data.user){
                message = data.user + ' has join the room.'
            };
            this.props.setMessages({message: message, title: data.title});
        });

        io.on('new message', data => {
            this.props.setMessages({message: data.message, title: data.title});
        });

    };

    componentDidUpdate = (prevProps) => {
        console.log(prevProps)
        if(this.props.messages.messages != prevProps.messages.messages){
            this.renderMessages();
        }
    }

    joinRoom = () => {
        io.emit('join room', {
            data: this.props.user.user
        });
    }

    sendMessage = () => {
        io.emit('send message', {
            data: this.props.user.user,
            message: this.state.message
        });
        this.setState({
            message: ''
        });
    }

    renderMessages = () => {
        var messagesCopy = this.props.messages.messages.map(message => {
            console.log('mapped Messages', message)
            if(message.title === 'Angel'){
                return (
                    <div>
                        <li className='border border-primary list-group-item float-right mt-1 mb-1 mr-1 rounded p-0' style={{ width: '60%' }}>
                            <p className='m-1 small'>{message.message}</p>
                        </li>
                    </div>
                )
            }
            return(
                <div>
                    <li className='border border-secondary list-group-item mt-1 mb-1 rounded mr-1 p-0' style={{ width: '60%' }}>
                        <p class='m-1 small'>{message.message}</p>
                    </li>
                </div>
            )
        })
        return messagesCopy
    }

    render(){
        console.log('this props', this.props)
        return(
            <div className='container'>
                <h2>Chat</h2>
                <div className='border rounded d-flex flex-column justify-content-end ' style={{ border: '1px solid black', height: '60vh'}}>
                    <div className='w-100 overflow-auto'>
                        <ul className='list-group'>
                            {this.renderMessages()}
                        </ul>
                    </div>
                    <div className='w-100 input-group'>
                        <input type='text' className='form-control' placeholder='Message' onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message} />
                        <div className='input-group-append'>
                            <button className='btn btn-outline-primary' type='button' onClick={() => this.sendMessage()}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-outline-primary mr-4' onClick={() => this.joinRoom()}>
                        Join
                    </button>
                    <Link
                        className='btn btn-outline-danger ml-4'
                        to='/'>
                        Leave
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps, { setMessages })(Chat);
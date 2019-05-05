import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

class Dashboard extends Component {

    

    render (){
        return(
            <div>
                <Navbar />
                <img
                    className='mt-4'
                    src={require('../Resources/angel-connect-logo.png')} />
                <hr />
            </div>
        )
    }
}

export default Dashboard
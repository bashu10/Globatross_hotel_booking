import React from 'react';
import './Header.css';
import Icon from './icon1.png';


function Header() {
    return (
    <div className ='header'>
       <div class="top-left"><img src ={Icon} className="app-logo" alt="logo" />GLOBATROSS</div>
       

    </div>
    )
}

export default Header
import React from 'react';
import "./Main.css"
import Userslist from '../userslist/Userslist';
import Forms from '../form/Forms';


function Main() {
    return (
        <div className='Main'>
            <div className="plas">
                <Forms />
            </div>
            <Userslist />
        </div>
    )
}

export default Main
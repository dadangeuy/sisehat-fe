import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import './index.css'
import {cyan600} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <header className={'head'}>
                    <img className={'shadowed'} src={require('../images/logo.png')} height={'300'} alt={'logo'}/>
                    <h1>Sisehat</h1>
                    <h2>Layanan Kesehatan dalam Genggaman Tangan Anda</h2>
                    <RaisedButton label={"Daftar Sekarang"} labelStyle={{color: cyan600}}
                                  containerElement={<Link to={'/signup'}/>}/>
                </header>
            </div>
        );
    }
}
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import './index.css'
import {fullWhite} from 'material-ui/styles/colors'
import {Link} from 'react-router-dom'

export default class Home extends React.Component {
    render() {
        return (
            <header className={'head'}>
                <img className={'shadowed'} src={require('../images/logo.png')} height={'300'} alt={'logo'}/>
                <h1>Sisehat</h1>
                <h2>Layanan Kesehatan dalam Genggaman Tangan Anda</h2>
                <FlatButton label={"Daftar Sekarang"} labelStyle={{color: fullWhite}} containerElement={<Link to={'/signup'}/>}/>
            </header>
        );
    }
}
import React, {Component} from 'react'
import './index.css'

export default class NotFound extends Component {
    render() {
        return (
            <header className={'error'}>
                <img src={require('../../images/page-not-found.gif')} alt={'404 Not Found'}/>
            </header>
        )
    }
}

export class UnderConstruction extends Component {
    render() {
        return (
            <header className={'error'}>
                <img src={require('../../images/page-under-construction.gif')} alt={'Under Construction'}/>
            </header>
        )
    }
}
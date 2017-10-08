import React, {Component} from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Layout from "./Layout"
import Content from "./Content"
import {BrowserRouter} from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <Layout/>
                        <Content/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}
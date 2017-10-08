import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import LocalHospital from 'material-ui/svg-icons/maps/local-hospital'
import IconButton from 'material-ui/IconButton'
import {Link} from 'react-router-dom'

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    openDrawer = () => this.setState({open: true});
    closeDrawer = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.openDrawer}
                    iconElementRight={<FlatButton label={"Masuk"} containerElement={<Link to={'/login'}/>}></FlatButton>}
                    zDepth={false}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title={"Menu"}
                        iconElementLeft={<IconButton><LocalHospital/></IconButton>}
                    />
                    <MenuItem onClick={this.closeDrawer} containerElement={<Link to={'/'}/>}>Beranda</MenuItem>
                    <MenuItem onClick={this.closeDrawer} containerElement={<Link to={'/services/doctor'}/>}>Panggil Dokter</MenuItem>
                    <MenuItem onClick={this.closeDrawer} containerElement={<Link to={'/services/drug'}/>}>Beli Obat</MenuItem>
                    <MenuItem onClick={this.closeDrawer} containerElement={<Link to={'/about'}/>}>Tentang Kami</MenuItem>
                </Drawer>
            </div>
        );
    }
}
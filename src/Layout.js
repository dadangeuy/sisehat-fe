import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import SpeakerPhoneIcon from 'material-ui/svg-icons/communication/speaker-phone'
import GroceryStoreIcon from 'material-ui/svg-icons/maps/local-grocery-store'
import GroupIcon from 'material-ui/svg-icons/social/group'
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
                    iconElementRight={
                        <FlatButton label={"Masuk"} containerElement={
                            <Link to={'/login'}/>
                        }>
                        </FlatButton>
                    }
                    zDepth={0}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title={"Menu"}
                    />
                    <MenuItem leftIcon={<HomeIcon/>} onClick={this.closeDrawer} containerElement={<Link to={'/'}/>}>Beranda</MenuItem>
                    <MenuItem leftIcon={<SpeakerPhoneIcon/>} onClick={this.closeDrawer}
                              containerElement={<Link to={'/services/doctor'}/>}>Panggil Dokter</MenuItem>
                    <MenuItem leftIcon={<GroceryStoreIcon/>} onClick={this.closeDrawer}
                              containerElement={<Link to={'/services/drug'}/>}>Beli Obat</MenuItem>
                    <MenuItem leftIcon={<GroupIcon/>} onClick={this.closeDrawer}
                              containerElement={<Link to={'/about'}/>}>Tentang Kami</MenuItem>
                </Drawer>
            </div>
        );
    }
}
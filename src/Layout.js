import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import SpeakerPhoneIcon from 'material-ui/svg-icons/communication/speaker-phone'
import GroceryStoreIcon from 'material-ui/svg-icons/maps/local-grocery-store'
import GroupIcon from 'material-ui/svg-icons/social/group'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField'

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openBar: false,
            openPop: false,
            anchorEl: undefined,
            email: '',
            password: '',
        };
    }

    openDrawer = () => this.setState({openBar: true});

    closeDrawer = () => this.setState({openBar: false});

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            openPop: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            openPop: false,
        });
    };


    updateTextField = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    render() {
        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.openDrawer}
                    iconElementRight={
                        <FlatButton label={"Masuk"} onClick={this.handleTouchTap}/>
                    }
                    zDepth={0}
                />
                <Popover
                    open={this.state.openPop}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <Menu disableAutoFocus={true}>
                        <MenuItem disabled={true}>
                            <TextField
                                id={'email'}
                                onChange={this.updateTextField}
                                value={this.state.email}
                                hintText="e.g. freida@pambudy.com"
                                floatingLabelText="Email"
                                floatingLabelFixed={true}
                                fullWidth={true}
                            />
                        </MenuItem>
                        <MenuItem disabled={true}>
                            <TextField
                                id={'password'}
                                onChange={this.updateTextField}
                                value={this.state.password}
                                hintText="e.g. lovelove"
                                floatingLabelText="Password"
                                floatingLabelFixed={true}
                                type={'password'}
                                fullWidth={true}
                            />
                        </MenuItem>
                        <MenuItem disabled={true} style={{textAlign: 'center'}}>
                            <FlatButton fullWidth={true} label="Login"/>
                        </MenuItem>
                    </Menu>
                </Popover>
                <Drawer
                    docked={false}
                    open={this.state.openBar}
                    onRequestChange={(open) => this.setState({openBar: open})}
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
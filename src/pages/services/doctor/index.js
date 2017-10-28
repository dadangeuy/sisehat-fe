import React from 'react';
import LocationPicker from 'react-location-picker';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import GooglePlaceAutocomplete from 'material-ui-places';
import Places from 'google-places-browser/places';
import Dialog from 'material-ui/Dialog';
import {DOCTOR_API} from "../../../api/apiEndpoint";

let places = Places(window.google);
let request = require('request');

export default class Doctor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: true,
            openSearch: false,
            openResult: false,
            findDoctorSuccess: false,
            coords: {
                lat: -7.279378,
                lng: 112.791209
            },
            address: 'Institut Teknologi Sepuluh Nopember, Keputih, Sukolilo, Surabaya City, East Java 60117',
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
        this.onAutoCompleteRequest = this.onAutoCompleteRequest.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseResult = this.handleCloseResult.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }


    onChange({position, address}) {
        this.setState({
            address: address,
            coords: {
                lat: position.lat,
                lng: position.lng
            }
        });
    }

    onAutoCompleteChange(value) {
        this.setState({address: value.target.value});
    }

    onAutoCompleteRequest(selectedData) {
        this.setState({ready: false});
        places.details({placeId: selectedData.place_id}, this.updateCoords);
    }

    updateCoords(err, place) {
        const lat = place.geometry.location.lat(), lng = place.geometry.location.lng();
        this.setState({
            ready: true,
            coords: {
                lat: lat,
                lng: lng
            }
        });
    }

    handleOpen() {
        this.setState({
            error: false,
            openSearch: true
        });
        request.post({url: DOCTOR_API, timeout: 100000}, this.handleResponse);
    };

    handleResponse(error, response, body) {
        if (error) this.setState({findDoctorSuccess: false, error: true});
        else this.setState({findDoctorSuccess: true});
        this.handleClose();
    }

    handleClose() {
        this.setState({
            openSearch: false,
            openResult: true
        });
    };

    handleCloseResult() {
        this.setState({openResult: false});
    }

    render() {
        const searchDialog = <Dialog
            modal={false}
            open={this.state.openSearch}
            contentStyle={{textAlign: 'center'}}
        >
            <img src={require('../../../images/ambulance.gif')} alt={'ambulance'} height={'500px'}/>
            <p>Mencari Dokter disekitar lokasi anda...</p>
        </Dialog>;

        let resultDialog = <Dialog
            open={this.state.openResult}
            onRequestClose={this.handleCloseResult}
            title={'Pencarian Gagal!'}
        >
            <p>Tidak ada dokter disekitar lokasi anda saat ini, silahkan coba beberapa saat lagi</p>
        </Dialog>;
        if (this.state.error) {
            resultDialog = <Dialog
                open={this.state.openResult}
                onRequestClose={this.handleCloseResult}
                title={'Server sedang dalam gangguan'}
            >
                <p>Layanan sedang dalam perbaikan, silahkan coba beberapa saat lagi</p>
            </Dialog>
        }
        else if (this.state.findDoctorSuccess) {
            resultDialog = <Dialog
                open={this.state.openResult}
                onRequestClose={this.handleCloseResult}
                title={'Berhasil menemukan dokter!'}
            >
                <p>Dokter akan menghubungi anda beberapa saat lagi</p>
            </Dialog>;
        }

        if (this.state.ready) {
            return (
                <div style={{textAlign: 'center'}}>
                    <div style={{width: '50%', margin: 'auto'}}>
                        <GooglePlaceAutocomplete
                            fullWidth={true}
                            searchText={this.state.address}
                            onChange={this.onAutoCompleteChange}
                            onNewRequest={this.onAutoCompleteRequest}
                            name={'location'}
                            types={['geocode']}
                            restrictions={{country: 'id'}}
                        />
                        <TextField fullWidth={true} hintText="Keterangan"/>
                    </div>
                    <LocationPicker
                        containerElement={<div style={{height: '100%'}}/>}
                        mapElement={<div style={{height: '600px'}}/>}
                        defaultPosition={this.state.coords}
                        onChange={this.onChange}
                        radius={1}
                        zoom={17}
                    />
                    <RaisedButton label={'Pesan'} primary={true} onClick={this.handleOpen} style={{margin: '12px'}}/>
                    {searchDialog}
                    {resultDialog}
                </div>
            );
        }
        else {
            return (
                <div>
                    <LinearProgress mode={'indeterminate'}/>
                </div>
            );
        }
    }
}
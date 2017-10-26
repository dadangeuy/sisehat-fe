import React from 'react';
import LocationPicker from 'react-location-picker';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import GooglePlaceAutocomplete from 'material-ui-places';
import geocoder from 'search-google-geocode';
import Places from 'google-places-browser/places';
const places = Places(window.google);

const options = {language: 'id', region: 'ID'};

export default class Doctor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            coords: {
                lat: -7.279378,
                lng: 112.791209
            },
            address: "Institut Teknologi Sepuluh Nopember",
            data: [],
            dataResult: []
        };

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                geocoder.reverseGeocode(coords.latitude, coords.longitude, (error, result) => {
                        if (result[0]) {
                            this.setState({
                                address: result[0].formatted,
                                coords: {
                                    lat: coords.latitude,
                                    lng: coords.longitude
                                }
                            });
                        }
                        this.setState({ready: true});
                    },
                    options
                );
            });
        }
        else {
            this.setState({ready: true});
        }

        this.onChange = this.onChange.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
        this.onAutoCompleteRequest = this.onAutoCompleteRequest.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
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

    handleUpdateInput(value) {
        this.setState({
            address: value
        });
        if (value !== undefined && value !== '') {
            geocoder.geocode(value, (error, result) => {
                    this.setState({
                        dataResult: result,
                        data: result.map(result => result.formatted)
                    });
                },
                options
            );
        }
    };

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

    render() {
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
                    <RaisedButton label={'Pesan'} primary={true} style={{margin: '10px'}}/>
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
import React, {Component} from 'react'
import {Step, StepLabel, Stepper,} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import {cyan500} from 'material-ui/styles/colors'
import SIGNUP_API from '../../api/apiEndpoint'

export class Signup extends Component {
    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: '',
        name: '',
        nameError: '',
        phone: '',
        phoneError: '',
        gender: '',
        genderError: '',
        birthdate: null,
        birthdateError: '',
        verify: '',
        verifyError: '',
    };

    updateTextField = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    updateGender = (event, index, value) => {
        this.setState({gender: value});
    };

    updateBirthdate = (event, date) => {
        this.setState({birthdate: date});
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    validateForm() {
        this.setState({
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            nameError: '',
            phoneError: '',
            genderError: '',
            birthdateError: '',
        });
        const {stepIndex} = this.state;
        let error = false;
        switch (stepIndex) {
            case 0:
                const {email, password, confirmPassword} = this.state;
                if (email.length < 1) {
                    this.setState({emailError: 'Wajib diisi',});
                    error = true;
                }
                else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                    this.setState({emailError: 'Format salah'});
                    error = true;
                }
                if (password.length < 6) {
                    this.setState({passwordError: 'Wajib diisi (minimal 6 karakter).',});
                    error = true;
                }
                if (confirmPassword.length < 6) {
                    this.setState({confirmPasswordError: 'Wajib diisi (minimal 6 karakter).',});
                    error = true;
                }
                if (confirmPassword !== password) {
                    this.setState({confirmPasswordError: 'Password tidak cocok',});
                    error = true;
                }
                break;
            case 1:
                const {name, phone, gender, birthdate} = this.state;
                if (name.length < 3) {
                    this.setState({nameError: 'Wajib diisi (minimal 3 karakter).',});
                    error = true;
                }
                if (phone.length < 8) {
                    this.setState({phoneError: 'Wajib diisi (minimal 8 angka).',});
                    error = true;
                }
                if (gender.length < 1) {
                    this.setState({genderError: 'Wajib diisi',});
                    error = true;
                }
                if (birthdate.length < 1) {
                    this.setState({birthdateError: 'Wajib diisi'});
                    error = true;
                }
                break;
            case 2:
                break;
            default:
                break;
        }
        return error;
    };

    sendForm() {
        const {email, password, name, phone, gender} = this.state;
        const result = {
            api: SIGNUP_API,
            email: email,
            password: password,
            name: name,
            phone: phone,
            gender: gender,
        };
        console.log(result);
    };

    handleNext = () => {
        const error = this.validateForm();
        const {stepIndex, loading} = this.state;
        if (!loading && !error) {
            this.dummyAsync(() => {
                if (stepIndex === 1) this.sendForm();
                this.setState({
                    loading: false,
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2,
                })
            });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <TextField id={'email'} hintText={'e.g. emailku@gmail.com'} floatingLabelText={'Email'}
                                   floatingLabelFixed={true} onChange={this.updateTextField} value={this.state.email}
                                   errorText={this.state.emailError}/>
                        <br/><TextField id={'password'} hintText="e.g. itscintasubuh" floatingLabelText="Password"
                                        type={'password'}
                                        floatingLabelFixed={true} onChange={this.updateTextField}
                                        value={this.state.password} errorText={this.state.passwordError}/>
                        <br/><TextField id={'confirmPassword'} floatingLabelText="Konfirmasi Password" type={'password'}
                                        floatingLabelFixed={true} onChange={this.updateTextField}
                                        value={this.state.confirmPassword} errorText={this.state.confirmPasswordError}/>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TextField id={'name'} hintText={'e.g. Dina Mariani'} floatingLabelText={'Nama Lengkap'}
                                   floatingLabelFixed={true} onChange={this.updateTextField} value={this.state.name}
                                   errorText={this.state.nameError}/><br/>
                        <TextField id={'phone'} hintText={'e.g. +6287771463723'} floatingLabelText={'Nomor Handphone'}
                                   floatingLabelFixed={true} onChange={this.updateTextField} value={this.state.phone}
                                   errorText={this.state.phoneError}/><br/>
                        <SelectField id={'gender'}
                                     floatingLabelText={'Jenis Kelamin'}
                                     selectedMenuItemStyle={{color: cyan500}}
                                     onChange={this.updateGender}
                                     value={this.state.gender}
                                     errorText={this.state.genderError}
                        >
                            <MenuItem value={'L'} primaryText={'Pria'}/>
                            <MenuItem value={'P'} primaryText={'Wanita'}/>
                        </SelectField><br/>
                        <DatePicker id={'birthdate'} hintText="Tanggal Lahir" mode="landscape"
                                    onChange={this.updateBirthdate} value={this.state.birthdate}/>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <p>
                            Kode verifikasi telah kami kirimkan ke email yang anda daftarkan. Silahkan salin kode
                            tersebut kedalam form dibawah ini untuk menyelesaikan pendaftaran anda.
                        </p>
                        <TextField id={'verify'} hintText="Kode Verifikasi" onChange={this.updateTextField}
                                   value={this.state.verify} errorText={this.state.verifyError}/>
                    </div>
                );
            default:
                return 'Pendaftaran Berhasil!';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>{'Pendaftaran Berhasil!'}</p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        primary={true}
                        onClick={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Pendaftaran Akun</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Isi Data Diri</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Verifikasi</StepLabel>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}
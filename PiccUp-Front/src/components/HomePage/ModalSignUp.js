import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropdown from '../Dropdown';
import loadingSpinner from '../images/icons/loading-spinner.gif';

class ModalSignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            city: '',
            state: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            formErrors: {
                firstName: false,
                lastName: false,
                city: false,
                state: false,
                email: false,
                username: false,
                password: false,
                passwordConfirm: false
            },
            formValid: false,
            submitted: false,
            signupSuccess: false,
            incorrentCredentials: false,
            arrayOfCities: ['Los Angelos', 'San Francisco', 'San Jose'],
            arrayOfStates: ['CA']
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    handleCityChange = city => {
        this.setState({ city: city }, () => {
            this.validateField('city', city);
        });
    };

    handleStateChange = state => {
        this.setState({ state: state }, () => {
            this.validateField('state', state);
        });
    };

    validateField = (fieldName, value) => {
        let formErrors = this.state.formErrors;
        switch (fieldName) {
            case 'firstName':
                let firstNameValid = value.length > 0;
                formErrors.firstName = firstNameValid;
                break;
            case 'lastName':
                let lastNameValid = value.length > 0;
                formErrors.lastName = lastNameValid;
                break;
            case 'city':
                let cityValid = value.length > 0;
                formErrors.city = cityValid;
                break;
            case 'state':
                let stateValid = value.length > 0;
                formErrors.state = stateValid;
                break;
            case 'email':
                const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let emailValid = emailRegex.test(value);
                formErrors.email = emailValid;
                break;
            case 'username':
                // const usernameRegex = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]$/;
                const usernameRegex = /^(?=[a-z_\d]*[a-z])[a-z_\d]{3,}$/;
                let usernameValid = usernameRegex.test(value);
                formErrors.username = usernameValid;
                break;
            case 'password':
                let passwordValid = value.length >= 3;
                formErrors.password = passwordValid;
                let passwordConfirmValid = value === this.state.passwordConfirm;
                formErrors.passwordConfirm = passwordConfirmValid;
                break;
            case 'passwordConfirm':
                passwordConfirmValid = value === this.state.password;
                formErrors.passwordConfirm = passwordConfirmValid;
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: formErrors
            },
            this.validateForm
        );
    };

    validateForm = () => {
        const { formErrors } = this.state;
        this.setState({
            formValid:
                formErrors.firstName &&
                formErrors.lastName &&
                formErrors.city &&
                formErrors.state &&
                formErrors.email &&
                formErrors.username &&
                formErrors.password &&
                formErrors.passwordConfirm
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            city,
            state,
            username,
            email,
            passwordConfirm
        } = this.state;
        const { handleSignup } = this.props;
        this.setState({ submitted: true });
        const signupStatus = await handleSignup(
            firstName,
            lastName,
            city,
            state,
            username,
            email,
            passwordConfirm
        );
        if (signupStatus) {
            this.setState({ signupSuccess: true });
            this.handleFormReset();
        } else {
            this.setState({
                incorrentCredentials: true
            });
        }
        this.setState({ submitted: false });
    };

    handleFormReset = () => {
        this.setState({
            firstName: '',
            lastName: '',
            city: '',
            state: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            formErrors: {
                firstName: false,
                lastName: false,
                city: false,
                state: false,
                email: false,
                username: false,
                password: false,
                passwordConfirm: false
            },
            formValid: false,
            submitted: false,
            incorrentCredentials: false
        });
    };

    render() {
        const {
            firstName,
            lastName,
            city,
            state,
            username,
            email,
            password,
            passwordConfirm,
            formErrors,
            formValid,
            submitted,
            signupSuccess,
            incorrentCredentials
        } = this.state;
        const { switchModal, signUpIsOpen, closeModals } = this.props;
        return (
            <Modal
                className="Modal Modal-SignUp"
                overlayClassName="Overlay Overlay-Login"
                isOpen={signUpIsOpen}
                onRequestClose={closeModals}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="Modal-content">
                    <div className="Heading">
                        <h3>
                            <span>Get started</span>
                        </h3>
                    </div>
                    <div className="Agreement-Notice signup-agreement">
                        <span>
                            By signing up, you agree with our Terms, Privacy
                            Policy, and Cookie Policy.
                        </span>
                    </div>
                    <div className="User-Inputs">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-item">
                                <div className="modal-item-title">
                                    <span>Name</span>
                                </div>
                                <div className="modal-item-content">
                                    <label className="modal-input-container">
                                        <div className="modal-input-content">
                                            <input
                                                required
                                                type="text"
                                                name="firstName"
                                                placeholder={
                                                    submitted && !firstName
                                                        ? 'First Name Required'
                                                        : 'First'
                                                }
                                                value={firstName}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted && !firstName
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />
                                            <input
                                                required
                                                type="text"
                                                name="lastName"
                                                placeholder={
                                                    submitted && !lastName
                                                        ? 'Last Name Required'
                                                        : 'Last'
                                                }
                                                value={lastName}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted && !lastName
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-item">
                                <div className="modal-item-title">
                                    <span>Location</span>
                                </div>
                                <div className="modal-item-content">
                                    <label className="modal-input-container">
                                        <div className="modal-input-content">
                                            <Dropdown
                                                className="location-dd"
                                                headerClassName="modal-input location-dd"
                                                listClassName=""
                                                optionClassName=""
                                                placeholder="Select a city"
                                                list={this.state.arrayOfCities}
                                                // placeholderOptionEnabled={true}
                                                onChange={this.handleCityChange}
                                                value={city}
                                            />
                                            <Dropdown
                                                className="location-dd"
                                                headerClassName="modal-input location-dd"
                                                listClassName=""
                                                optionClassName=""
                                                placeholder="Select a state"
                                                list={this.state.arrayOfStates}
                                                // placeholderOptionEnabled={true}
                                                onChange={
                                                    this.handleStateChange
                                                }
                                                value={state}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-item">
                                <div className="modal-item-title">
                                    <span>Email</span>
                                </div>
                                <div className="modal-item-content">
                                    <label className="modal-input-container">
                                        <div className="modal-input-content">
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                placeholder={
                                                    submitted && !email
                                                        ? 'Email Required'
                                                        : 'e.g. john@mail.com'
                                                }
                                                value={email}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted && !email
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    !formErrors.email &&
                                                    email.length > 0
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-item">
                                <div className="modal-item-title">
                                    <span>Username</span>
                                </div>
                                <div className="modal-item-content">
                                    <label className="modal-input-container">
                                        <div className="modal-input-content">
                                            <input
                                                required
                                                type="text"
                                                name="username"
                                                placeholder={
                                                    submitted && !username
                                                        ? 'Username Required'
                                                        : 'e.g. johnistheman'
                                                }
                                                value={username}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted && !username
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    !formErrors.username &&
                                                    username.length > 1
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-item">
                                <div className="modal-item-title">
                                    <span>Password</span>
                                </div>
                                <div className="modal-item-content">
                                    <label className="modal-input-container">
                                        <div className="modal-input-content">
                                            <input
                                                required
                                                type="password"
                                                name="password"
                                                placeholder={
                                                    submitted && !password
                                                        ? 'Password Required'
                                                        : '8-15 characters'
                                                }
                                                value={password}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted && !password
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    !formErrors.password &&
                                                    password.length > 0
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />

                                            <input
                                                required
                                                type="password"
                                                name="passwordConfirm"
                                                placeholder={
                                                    submitted &&
                                                    !passwordConfirm
                                                        ? 'Confirm Password'
                                                        : 'Confirm Password'
                                                }
                                                value={passwordConfirm}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`modal-input ${
                                                    submitted &&
                                                    !passwordConfirm
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    incorrentCredentials
                                                        ? 'input_error'
                                                        : ''
                                                } ${
                                                    !formErrors.passwordConfirm &&
                                                    passwordConfirm.length > 0
                                                        ? 'input_error'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-item">
                                <div className="modal-item-content">
                                    <button
                                        className="btn btn-signup-submit"
                                        type="submit"
                                        disabled={!formValid}
                                    >
                                        <span>
                                            {this.state.submitted ? (
                                                <img
                                                    src={loadingSpinner}
                                                    alt="spinner"
                                                />
                                            ) : (
                                                'Sign Up'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {signupSuccess && (
                                <div className="credentials_success">
                                    <span>Account created!</span>
                                </div>
                            )}
                            {incorrentCredentials && (
                                <div className="credentials_error">
                                    <span>Missing Credentials</span>
                                </div>
                            )}
                            <div
                                className="Login-Trouble"
                                onClick={switchModal}
                            >
                                <span>
                                    {signupSuccess
                                        ? 'Login now'
                                        : 'Already have an account?'}
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ModalSignUp;

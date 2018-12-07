import React, { Component } from 'react';
import { history } from '../../history';
import Modal from 'react-modal';
import loadingSpinner from '../images/icons/loading-spinner.gif';

class ModalLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            incorrentCredentials: false,
            loginAttempt: 0
        };
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { username, password, loginAttempt } = this.state;
        const { handleLogin } = this.props;
        if (!username.length || !password.length) return;
        this.setState({ submitted: true });
        const loginStatus = await handleLogin(username, password);
        if (loginStatus) {
            history.push('/App');
        } else {
            this.setState({
                incorrentCredentials: true,
                loginAttempt: loginAttempt + 1
            });
        }
        this.setState({ submitted: false });
    };

    render() {
        const {
            username,
            password,
            incorrentCredentials,
            submitted,
            loginAttempt
        } = this.state;
        const { switchModal } = this.props;
        return (
            <Modal
                className="Modal Modal-Login"
                overlayClassName="Overlay Overlay-Login"
                isOpen={this.props.loginIsOpen}
                onRequestClose={this.props.closeModals}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="Modal-content">
                    <div className="Heading">
                        <h3>
                            <span>Welcome back!</span>
                        </h3>
                    </div>
                    <div className="Agreement-Notice">
                        <span>
                            By clicking log in, you agree with our Terms,
                            Privacy Policy, and Cookie Policy.
                        </span>
                    </div>
                    <div className="User-Inputs">
                        <form className="Login" onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className={
                                    `login-input` +
                                    ` ${
                                        submitted && !username
                                            ? 'input_error'
                                            : ''
                                    }` +
                                    ` ${
                                        incorrentCredentials
                                            ? 'input_error'
                                            : ''
                                    }`
                                }
                                name="username"
                                placeholder={
                                    submitted && !username
                                        ? 'Username Required'
                                        : 'Username'
                                }
                                value={username}
                                onChange={this.handleInputChange}
                            />
                            <input
                                type="password"
                                className={
                                    `login-input` +
                                    ` ${
                                        submitted && !password
                                            ? 'input_error'
                                            : ''
                                    }` +
                                    ` ${
                                        incorrentCredentials
                                            ? 'input_error'
                                            : ''
                                    }`
                                }
                                name="password"
                                placeholder={
                                    submitted && !password
                                        ? 'Password Required'
                                        : 'Password'
                                }
                                value={password}
                                onChange={this.handleInputChange}
                            />
                            <button
                                className="btn btn-login-submit"
                                type="submit"
                            >
                                <span>
                                    {this.state.submitted ? (
                                        <img
                                            src={loadingSpinner}
                                            alt="spinner"
                                        />
                                    ) : (
                                        'Login'
                                    )}
                                </span>
                            </button>
                            {incorrentCredentials && (
                                <div className="credentials_error">
                                    <span>Incorrect Credentials</span>
                                </div>
                            )}
                            {loginAttempt >= 5 && (
                                <div className="Login-Trouble">
                                    <span>Trouble Logging In?</span>
                                </div>
                            )}
                            <div
                                className="Login-Trouble"
                                onClick={switchModal}
                            >
                                <span>Register</span>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ModalLogin;

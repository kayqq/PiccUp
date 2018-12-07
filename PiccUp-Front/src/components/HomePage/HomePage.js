import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { history } from '../../history';
import { bindActionCreators } from 'redux';
import { login, tokenLogin, signup } from '../../actions';
import './HomePage.css';
import ModalSignUp from './ModalSignUp';
import ModalLogin from './ModalLogin';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginIsOpen: false,
            signUpIsOpen: false
        };
    }

    async componentDidMount() {
        const { tokenLogin } = this.props;
        const token = localStorage.getItem('token');
        if (this.props.isAuthenticated === true) {
            history.push('/App');
        }
        if (token) {
            const loginStatus = await tokenLogin(token);
            if (loginStatus) {
                history.push('/App');
            }
        }
    }
    openModal = state => {
        this.setState({ [state]: true });
    };

    closeModals = () => {
        this.setState({
            loginIsOpen: false,
            signUpIsOpen: false
        });
    };

    switchModal = () => {
        this.setState(prevState => ({
            loginIsOpen: !prevState.loginIsOpen,
            signUpIsOpen: !prevState.signUpIsOpen
        }));
    };

    render() {
        return (
            <div className="HomePage">
                <div className="navbar-home">
                    <div className="nav-home-content">
                        <div className="navbar-home-item home-title">
                            <span>
                                <h1>PiccUP</h1>
                            </span>
                        </div>
                        {/* <div className="navbar-home-item">
                            <h2>
                                <span>Create</span>
                            </h2>
                            <h2>
                                <span>Meet</span>
                            </h2>
                            <h2>
                                <span>Play</span>
                            </h2>
                        </div> */}
                        <div className="navbar-home-item">
                            <button
                                className="login-button"
                                onClick={() => this.openModal('loginIsOpen')}
                            >
                                <span>LOG IN</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="HomePage-content">
                    <h1>
                        <span>CHALLENGE LOCALS</span>
                    </h1>
                    <button
                        className="sign-up-button"
                        onClick={() => this.openModal('signUpIsOpen')}
                    >
                        <span>Sign Up</span>
                    </button>
                </div>

                <ModalLogin
                    handleLogin={this.props.login}
                    loginIsOpen={this.state.loginIsOpen}
                    switchModal={this.switchModal}
                    closeModals={this.closeModals}
                />
                <ModalSignUp
                    handleSignup={this.props.signup}
                    signUpIsOpen={this.state.signUpIsOpen}
                    switchModal={this.switchModal}
                    closeModals={this.closeModals}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.userReducer.isAuthenticated
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            tokenLogin,
            signup
        },
        dispatch
    );

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomePage)
);

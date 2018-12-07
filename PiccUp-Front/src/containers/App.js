import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../history';

import { PrivateRoute } from '../components/HomePage/PrivateRoute';
import HomePage from '../components/HomePage/HomePage';
import PiccUp from './PiccUp';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute
                            exact
                            path="/App"
                            isAuthenticated={this.props.isAuthenticated}
                            component={PiccUp}
                        />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.userReducer.isAuthenticated
    };
};

export default connect(mapStateToProps)(App);

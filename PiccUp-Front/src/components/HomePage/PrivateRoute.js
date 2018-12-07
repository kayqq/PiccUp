import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            )
        }
    />
);

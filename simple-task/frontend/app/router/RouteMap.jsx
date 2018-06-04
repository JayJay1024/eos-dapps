import React, { Component } from 'react';

import {
    HashRouter,
    Route
  } from 'react-router-dom';

import App from '../containers/App';
import SimpleTask from '../components/SimpleTask';

class RouterMap extends React.Component {
    render() {
        return (
            <HashRouter history={this.props.history}>
                <App>
                     <Route exact path="/" component={SimpleTask} />
                </App>
            </HashRouter>
        )
    }
}

export default RouterMap
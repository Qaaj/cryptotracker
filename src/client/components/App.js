import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>{this.props.price || "Loading..."}</h1>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        price: state.prices.price,
    }
}


export default connect(mapStateToProps)(App);

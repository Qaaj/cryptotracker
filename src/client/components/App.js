import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const AppHeader = styled.h1`
    font-size: 40px;
    text-align: center;
	color: palevioletred;
`;


class App extends Component {
    render() {

        return (
            <div>
                <AppHeader>{this.props.price || "Loading..."}</AppHeader>
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

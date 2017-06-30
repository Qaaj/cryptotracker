import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SettingActions from '../redux/SettingRedux';

const AppHeader = styled.h1`
    font-size: 40px;
    text-align: center;
	color: palevioletred;
`;


class App extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    doStuff(){
        this.props.addPair('COOL','STUFF');
    }

    render() {

        return (
            <div>
                <AppHeader onClick={()=>this.doStuff()}>Data: {this.props.price || "Loading..."} - {this.state.txt}</AppHeader>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        price: state.prices.price,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPair: (data) => dispatch(SettingActions.addPair(data)),
        removePair: (data) => dispatch(SettingActions.removePair(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);

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
        if(props.socket){
            props.socket.on(props.worker + ':time', function(timeString) {
                console.log('Only for this worker: ' + timeString);
            });
            props.socket.on('time', function(timeString) {
                console.log('For everyone: ' + timeString);
            });
        }
    }

    doStuff(){
        this.props.addPair('COOL','STUFF');
    }

    render() {

        return (
            <div>
                <AppHeader onClick={()=>this.doStuff()}>{this.props.price || "Loading..."}</AppHeader>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
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

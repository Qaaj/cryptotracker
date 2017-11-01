import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SettingActions from '../redux/SettingRedux';
import {DatePicker, message} from 'antd';

const AppHeader = styled.h1`
    font-size: 40px;
    text-align: center;
	  color: palevioletred;
`;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {date: '',};
  }

  doStuff() {
    this.props.addPair('COOL', 'STUFF');
  }

  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({date});
  }

  render() {

    return (
      <div>
        <AppHeader onClick={() => this.doStuff()}>{this.props.price || "Loading..."}</AppHeader>
        <DatePicker onChange={value => this.handleChange(value)}/>
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
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


export default connect(mapStateToProps, mapDispatchToProps)(App);

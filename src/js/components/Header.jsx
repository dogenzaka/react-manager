'use strict';

import React from 'react';
import mui from 'material-ui';
import HeaderStore from '../stores/HeaderStore';
import AppLeftNav from './AppLeftNav.jsx';

let { AppBar } = mui;

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: HeaderStore.state.title,
      subTitle: HeaderStore.state.subTitle,
    };

    this._setState = this._setState.bind(this);
    this._didTapMenuIcon = this._didTapMenuIcon.bind(this);
  }

  componentWillMount() {
    HeaderStore.addListener(this._setState);
  }

  componentWillUnmount() {
    HeaderStore.removeListener(this._setState);
  }

  _setState(state) {
    this.setState(state);
  }

  _didTapMenuIcon() {
    this.refs.leftNav.toggle();
  }

  render() {

    let className = 'mui-dark-theme';
    if (this.state.expanded) {
      className += ' expanded';
    }

    let style = {
      position: 'fixed',
      width: '100%',
      zIndex: 10,
    };

    return (
      <header style={style}>
        <AppLeftNav ref="leftNav" />
        <AppBar
          className={className}
          title={this.state.title}
          zDepth={1}
          onLeftIconButtonTouchTap={this._didTapMenuIcon} />
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
  onTapMenu: React.PropTypes.func,
};

export default Header;



import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenuContainer from '../SideMenu';
import styles from './styles';

class NavigationDrawer extends React.Component {
  componentDidMount() {
    Actions.refresh({ key: 'drawer', ref: this.drawer });
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <Drawer
        type="overlay"
        ref={(drawer) => { this.drawer = drawer; }}
        open={state.open}
        onOpen={() => {
          Actions.refresh({ key: state.key, open: true });
        }}
        onClose={() => {
          Actions.refresh({ key: state.key, open: false });
        }}
        content={
          <SideMenuContainer toggleDrawer={() => this.drawer.toggle()} language={this.props.language} />
        }
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={styles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2, backgroundColor: 'black' },
        })}
        elevation={18}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

// Setting propTypes definition
NavigationDrawer.propTypes = {
  onNavigate: React.PropTypes.func,
  navigationState: React.PropTypes.shape({
    children: React.PropTypes.array,
  }),
};

const mapStateToProps = state => ({
  language: state.language,
});

export default connect(mapStateToProps)(NavigationDrawer);


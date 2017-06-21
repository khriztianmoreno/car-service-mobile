import React from 'react';
import { ScrollView, View, ListView, Keyboard, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalListItem from './ModalListItem';
import G_STYLES from './../../config/styles';

const MAX_REGS = 50;

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.baseData = props.data;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const renderContent = props.emptyInitial ? [] : this.baseData;
    this.state = {
      data: ds.cloneWithRows(renderContent), //.slice(0, MAX_REGS)),
    };
  }

  handleSearch(value) {
    const regexp = new RegExp(`^${value}.*`, 'i');
    const filtered = this.baseData
      .filter(v => regexp.test(v));
      // .slice(0, MAX_REGS);
    const res = value ? filtered : [];
    this.setState(prevState => ({
      data: prevState.data.cloneWithRows(res),
    }));
  }

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.data.length > this.baseData.length) {
      this.baseData = nextProps.data;
      // TODO: Update the current list
    }
  }*/

  selectValue(val) {
    const { id, onSelect } = this.props;
    onSelect(val, id);
    Keyboard.dismiss();
    Actions.pop();
  }

  render() {
    return (
      <View style={[G_STYLES.modal.container]}>
        <SearchBar
          lightTheme
          onChangeText={v => this.handleSearch(v)}
          placeholder={this.props.placeholder || 'Buscar'}
        />
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps
        >
          { this.state.data.getRowCount() > 0
            ? <ListView
              initialListSize={25}
              pageSize={1}
              enableEmptySections
              dataSource={this.state.data}
              renderRow={(rData, _, rowID) => (
                <ModalListItem
                  item={rData}
                  onSelect={val => this.selectValue(val)}
                  bgColor={rowID % 2 === 0 ? 'white' : '#EFEFEF'}
                />
              )}
              keyboardShouldPersistTaps
            />
            : <View style={{ alignItems: 'center', paddingHorizontal: 50, paddingVertical: 25 }}>
              <Icon name="search" size={80} color="grey" />
              <Text style={{ textAlign: 'center', color: '#CCC', fontSize: 18 }}>
                {this.props.searchMessage}
              </Text>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

SearchModal.propTypes = {
  data: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  id: React.PropTypes.string,
  emptyInitial: React.PropTypes.bool,
  searchMessage: React.PropTypes.string,
  placeholder: React.PropTypes.string,
};

export default SearchModal;

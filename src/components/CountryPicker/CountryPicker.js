import React from 'react';
import { View,
  Text,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import countries from './../../data/countries.json';
import styles from './styles';

const R = require('ramda');

const Letter = props => (
  <TouchableOpacity onPress={() => props.filterLetter(props.children)}>
    <View style={styles.letter}>
      <Text style={styles.letterText}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

const CountryItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.listItemContainer}>
        <View style={styles.flag}>
          <Image source={{ uri: countries[props.country.cca2].flag, height: 20, width: 26.66 }} />
        </View>
        <Text>{props.country.name.spa}</Text>
      </View>
    </TouchableOpacity>
  );
};

// const CountryPicker = (props) => {
class CountryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.data),
    };
  }

  componentWillReceiveProps(nProps) {
    this.setState(prevState => ({
      dataSource: prevState.dataSource.cloneWithRows(nProps.data),
    }));
  }

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.countryList}>
          <ListView
            keyboardShouldPersistTaps
            initialListSize={5}
            pageSize={1}
            dataSource={this.state.dataSource}
            enableEmptySections
            renderRow={code => (
              <CountryItem
                country={R.merge(countries[code], { cca2: code })}
                onSelect={() => props.onSelect(code)}
              />
            )}
          />
        </View>
        <View style={styles.lettersContainer}>
          <View style={styles.backIcon}>
            <TouchableOpacity onPress={this.props.close}>
              <Icon name="arrow-back" size={30} color="grey" />
            </TouchableOpacity>
          </View>
          <ScrollView
            keyboardShouldPersistTaps
            contentContainerStyle={styles.lettersList}
            style={{ flex: 1 }}
          >
            {
              props.letters.map((letter, i) => (
                <Letter key={i} filterLetter={props.filterLetter}>
                  {letter}
                </Letter>
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

CountryPicker.propTypes = {
  letters: React.PropTypes.arrayOf(React.PropTypes.string),
  filterLetter: React.PropTypes.func,
  close: React.PropTypes.func,
  data: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default CountryPicker;

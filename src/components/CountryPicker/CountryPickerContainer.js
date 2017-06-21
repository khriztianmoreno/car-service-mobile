import React from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import R from 'ramda';

import CountryPicker from './CountryPicker';
import countries from './../../data/countries.json';

const filterByLetter = (letter) => {
  const regexp = new RegExp(`^${letter}.*`);
  return Object
    .keys(countries)
    .filter(k => regexp.test(countries[k].name.spa));
};

class CountryPickerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCountries: filterByLetter('A'),
      value: 'CO',
      opened: false,
    };
    this.letters = R.range(65, 91).map(dig => String.fromCharCode(dig));
  }

  onSelect(code) {
    this.setState({ value: code });
    this.props.onChangeValue(R.merge(countries[code], { cca2: code }));
    this.toggleModal();
  }

  filterCountries(letter) {
    const filtered = filterByLetter(letter);
    this.setState({
      currentCountries: filtered,
    });
  }

  toggleModal() {
    this.setState(prevState => ({
      opened: !prevState.opened,
    }));
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.state.opened}
          animationType="fade"
          transparent={false}
          onRequestClose={() => this.toggleModal()}
        >
          <CountryPicker
            letters={this.letters}
            data={this.state.currentCountries}
            filterLetter={letter => this.filterCountries(letter)}
            onSelect={country => this.onSelect(country)}
            close={() => this.toggleModal()}
          />
        </Modal>
        <TouchableOpacity onPress={() => this.toggleModal()}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: countries[this.state.value].flag, width: 26.66, height: 20 }} />
            <Text style={{ marginLeft: 8 }}>
              {countries[this.state.value].name.spa}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CountryPickerContainer.propTypes = {
  onChangeValue: React.PropTypes.func.isRequired,
};

export default CountryPickerContainer;

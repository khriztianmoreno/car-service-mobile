import React from 'react';
import {
  Container, Content, Picker,
  Form, Input, Item, Label, Text, InputGroup, Button,
} from 'native-base';

import I18n from 'react-native-i18n';

import styles from './styles';

const Configuration = (props) => {
  return (
    <Container>
      <Content style={styles.content}>

        <InputGroup style={styles.inputgroup_underline} underline>
          <Text>{I18n.t('configuration.labelTitle')}</Text>
        </InputGroup>

        <Form style={styles.form}>
          <Item stackedLabel>
            <Label>{I18n.t('configuration.tagUser')}</Label>
            <Input
              multiline
              editable={false}
              value={props.user.name}
            />
          </Item>

          <Item stackedLabel>
            <Label>{I18n.t('configuration.tagEmail')}</Label>
            <Input
              multiline
              editable={false}
              value={props.user.email}
            />
          </Item>

          <Picker
            style={styles.picker}
            mode="dropdown"
            selectedValue={props.language}
            onValueChange={(value) => {
              props.setLanguage(value);
            }}
          >
            {
              props.languages.map((item, index) => {
                return (
                  <Picker.Item key={index} label={item.label} value={item.value} />
                );
              })
            }
          </Picker>

          <Item fixedLabel>
            <Label>{I18n.t('configuration.tagVersion')}</Label>
            <Input
              editable={false}
              value="3.1.12"
            />
          </Item>

          <Button
            block
            primary
            style={styles.button__save}
            onPress={() => {
              props.saveChanges(props.language);
              const uObject = props.user;
              uObject.additionalData.language = props.language;
              props.setUser(uObject);
              // props.setLanguage(props.language);
              I18n.locale = props.language;
            }}
          >
            <Text>{I18n.t('configuration.btnSave')}</Text>
          </Button>

          <Button
            block
            danger
            style={styles.button__close}
            onPress={() => props.logout()}
          >
            <Text>{I18n.t('configuration.btnLogout')}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Configuration;

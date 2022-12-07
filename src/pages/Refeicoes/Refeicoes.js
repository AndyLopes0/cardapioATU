import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Modal, Button, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Api from '../../services/API';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      refeicoes: []
    };
  }

  componentDidMount() {
    self = this;

    Api.get('/refeicao/all')
    .then(function (response) {
      self.setState({"refeicoes": response.data.itens})
    });
  
  }

  render () {

    const Itens = this.state.refeicoes.map((refeicao) => {
      return (
        <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}
          onPress={() => {
            this.setState({ isVisible: true });
          }}
        >
          <Image
            source={require("./índice.jpeg")}
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonBackStyle}>
            {refeicao.descricao}
          </Text>
        </TouchableOpacity>
      );
    });

    return(
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: false });
          }}
        >

          <View style={styles.modal}>
            <TextInput
            placeholder= "Mátricula"
            style = {styles.input}
            keyboardType = "numeric"
            />
          <TouchableOpacity
          style={styles.buttonTextStyle}
          activeOpacity={0.5}
          onPress={() => {
            this.setState({ isVisible: false });
          }}
        >
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonBackStyle}>Voltar</Text>
        </TouchableOpacity>
        
          
          </View>
        </Modal>
        
        {Itens}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 200,
    padding: 30
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 100,
  },
  text: {
    color: '#000000',
    marginTop: 10,
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: '#DDD',
    borderRadius: 5,
    fontSize: 20,
    padding: 5
  },
  buttonFacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#63BF6A",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 70,
    borderRadius: 5,
    margin: 5
  },
  buttonImageIconStyle: {
    padding: 30,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: "stretch"
  },
  buttonBackStyle: {
    color: "#fff",
    marginBottom: 4,
    marginLeft: 10,
    backgroundColor: "#026873",
  },
  buttonTextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginLeft: 10
  },
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 40
  }
});


import React, { useState , useEffect , useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TextInput,
} from 'react-native';

import api from './src/Servico/api';

export default function myApp(){

  const [cep , setCep] = useState('');
  const [cepUser , setCepUser] = useState('');

  async function search(){
    if( cep === ''){
      alert('PorFavor, informe um CEP válido');
      setCep('');
      return;
    }try{
      const response = await api.get(`/${cep}/json/`)
      setCepUser(response.data);
      console.log(response.data);
      Keyboard.dismiss();
    }
    catch(erro){
      console.log('Erro: ' + error);
    }
  }

  function clean(){
    setCep('');
    setCepUser('');
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSearch}> 
        <Text style={styles.title}> Informe um CEP válido </Text>
        <TextInput 
          style={styles.input}
          onChangeText={(texto) => setCep(texto)}
          keyboardType={'numeric'}
          value={cep}
        />
        <View style={styles.viewButtons}> 
          <TouchableOpacity style={styles.btnSearch} onPress={search}>
            <Text style={styles.textBtnSearch}> BUSCAR </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnClean} onPress={clean}>
            <Text style={styles.textBtnClean}> LIMPAR </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewResult}>
        <Text style={styles.textResult} > CEP: {cepUser.cep} </Text>
        <Text style={styles.textResult} > LOGRADOURO: {cepUser.logradouro} </Text>
        <Text style={styles.textResult} > COMPLEMENTO: {cepUser.complemento} </Text>
        <Text style={styles.textResult} > BAIRRO: {cepUser.bairro} </Text>
        <Text style={styles.textResult} > CIDADE: {cepUser.localidade}</Text>
        <Text style={styles.textResult} > ESTADO: {cepUser.uf}</Text>
      </View> 
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12073E',
  },
  viewResult:{
    height: 490,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  viewSearch:{
    height: 250,
    backgroundColor: '#12073E',
  },
  title:{
    fontSize: 25,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center'
  },
  input:{
    width: '80%',
    borderWidth: 2,
    marginTop: 10,
    color : '#fff',
    fontSize: 22,
    padding: 10,
    borderColor: '#fff',
    borderRadius: 7,
    marginLeft: 40
  },
  viewButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  btnSearch:{
    borderWidth: 4,
    borderColor: '#000',
    width: '30%',
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnSearch:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnClean:{
    borderWidth: 4,
    borderColor: '#000',
    width: '30%',
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnClean:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textResult:{
    marginTop: 40,
    fontSize: 23,
    fontWeight: 'bold'

  }
});
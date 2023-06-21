import React, { useContext } from 'react';
import GlobalStateContext from '../global/globalStateContext';
import { View, StyleSheet, Modal } from 'react-native';
import FormEditarReceita from './formEditarReceita';

const ModalMessage = ({ showModal, receita, setShowModal }) => {

  //Componente que renderiza um modal com formulario para edicao de receita.

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FormEditarReceita receita={receita} setShowModal={setShowModal} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

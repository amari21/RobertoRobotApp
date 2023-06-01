import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import RobertoRobot from './src/RobertoRobot.png';
import GearSolid from './src/gear-solid.png';
import Down from './src/down.png';
import Up from './src/up.png';
import Right from './src/right.png';
import Left from './src/left.png';
import Stop from './src/stop.png';

const App = () => {
  const [ipAddress, setIpAddress] = useState('192.168.43.120');
  const [modalVisible, setModalVisible] = useState(false);
  const [tempIpAddress, setTempIpAddress] = useState(ipAddress);

  const sendCommand = (command) => {
    const url = `http://${ipAddress}/control?command=${command}`;
    console.log(url);
    fetch(url)
      .then(response => {
        console.log(`Respuesta del servidor: ${response.status} ${response.statusText}`);
      })
      .catch(error => {
        console.error(`Error al enviar el comando: ${error}`);
      });
  };

  const handleGuardar = () => {
    setIpAddress(tempIpAddress);
    setModalVisible(false);
  };

  const handleCancelar = () => {
    setModalVisible(false);
    setTempIpAddress(ipAddress);
  };

  const ImageButton = ({ onPress, source, style }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={style}>
          <Image source={source} style={styles.buttonImage} />
        </View>
      </TouchableOpacity>
    );
  };
  
  const ImageButtonArrow = ({ onPressIn, onPressOut, source, style }) => {
    return (
      <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={style}>
          <Image source={source} style={styles.buttonImage} />
        </View>
      </TouchableOpacity>
    );
  };  

  return (
    <View style={styles.container}>
        <View style={styles.gearContainer}>
            <ImageButton
                onPress={() => setModalVisible(true)}
                source={GearSolid}
                style={styles.gearButton}
            />
        </View>
        <Image
            source={RobertoRobot} 
            style={styles.image}>
        </Image>
        <View style={styles.controllerContainer}>
            <View style={[styles.buttonContainer, { marginRight: 150 }]}>
                <View style={[styles.row, { top: 10 }]}>
                    <ImageButtonArrow
                        onPressIn={() => sendCommand('forward')}
                        onPressOut={() => sendCommand('stop')}
                        source={Up}
                        style={styles.arrowButton}
                    />
                    {/* <Button
                        title="Mover hacia adelante"
                        onPressIn={() => sendCommand('forward')}
                        onPressOut={() => sendCommand('stop')}
                    >
                    </Button> */}
                </View>
                <View style={styles.row}>
                    <View style={{ marginRight: 80 }}>
                        <ImageButtonArrow
                            onPressIn={() => sendCommand('left')}
                            onPressOut={() => sendCommand('stop')}
                            source={Left}
                            style={styles.arrowButton}
                        />
                    </View>
                    <ImageButtonArrow
                        onPressIn={() => sendCommand('right')}
                        onPressOut={() => sendCommand('stop')}
                        source={Right}
                        style={styles.arrowButton}
                    />
                    {/* <Button
                        title="Mover hacia la izquierda"
                        onPressIn={() => sendCommand('left')}
                        onPressOut={() => sendCommand('stop')}
                    />
                    <Button
                        title="Mover hacia la derecha"
                        onPressIn={() => sendCommand('right')}
                        onPressOut={() => sendCommand('stop')}
                    /> */}
                </View>
                <View style={[styles.row, { bottom: 10 }]}>
                    <ImageButtonArrow
                        onPressIn={() => sendCommand('backward')}
                        onPressOut={() => sendCommand('stop')}
                        source={Down}
                        style={styles.arrowButton}
                    />
                    {/* <Button
                        title="Mover hacia atrás"
                        onPressIn={() => sendCommand('backward')}
                        onPressOut={() => sendCommand('stop')}
                    /> */}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ImageButton
                    onPress={() => sendCommand('stop')}
                    source={Stop}
                    style={styles.stopButton}
                />
            </View>
        </View>
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.h1}>Configuración de IP</Text>
                        <View style={styles.hr} />
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>IP</Text>
                            <TextInput
                            style={styles.input}
                            value={tempIpAddress}
                            onChangeText={text => setTempIpAddress(text)}
                            />
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity onPress={handleGuardar} style={styles.buttonGreen}>
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                            <Text>{'\n'}</Text>
                            <TouchableOpacity onPress={handleCancelar} style={styles.buttonRed}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9CCE3',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
    controllerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonArrow: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      },
    buttonGreen: {
        borderRadius: 10,
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonRed: {
        borderRadius: 10,
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    hr: {
        borderBottomColor: '#CFCFCF',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 30,
    },
    formContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderRadius: 10,
        height: 40,
        width: 1,
        borderColor: '#CFCFCF',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        position: 'absolute',
        right: 250,
        justifyContent: 'center',
        opacity: 1,
    },
    gearContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    gearButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
    buttonImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    arrowButton: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    stopButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

export default App;

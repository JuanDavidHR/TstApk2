import { StatusBar } from 'expo-status-bar';
import React ,{ useState, useEffect }from 'react';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import { Map, Modal, Panel,Input,List } from './components';
import * as Location from 'expo-location'
import Constants from 'expo-constants'

export default function App() {
  const [locacion,setLocacion] = useState({})
  const [puntos, setPuntos] = useState([])
  const [puntoTemp, setPuntoTemp] = useState({})
  const [nombre, setNombre] = useState('')
  const [visibilityFilter, setVisibilityFilter] = useState('new_punto')
  const [visibility, setVisibility] = useState(false)
  const [pointsFilter, setPointsFilter] = useState(true)

  const togglePointsFilter =() => setPointsFilter(!pointsFilter) 
  
  
  const handleLongPress = ({ nativeEvent }) =>{
    setVisibilityFilter('new_punto')
    setPuntoTemp( nativeEvent.coordinate )
    setVisibility(true)
  }

  const handleChangeText = text => {
    setNombre(text)
  }

  const handleSubmit = () =>{
    const newPunto ={ coordinate: puntoTemp, name: nombre};
    setPuntos(puntos.concat(newPunto))
    setVisibility(false)
    setNombre('')
  }

  const handleLista = () => {
    setVisibilityFilter('all_puntos')
    setVisibility(true)
  }
  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} puntos={puntos} pointsFilter={pointsFilter} />
      <Panel onPressLeft ={handleLista} textLeft='Lista' togglePointsFilter={togglePointsFilter}/> 
      <Modal visibility={visibility}>
        {visibilityFilter === 'new_punto' 
            ?
            <>
              <Input title="Nombre" placeholder="Nombre del punto" onChangeText={handleChangeText} />
              <Button title="Aceptar" onPress={handleSubmit} />
            </>
          
          :   <List puntos={puntos} closeModal={()=> setVisibility(false)}/>
        }
      </Modal> 
       
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 20,
  },
 
});

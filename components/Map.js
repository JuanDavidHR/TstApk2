import React from 'react';
import MapView, { Marker }from 'react-native-maps';


import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';


export default ({ onLongPress, puntos, pointsFilter, locacion }) => {

    return(
        <MapView style={styles.map}
            onLongPress={onLongPress}
        >
            {pointsFilter && puntos.map(x =>
                <Marker 

                    key={x.name}
                    coordinate={x.coordinate}
                    title={x.name}
                />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height : Dimensions.get('window').height-150,
        width : Dimensions.get('window').width,
    },
})
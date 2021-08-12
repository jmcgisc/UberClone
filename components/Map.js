import React , { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, selectDestination } from '../slices/navSlice';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from "react";
import { useDispatch } from 'react-redux';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
         if(!origin || !destination ) return;
         //Zoom & fit to markers
         mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
             edgePadding: {  top: 50, right: 50, bottom: 50, left: 50 },
         });
    }, [origin,destination]);

    useEffect(() => {
        if(!origin || !destination) return;

            const getTravelTime = async () => {
               fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destinations.description}&key=${GOOGLE_MAPS_APIKEY}`).then(data => {
                  // console.log(data);
                  dispatch(selectTravelTime(data.rows[0].elements[0]));
               });
            };
        getTravelTime();
    },[origin,destination,GOOGLE_MAPS_APIKEY]);

    return (
        <MapView 
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
            initialRegion={{ 
                // latitude: origin.location.lat,
                // longitude: origin.latitude.lng,
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >   

            {origin && destination (
                <MapViewDirections 
                origen={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
                />

            )}
            {origin?.location && (
                <Marker
                    cordinate = {{
                        // latitude: origin.location.lat,
                        // longitude: origin.location.lng,
                        latitude: 37.78825,
                        longitude: -122.4324,
                        
                    }}
                    title="Origin"
                    //description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    cordinate = {{
                        // latitude: destination.location.lat,
                        // longitude: destination.location.lng,
                        latitude: 37.78825,
                        longitude: -122.4324,
                        
                    }}
                    title="Destination"
                    //description={origin.description}
                    identifier="destination"
                />
            )}

        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})

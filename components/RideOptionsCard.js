import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList , Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTime } from '../slices/navSlice';

const data = [
    {    
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1, 
        image: "https://links.papareact.com/3pn",
    },

    {    
        id: "Uber-XL-123",
        title: "Uber XL",
        multiplier: 1.2, 
        image: "https://links.papareact.com/5w8",
    },

    {    
        id: "Uber-LUX-123",
        title: "Uber LUX",
        multiplier: 1.75, 
        image: "https://links.papareact.com/7pf",
    },
]; 

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const [selected, setSelected] = useState(null);
    const navigation = useNavigation();
    const travelTimeInformation = useSelector(selectTravelTime);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity  
                    onPress= {()=> navigation.navigate("NavigateCard")}
                    style= {[tw`absolute top-3 left-5 z-50 rounded-full`]}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                
                    {/*Sin funcionar el api no podemos hacer dispatch
                     <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text}
                    </Text> */}
            </View>

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disable={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>  
                    <Text style= {tw`text-center text-white text-xl `}> 
                    Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
            data = {data}
            keyExtractor = {(item) => item.id }
            renderItem = {({ item: { id, title, multiplier, image}, item }) => (
                <TouchableOpacity 
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-10 ${
                    id === selected?.id && 'bg-gray-200'
                }`} 
                >
                    <Image  
                        style = {{ 
                            width: 100, 
                            height: 100, 
                            resizeMode: "contain", 
                        }}
                        source = {{ uri: image }}
                   />
                   <View style={tw `-ml-6`}> 
                        <Text 
                            style={tw`font-semibold`}>{title}
                       </Text>
                       <Text>
                           {/* Se neceita API
                           {travelTimeInformation?.duration?.text} */}
                           Travel Time...
                       </Text>
                   </View>
                       <Text>     
                           {new Intl.NumberFormat('en-gb', {
                               style: 'currency',
                               currency: 'EUR',
                           }).format(
                            // (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier / 100)  
                            (180 * SURGE_CHARGE_RATE * multiplier / 100)  
                           )}
                       </Text>
                </TouchableOpacity> 
                )}
            />
        </SafeAreaView>
    );
};

export default RideOptionsCard;
 

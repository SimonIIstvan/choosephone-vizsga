import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Svg, { Path, Circle } from "react-native-svg";
import { getPhones } from '../api/phoneService';

const telefonok = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      setLoading(true);
      const phones = await getPhones();
      setPhones(phones);
      setError(null);
    } catch (error) {
      setError("Nem sikerült betöltenin!! ", error);
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  };

  const renderPhones = ({ item }) => (
    <View className="border-purple-200 border-1 flex-1 flex-row p-2 bg-slate-200 rounded-md shadow-md shadow-indigo-500/50 mb-4">
      <View className=" min-w-40 min-h-48 flex-1 items-center justify-center mr-4">
        <Image className="w-full h-full" source={{ uri: item.kepUrl }} resizeMode='contain' />
      </View>
      <View className="flex-1 items-center">
        <Text className="text-pretty font-bold text-lg color-slate-700 border-b-2 border-purple-700 pb-1">{item.marka} {item.modell}</Text>
        <Text className="text-pretty font-bold text-md color-slate-700 pt-2">Megjelenési év: {item.megjelenes_ev}</Text>
        <Text className="text-pretty font-bold text-md color-slate-600 pt-2">Kijelző mérete: {item.display.kijelzo_meret}"</Text>
        <Text className="text-pretty font-bold text-md color-slate-700 pt-2">Memória: {item.specs.memory}GB</Text>
        <Text className="text-pretty font-bold text-md color-slate-600 py-2">Tárhely: {item.specs.tarolo_kapacitas}GB</Text>
        <Text className="text-pretty font-bold text-md color-slate-100 px-2 bg-purple-500 rounded-xl py-1">{item.ar} Ft</Text>
        
      </View>
    </View>
  );


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-100 h-full">
        <FlatList className="flex-1 items-center p-1"
          data={phones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPhones}
          refreshing={loading}
          onRefresh={fetchPhones}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

}

export default telefonok


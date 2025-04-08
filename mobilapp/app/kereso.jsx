import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { debounce } from 'lodash';
import { searchService } from '../api/searchService';
const kereso = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = debounce(async (searchText) => {
        if (searchText.length < 2) {
            setResults([]); // Clear results when query is too short
            return;
        }

        setLoading(true);

        try {
            // Meghívjuk a service-t a megfelelő term paraméterrel
            const data = await searchService.search(searchText);
            setResults(data);
        } catch (error) {
            console.error('Keresési hiba:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, 200); // 300ms késleltetés

    useEffect(() => {
        debouncedSearch(query);

        return () => {
            debouncedSearch.cancel();
        };
    }, [query]);

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
                <TextInput placeholder='Keresés..' value={query} onChangeText={setQuery} autoCapitalize='none' className='border-2 border-purple-400 rounded-md p-2' />
                <FlatList className="flex-1 items-center p-1"
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPhones}
                    ListEmptyComponent={
                        query.length > 1 && !loading ?
                            <View className="flex-1 items-center justify-center">
                                <Text className="text-pretty font-bold text-lg color-slate-800">Nincs találat</Text>
                            </View> : null

                    }
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}





export default kereso


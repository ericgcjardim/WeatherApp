import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { weatherConditions } from '../assets/WeatherConditions';
import { useState, useEffect } from 'react';
import { API_KEY } from '../ApiKeys';
export default function Weather() {

    const [weatherData, setWeather] = useState({})
    const [forecastData, setForecast] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        // navigator.geolocation.getCurrentPosition(
        //   position => {
        //     fetchWeather(position.coords.latitude, position.coords.longitude)
        //   }
        // )
        fetchWeather()
    }, [])

    const fetchWeather = async (lat = -19.9833294, lon = -43.8499966) => {
        try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
            const resForecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
            const data = await res.json()
            const dataForecast = await resForecast.json()
            setWeather(data)
            setForecast(dataForecast.list)

            console.log(dataForecast)

        } catch (error) {
            console.log(error)

        }finally{
            setLoading(false)
        }
    }





    const renderItem = ({ item }) => {
        return (
            <View style={styles.listElement}>
                <MaterialCommunityIcons size={48} name={weatherConditions[item.weather[0].main].icon} color={weatherConditions[item.weather[0].main].color} />
                <Text>
                    {item.weather[0].main}
                </Text>
                <Text>{Math.round(item.main.temp)}˚</Text>
            </View>
        )
    }

    return (

        !loading?<View style={[styles.weatherContainer, { backgroundColor: weatherConditions[weatherData.weather[0].main].color }]}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons size={48} name={weatherConditions[weatherData.weather[0].main].icon} color={'#fff'} />
                <Text style={styles.tempText}>{Math.round(weatherData.main.temp)}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherConditions[weatherData.weather[0].main].title}</Text>
                <Text style={styles.subtitle}>{weatherConditions[weatherData.weather[0].main].subtitle}</Text>
            </View>


            <FlatList
                style={styles.listForecast}
                data={forecastData}
                renderItem={renderItem}>

                keyExtractor={(item) => item.dt}

            </FlatList>

        </View>:<Text>carregando...</Text>


    );

}
const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1
    },
    headerContainer: {
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempText: {
        fontSize: 48,
        color: '#fff'
    },
    bodyContainer: {
        marginTop: 30,
        alignItems: 'flex-start',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    },
    listForecast: {



        backgroundColor: 'white',
        // borderRadiusTop: 20,
    },

    listElement: {
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#f2f2f2',
        paddingRight: 20,
    }

})
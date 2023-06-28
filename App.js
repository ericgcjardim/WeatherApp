import { StatusBar } from 'expo-status-bar';

import { SafeAreaView, StyleSheet} from 'react-native';

import AppRotas from './rotas/AppRotas';


export default function App() { 

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar />
        <AppRotas/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

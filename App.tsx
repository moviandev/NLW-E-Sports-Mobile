import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications';


import { Loader } from './src/components/Loader';
import { Background } from './src/components/Background';
import { Routes } from './src/routes';

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener(n => { });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener(r => { });

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }

  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });
  // Adicionar notificoes
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loader />}
    </Background>
  );
}

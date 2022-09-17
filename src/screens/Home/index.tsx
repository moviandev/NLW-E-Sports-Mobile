import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard/index';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.47:3333/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, []);

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
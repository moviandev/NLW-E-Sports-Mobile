import { View, Image, FlatList } from 'react-native';

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard/index';

import { GAMES } from '../../utils/games';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';


export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <GameCard data={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
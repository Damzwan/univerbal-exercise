import { Poster } from '@/ui/poster';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { movies$ } from './state';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { getMoviePoster } from '@/infrastructure/repositories/movie';

type Props = {
  style?: any;
};

export function FeaturedMovies({ style }: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(movies$));

  switch (stateLoadable.state) {
    case 'hasError':
    case 'loading': {
      return null;
    }

    case 'hasData': {
      return (
        <View style={[styles.root, style]}>
          <Text style={styles.title}>Featured Movies</Text>
          <ScrollView horizontal>
            {stateLoadable.data.map((it, index) => (
              <Poster
                key={index}
                src={getMoviePoster()}
                isFavorite
                title={it.title}
                onFavoritePress={undefined as any}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 8, // Add padding to the root View to give it space
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

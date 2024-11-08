import { Poster } from '@/ui/poster';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { featuredTvSeries$ } from './state';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { getMoviePoster } from '@/infrastructure/repositories/movie';
import { Movie } from 'domain/movie';

type Props = {
  style?: any;
  onMoviePress: (movie: any) => void; // TODO maybe better to use a state solution
};

export function FeaturedTvSeries({
  style,
  onMoviePress,
}: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(featuredTvSeries$));

  switch (stateLoadable.state) {
    case 'hasError':
    case 'loading': {
      return <ActivityIndicator />;
    }

    case 'hasData': {
      return (
        <View style={[styles.root, style]}>
          <Text style={styles.title}>Featured TV Shows</Text>
          <ScrollView horizontal>
            {stateLoadable.data.map((show, index) => (
              <Poster
                key={index}
                src={getMoviePoster()}
                isFavorite
                title={show.title}
                onMoviePress={() => onMoviePress(show)}
                onFavoritePress={() => undefined}
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

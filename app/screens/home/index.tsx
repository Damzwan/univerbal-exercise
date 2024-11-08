import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import { getMoviePoster } from '@/infrastructure/repositories/movie';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Movie } from 'domain/movie';
import { Suspense, useState, type ReactNode } from 'react';
import { Button, View, Text, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie }: { movie: Movie } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: getMoviePoster() }}
        style={{ width: 200, height: 300 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
        {movie.title}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Director: {movie.director}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Release Year: {movie.releaseYear}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Genres: {movie.genres.join(', ')}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Rating: {movie.rating}
      </Text>
    </View>
  );
};

const HomeScreenContent = () => {
  const navigation = useNavigation();
  const handleNavigateToDetails = (movie: Movie) => {
    navigation.navigate('details', { movie });
  };

  return (
    <View>
      <View style={{ marginBottom: 40 }}>
        <Search />
      </View>

      <FeaturedMovies
        style={{ marginBottom: 40 }}
        onMoviePress={handleNavigateToDetails}
      />
      {/* <FeaturedTvSeries /> */}
    </View>
  );
};

export default function HomeScreen(): ReactNode {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator initialRouteName={'home'}>
      <HomeStack.Screen name={'home'} component={HomeScreenContent} options={{ title: 'Home' }} />
      <HomeStack.Screen name="details" component={DetailsScreen} options={{ title: 'About' }} />
    </HomeStack.Navigator>
  );
}

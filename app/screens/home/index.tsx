import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import {
  getMovieByIdQuery,
  getMoviePoster,
} from '@/infrastructure/repositories/movie';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Movie } from 'domain/movie';
import { Suspense, useRef, useState, type ReactNode } from 'react';
import {
  Button,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import {
  inputValue$,
  Suggestion,
  suggestions$,
  typeFilter$,
} from '@/features/search/state';
import { getTvSeriesByIdQuery } from '@/infrastructure/repositories/tv-series';
import { Chip } from 'react-native-paper';

// TODO move to another file
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

// TODO separate file
const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const [typeFilter, setTypeFilter] = useAtom(typeFilter$);
  const suggestions = useAtomValue(loadable(suggestions$));
  const navigation = useNavigation();

  // TODO this can be done better
  // TODO fix typing
  const onPressSuggestion = async (item: any) => {
    setInputValue('');
    navigation.navigate('details', { movie: item });
  };

  const handleAddTypeFilter = (type: string) => {
    const newTypeFilter = typeFilter.includes(type)
      ? typeFilter.filter((v) => v !== type)
      : [...typeFilter, type];
    console.log(newTypeFilter);
    setTypeFilter(newTypeFilter);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginVertical: 10, padding: 4 }}>
        <Chip
          icon="movie"
          onPress={() => handleAddTypeFilter('movie')}
          selected={typeFilter.includes('movie')}
          showSelectedCheck={true}
          style={{ marginRight: 10 }}
          selectedColor={typeFilter.includes('movie') ? 'green' : 'gray'}
        >
          Movies
        </Chip>

        <Chip
          icon="television"
          onPress={() => handleAddTypeFilter('show')}
          selected={typeFilter.includes('show')}
          selectedColor={typeFilter.includes('show') ? 'green' : 'gray'}
          showSelectedCheck={true}
        >
          Shows
        </Chip>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: '#f5f5f5',
          borderRadius: 5,
        }}
      >
        <Ionicons name="search" size={24} style={{ marginRight: 10 }} />
        <TextInput
          ref={inputRef}
          style={{ flex: 1, height: 40 }}
          placeholder="type to search..."
          onChangeText={setInputValue}
          value={inputValue}
        />
      </View>

      {!inputValue ? null : (
        <View style={{ flex: 1 }}>
          {suggestions.state !== 'hasData'
            ? null
            : suggestions.data.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                  }}
                  onPress={() => onPressSuggestion(item)}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              ))}
          {suggestions.state === 'hasData' && (
            <View
              style={{ height: 1, backgroundColor: '#ddd', marginTop: 10 }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const HomeScreenContent = () => {
  const navigation = useNavigation();
  const handleNavigateToDetails = (movie: Movie) => {
    navigation.navigate('details', { movie });
  };

  return (
    <ScrollView>
      <View>
        {/* <View style={{ marginBottom: 40 }}>
          <Search />
        </View> */}

        <FeaturedMovies
          style={{ marginBottom: 40 }}
          onMoviePress={handleNavigateToDetails}
        />
        <FeaturedTvSeries
          style={{ marginBottom: 0 }}
          onMoviePress={handleNavigateToDetails}
        />
      </View>
    </ScrollView>
  );
};

export default function HomeScreen(): ReactNode {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator initialRouteName={'home'}>
      <HomeStack.Screen
        name={'home'}
        component={HomeScreenContent}
        options={{
          title: 'Home',
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity onPress={() => navigation.navigate('search')}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="details"
        component={DetailsScreen}
        options={{ title: 'About' }}
      />

      <HomeStack.Screen
        name="search"
        component={SearchScreen}
        options={{ title: '' }}
      />
    </HomeStack.Navigator>
  );
}

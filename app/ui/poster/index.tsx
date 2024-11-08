import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

type PosterProps = {
  title: string;
  src: string;
  onFavoritePress: () => void;
  isFavorite: boolean;
  styles?: StyleProp<ViewStyle>;
};

export function Poster(props: PosterProps) {
  return (
    <View style={[styles.wrapper, props.styles]}>
      {props.onFavoritePress && (
        <Pressable
          style={[
            styles.button,
            props.isFavorite
              ? {
                  backgroundColor: 'yellow',
                }
              : { backgroundColor: 'transparent' },
          ]}
          onPress={props.onFavoritePress}
        >
          {props.isFavorite ? '-' : '+'}
        </Pressable>
      )}
      <Image
        alt={props.title}
        source={{ uri: props.src }}
        style={styles.image}
      />
      <Text style={styles.movieTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button: {
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
  },
  movieTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
});

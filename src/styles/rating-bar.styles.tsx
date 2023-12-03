import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  text: {
    margin: 4,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

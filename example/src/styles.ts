import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    flex: 1,
    flexShrink: 1,
    flexBasis: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#007bff',
    margin: 4,
  },
});

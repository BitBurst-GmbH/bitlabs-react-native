import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5a',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '100%',
    flexShrink: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#007bff',
    margin: 4,
  },
});

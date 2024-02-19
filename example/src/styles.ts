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
    backgroundColor: '#ff5a55',
  },
  box: {
    width: '100%',
    flexShrink: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#dafaba',
    margin: 4,
  },
  rowButtons: {
    flexDirection: 'row',
  },
});

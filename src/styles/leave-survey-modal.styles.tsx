import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0004',
  },
  blackBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  dialog: {
    padding: 16,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  item: {
    color: '#000',
    paddingVertical: 10,
  },
});

export default styles;

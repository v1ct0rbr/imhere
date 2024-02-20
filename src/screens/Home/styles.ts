import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131016', flex: 1, padding: 24, gap: 25
  },
  containerTitle: {
    color: '#fff', fontSize: 20, fontWeight: 'bold'
  },
  eventInfo: {
    gap: 1
  },

  title: {
    color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 48
  },
  content: {
    color: '#6b6b6b', fontSize: 16, gap: 3
  },
  input: {
    height: 56,
    backgroundColor: '#1f1e25',
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
    color: '#fff',
    padding: 16,
    fontSize: 16,
    flex: 1
  },
  button: {
    width: 56,
    height: 56,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,


    backgroundColor: '#31cf67',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  },
  form: {
    width: '100%',
    flexDirection: 'row',

  },
  

})
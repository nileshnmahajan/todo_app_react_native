import {Platform} from 'react-native';
import colors from './Colors';
export default {
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginVertical: 3,
    alignItems: 'center',
    height: 42,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputs: {
    flex: 7,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 25,
    fontFamily: 'Roboto-Medium',
    paddingHorizontal: 15,
    height: 40,
  },
  label: {flex: 3, color: 'white', fontSize: 16},
  EmptyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  emptyButtonText: {
    color: 'white',
    textAlign: 'center',
    borderColor: colors.white,
    borderRadius: Platform.OS == 'android' ? 30 : 20,
    borderWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 17,
  },
};

import SQLite from 'react-native-sqlite-2';
import {BaseModel, types} from 'expo-sqlite-orm';
export default class JokeDB extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase({name: 'database.db'});
  }

  static get tableName() {
    return 'labels';
  }

  static get columnMapping() {
    return {
      id: {type: types.INTEGER, primary_key: true}, // For while only supports id as primary key
      label: {type: types.TEXT},
    };
  }
}

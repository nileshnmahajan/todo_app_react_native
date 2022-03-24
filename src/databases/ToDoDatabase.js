import SQLite from 'react-native-sqlite-2';
import {BaseModel, types} from 'expo-sqlite-orm';
export default class PostDatabase extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase({name: 'database.db'});
  }

  static get tableName() {
    return 'todos';
  }

  static get columnMapping() {
    return {
      id: {type: types.INTEGER, primary_key: true},
      labelId: {type: types.INTEGER, not_null: true}, //references label table
      value: {type: types.TEXT},
      priority: {type: types.TEXT},
      completedDate: {type: types.TEXT},
      timestamp: {type: types.INTEGER, default: () => Date.now()},
      status: {type: types.INTEGER, default: () => 0}, // 0 added //1 completed
    };
  }
}

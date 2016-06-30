var api = new API();

/* 1. Получить данные по отдельному пользователю или группе.
 *  @param {Number|Array|String} [ids]
 * -- {String}  :
 * --- 1. = 'count'    : Вернуть количество пользователей 
 * --- 2. = 'payment'  : Вернуть пользователей, которые совершали покупки 
 * --- 3. = 'rand=N'   : Вернуть N случайных пользователей
 *
 * @return {Number|Object} :
 * Если {Object}: 
 * -- response: [{id: 1},{id: 2}, {id: 3}]
 * --- свойства объекта: { id{Number}, payment{Number}, visits{Object*}}
 * ---- visits: {today: Number, week: Number: month: Number}
 */
 
  api.get(ids)

// 2. 

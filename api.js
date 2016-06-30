var api = new API();
// 1. Получить данные по отдельному пользователю или группе.
// @param {Number|Array|String} [ids]
// -- {String}  :
// --- 1. = 'count'   : Вернуть количество пользователей 
// --- 2. = 'payment' : Вернуть пользователей, которые совершали покупки 
// @return {Object} :
// -- response: [{id: 1},{id: 2}, {id: 3}]
api.get(ids)

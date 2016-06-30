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
 
  api.get(ids).then((res) => {
   res = {
    response : [
      id      : 1,
      payment : 15 // Количество платежей 
      visits  : {
        today : 100,
        week  : 1000, 
        month : 10000
      }]
    }
  });

/* 2. Получить статистику 
 * @param {String} [type]
 * -- {String} :
 * --- 1. = 'installed'      : Вернуть количество установок за сегодня/вчера/неделю/месяц/все время 
 * --- 2. = 'installed=data' : Вернуть количество установое на определнную дату
 * --- 3. 
 */
 
 api.stats(type).then((res /* = installed=[01.03.2016, 5.03.2016]*/) => {
  res = {
   response : [1000, 5000, 10000, 12000, 25000]
   }
 });

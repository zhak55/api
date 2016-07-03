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
      payment : 15, // Количество платежей 
      device : new Number ,// 1 - ios, 2 - android 
      visits  : {
        today : 100,
        week  : 1000, 
        month : 10000
      }]
    }
  });

/* 2. Получить общую статистику 
 * @param {String} [type]
 * -- {String} :
 * --- 1.  = 'installed'      : Вернуть количество установок за сегодня/вчера/неделю/месяц/все время 
 * --- 2.  = 'installed=data' : Вернуть количество установок на определнную дату
 * --- 3.  = 'installed=[data1,data2]' : Вернуть количество установок за период по дням
 *
 * --- 4.  = 'visits'      : Вернуть количество посещений за сегодня/вчера/неделю/месяц/все время 
 * --- 5.  = 'visits=data' : Вернуть количество посещений на определнную дату
 * --- 6.  = 'visits=[data1,data2]' : Вернуть количество посещений за период по дням
 *
 * --- 7.  = 'payment'      : Вернуть количество платежей за сегодня/вчера/неделю/месяц/все время 
 * --- 8.  = 'payment=data' : Вернуть количество платежей на определнную дату
 * --- 9.  = 'payment=[data1,data2]' : Вернуть количество платежей за период по дням
 * --- 10. = 'country' : Распределние пользователей по странам 
 * @return {Object} : { ios: [ n1, n2, ... , N ], android: [ n1, n2, ... , N ] }
 */
 
 api.stats(type).then((res /* = installed=[01.03.2016, 5.03.2016]*/) => {
  res = {
   response :  {
     ios     : [1000, 5000, 10000, 12000, 25000] ,
     android : [500, 1000, 7000, 9000, 15000]
    }
   }
 });
 
 /* 3. Получить информацию по платежам  
  * @param {Number} [ids]
  * @return {Object} :
  * -- response: {}
  * --- свойства объекта: { count{Number}, id{Number}, detail{Array} }
  * ---- count  - общее количество платежей 
  * ---- id     - id пользователя 
  * ---- detail - массив всех платежей, каждый из которых содержит уникальный id платежа, дату, тип, размер платежа
  */
  
  api.payment(ids).then((res) => {
    res = {
      response : {
       id     : new Number ,// user id
       count  : new Number ,
       detail : [{
         id     : new Number,
         date   : new Date('dd:mm:yyyy'),
         type   : new Number, // 1 = 'Premium account', 2 = 'Module #1' ...
         pay    : new Number
       }]
      }
    }
  });
  
  /* 4. Добавить информацию о платеже в БД
   * @param {Object} [data]
   * -- {Object} :
   * --- свойства { id{Number} }
   */
   
   api.addPay({
     id     : new Number,
     date   : new Date('dd:mm:yyyy'),
     type   : new Number, // 1 = 'Premium account', 2 = 'Module #1' ...
     pay    : new Number
   }).success(data => {
     data = new Number // id платежа
   }).error(err => {
     err = {
       id : new Number , // id ошибки 
       user : new Number , // id пользователя 
       description: new String 
     }
   })

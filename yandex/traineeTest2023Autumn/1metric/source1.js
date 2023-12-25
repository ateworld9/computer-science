/**
 * @typedef {Object} Answer
 * @property {Date} date - дата, для которой подсчитано количество уникальных пользователей
 * @property {number} users - количество уникальных пользователей
 *
 *
 * @typedef {Object} Credentials
 * @property {string | null | undefined} login - логин пользователя
 * @property {string | null | undefined} password - пароль пользователя
 * @property {Date} date - дата последнего логина
 *
 * @param {Function} func  - произвольная функция, вызываемая для пользователей с присутствующим логином и паролем
 * @return {(credentials: Credentials, ...args) => Answer[]} - результат подсчета количества уникальных пользователей для каждого дня
 */

function countUniqueUsersPerDay(data) {
  const result = {};

  const iterator = data.entries();

  for (const [user, date] of iterator) {
    const formattedDate = date.toISOString().split('T')[0];
    result[formattedDate] = result[formattedDate]
      ? result[formattedDate] + 1
      : 1;
  }

  return result;
}

function adapter(data) {
  return Object.entries(data).map(([date, users]) => ({
    date,
    users,
  }));
}

module.exports = (func) => {
  const uniqueUsers = new Map();

  return (credentials, ...args) => {
    // validate credentials
    if (
      typeof credentials.login !== 'string' ||
      typeof credentials.password !== 'string'
    ) {
      return adapter(countUniqueUsersPerDay(uniqueUsers));
    }
    // save user
    uniqueUsers.set(
      `${credentials.login}:${credentials.password}`,
      credentials.date,
    );

    func(...args);

    return adapter(countUniqueUsersPerDay(uniqueUsers));
  };
};

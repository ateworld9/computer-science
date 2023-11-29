function calulateSalary(timesheet, hourRate) {
  const MS_IN_HOUR = 60 * 60 * 1000;
  let totalSalary = 0;
  let lastLoginTime = null;

  for (let i = 0; i < timesheet.length; i++) {
    const [action, timestamp] = timesheet[i];

    if (action === 'login') lastLoginTime = timestamp;

    if (action === 'logout' && lastLoginTime !== null) {
      let multiplier = 1;

      let workLength = (timestamp - lastLoginTime) / MS_IN_HOUR;
      if (workLength > 12) workLength = 12;

      let hour = new Date(lastLoginTime).getUTCHours();
      while (workLength > 0) {
        if (hour >= 8 && hour < 18) {
          let length = workLength;
          if (workLength + hour >= 18) {
            length = 18 - hour;
            hour = 18;
          }
          workLength = workLength - length;
          multiplier = 1;
          totalSalary += length * hourRate * multiplier;
        } else if (hour >= 18 && hour < 23) {
          let length = workLength;
          if (workLength + hour >= 23) {
            length = 23 - hour;
            hour = 23;
          }
          workLength = workLength - length;
          multiplier = 1.5;
          totalSalary += length * hourRate * multiplier;
        } else if (hour >= 23) {
          let length = workLength;
          if (workLength + hour >= 8) {
            length = 24 - hour;
            hour = 0;
          }
          workLength = workLength - length;
          multiplier = 2;
          totalSalary += length * hourRate * multiplier;
        } else if (hour >= 0 && hour < 8) {
          let length = workLength;
          if (workLength + hour >= 8) {
            length = 8 - hour;
            hour = 8;
          }
          workLength = workLength - length;
          multiplier = 2;
          totalSalary += length * hourRate * multiplier;
        }
      }

      lastLoginTime = null;
    }
  }

  return totalSalary.toFixed(2);
}

const res = calulateSalary(
  [
    ['login', 1669914900000],
    ['logout', 1669922100000],
  ],
  1000,
);
console.log(res);

console.log(new Date(1669914900000).getUTCHours());

console.log(1669914900000 + 2 * 60 * 60 * 1000);

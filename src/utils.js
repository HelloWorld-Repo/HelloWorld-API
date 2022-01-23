const getIntervalBetweenDates = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
};

const generateRandomPassword = () => Math.random().toString(36).slice(-8);

module.exports = {
  getIntervalBetweenDates,
  generateRandomPassword,
};

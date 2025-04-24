export const getYesterdayTimestampInSeconds = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);
    return Math.floor(d.getTime() / 1000);
  };
  export const getFormattedYesterday = () => {
    return new Date(Date.now() - 864e5)
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('.');
  };
function isExpired(valid_till) {
  const validTillDate = new Date(valid_till);
  const currentDate = new Date();
  return validTillDate < currentDate;
}

module.exports = { isExpired };

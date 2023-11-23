function isExpired(valid_till) {
  const validTillDate = new Date(valid_till);
  const currentDate = new Date();
  return validTillDate < currentDate;
}

function tenantNameCheck(tenant_name) {
  const nameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,99}$/;
  return nameRegex.test(tenant_name);
}

module.exports = { isExpired, tenantNameCheck };

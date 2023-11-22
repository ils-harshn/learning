function isExpired(valid_till) {
  const validTillDate = new Date(valid_till);
  const currentDate = new Date();
  return validTillDate < currentDate;
}

function tenantNameCheck(tenant_name) {
  const nameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,99}$/;
  return nameRegex.test(tenant_name);
}

function generateToken(length = 40) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = { isExpired, tenantNameCheck, generateToken };

export const stats = (array) => {
  const allLinks = [];
  const quantity = array.length;
  const uniqueLinks = new Set(allLinks.map((element) => element.href)).size;
  if (array.length === 0) {
    return 'No hay links en los archivos';
  } else {
    const statsReturn = `
    TOTAL: ${quantity}
    UNIQUE: ${uniqueLinks}`;
    allLinks.push(statsReturn);
    return statsReturn;
  }
};
console.log(stats('README.md'));

 export const statsValidate = (array) => {
  const allLinksT = [];
  const quantity = array.length;
  const uniqueLinks = new Set(allLinksT.map((element) => element.href)).size;
  const brokenLinks = new Set(allLinksT.filter((href) => (href.status === 400))).size;
  const statsValidateReturn = `
    TOTAL: ${quantity}
    UNIQUE: ${uniqueLinks}
    BROKEN: ${brokenLinks}`;
    allLinksT.push(statsValidateReturn);
  return statsValidateReturn;
};
console.log(statsValidate('README.md'));


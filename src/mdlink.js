import {extractLink, validate}  from './index.js';

const mdLinks = (path, options) => {
  const links = new Promise((resolve) => {
      if (options.validate === true) {
          resolve(validate(path)); 
      }
      if (options.validate === false) {
          resolve(extractLink(path));
      }
  });
  return links;   
};
console.log(mdLinks('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\README.md'))

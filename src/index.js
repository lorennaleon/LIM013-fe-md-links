import path from 'path';
import fs from 'fs';
import marked from 'marked';
import fetch from 'node-fetch';

//const route ='./README.md';
//funcion para saber si la ruta existe o no
export const existOrNot = (route) => fs.existsSync(route);
//console.log(existOrNot('README.md'))
//funcion para saber si es absoluta y si no convertirla en absoluta
export const isAbsolute = (route) => path.isAbsolute(route);
//console.log(isAbsolutePath('README.md'))
//funcion para convertirlo a absoluto
export const convertToAbsolute = (route) => path.resolve(route);
//console.log (convertToAbsolute('README.md'))
//funcion para ver si es archivo o carpeta
export const isFile = (route) => fs.statSync(route).isFile();
//console.log(isFile('README.md'))
//funcion para saber el tipo de extension de un archivo
export const typeOfExtension = (route) => path.extname(route);
//console.log(typeOfExtension('README.md'))
//funcion para leer archivo
export const readFile = (route) => fs.readFileSync(route, 'utf-8')
//funcion que recorra toda la carpeta en caso q isfile retorne false ,retorna un array de archivo
export const readDirectory = (route) => fs.readdirSync(route)
//console.log(readDirectory('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\pruebas'))
//extarer ruta de cada archivo
const extractPathOfDirectory = (route) => {
  return readDirectory(route).map(element =>
    path.join(route, element), );
};
//console.log(extractPathOfDirectory('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\pruebas'));
// extraer archivos md de carpeta
const extractMDFiles = (route) => {
  let arrayOfMDFiles = []; // vamos a ir agregando componentes al array con ayuda de push
  if (isFile(route)) {
    if (typeOfExtension(route) === '.md') {
      arrayOfMDFiles.push(route); //agrega los archivos md en el arreayde archivos md
    }
  } else { // si no ...
    extractPathOfDirectory(route).forEach((element) => {
      const filesOfNewRoute = element;
      const extractMDFilesInNewRoute = extractMDFiles(filesOfNewRoute);
      arrayOfMDFiles = arrayOfMDFiles.concat(extractMDFilesInNewRoute); //concatenamos los archivos md de la nueva ruta con el array de files total
    }); //al pasar de extractMDFiles dentro de extarctMDFiles hacemos uso de la recursionnnnn
  }
  return arrayOfMDFiles;
};
//console.log(extractMDFiles('pruebas'))
//extraer link
const extractLinks = (route) => {
  const abs = isAbsolute(route) ? route : convertToAbsolute(route);
  const allLinks = [];
  const renderer = new marked.Renderer();

  extractMDFiles(abs).forEach((file) => {
    renderer.link = (href, title, text) => {
      const link = {
        href: href,
        text: text.substring(0, 50),
        file: file
      };
      allLinks.push(link);
    };
    marked(readFile(file), {
      renderer
    });
  });

  return allLinks;

};
//console.log(extractLinks('README.md'));
//OPCION VALIDATE
const validate = (route) => {
  const extractLinksTwo = extractLinks(route);
  const validator = extractLinksTwo.map((link) => fetch(link.href)
    .then((res) => ({
      href: link.href,
      text: link.text.substring(0, 50),
      file: link.file,
      status: res.status,
      statusText: res.statusText})
      )
    .catch(() => ({
       href: link.href,
      text: link.text,
      file: link.file,
      status: "error",
      statusText: "fail"})
    )
  )
  return Promise.all(validator);
}
validate('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\README.md').then((res) => console.log(res)).catch((err) => console.log(err))

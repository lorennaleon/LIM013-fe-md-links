import path from 'path';
import fs from 'fs';
//declarando la ruta prueba
const route = "README.md";
//funcion para saber si la ruta existe o no
export const existOrNot = (route) => {
  if (fs.existsSync(route)) {
    return true;
  } else{
    return false;
  }
}
console.log(existOrNot(route))
//funcion para saber si es absoluta y si no convertirla en absoluta
export const convertToAbsolutePath = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  } else{
    return path.resolve(route); 
 }
}
console.log(convertToAbsolutePath(route))

//funcion para ver si es archivo o carpeta
export const isFile = (route) => {
  if (fs.lstatSync(route).isFile())
  {
    return true;
  } else{
  return false;
  }
}
console.log(isFile(route))
//funcion para saber si es md(booleano)
export const isMd = (route) => {
  if (path.extname (route)){
    return true;
  } else{
  return false;
  }
}
console.log (isMd(route))
//funcion que recorra toda la carpeta en caso q isfile retorne false ,retorna un array de archivos
export const extractMd= arrayFiles =>{
  return arrayFiles.filter(file =>{
    return path.extname(file)==='.md'
  })
}

//LEER ARCHIVO
/*const texto = fs.readFileSync("C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\README.md", {
  encoding: "utf-8"
});
console.log(texto)*/
//extraer link
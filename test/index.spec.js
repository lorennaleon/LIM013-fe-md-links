import {  existOrNot,  isAbsolute, convertToAbsolute , isFile, typeOfExtension } from '../src/index.js';
 
test('la ruta existe o no', () => {
  expect(existOrNot('README.md')).toBe(true);
});
test('la ruta es absoluta?', () => {
  expect(isAbsolute('README.md')).toBe(false);
});
test('convertir a ruta absoluta', () => {
  expect(convertToAbsolute('README.md')).toBe('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\README.md');
});
test('es archivo?', () => {
  expect(isFile('README.md')).toBe(true);
});
test('tipo de extension', () => {
  expect(typeOfExtension('README.md')).toBe('.md');
});


import { convertToAbsolutePath, existOrNot,  isFile, isMd , extractMd } from '../src/index.js';
 
test('la ruta existe o no', () => {
  expect(existOrNot('README.md')).toBe(true);
});
test('convertir de ruta relativa a absoluta', () => {
  expect(convertToAbsolutePath('README.md')).toBe('C:\\Users\\Lorenna\\Desktop\\mdlink\\LIM013-fe-md-links\\README.md');
});
test('es archivo o no?', () => {
  expect(isFile('README.md')).toBe(true);
});
test('es mark down?', () => {
  expect(isMd('README.md')).toBe(true);
});
test('extraer archivos md', () => {
  expect(extractMd('LIM013-FE-MD-LINKS')).toBe("README.md");
});


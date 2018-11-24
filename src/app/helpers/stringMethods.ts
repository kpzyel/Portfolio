
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function changeExtension(file: string, newExtension: string) {
  return file.substring(0, file.indexOf(".")) + newExtension;
}

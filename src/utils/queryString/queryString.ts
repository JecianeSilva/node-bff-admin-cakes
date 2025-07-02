function _isObject(value: unknown) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function encode(params?: Object): string {
  if(!params){
    return '';
  }

  const keyValuePairs: string[] = [];

  for(const key in params) {
    if(Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key as keyof typeof params];

      if(_isObject(value)) {
        continue;
      }

      if(Array.isArray(value)) {
        (value as string[]).forEach((item: string) => {
          keyValuePairs.push(`${key}=${item}`)
        });
      } else if (typeof value === 'boolean' || value){
      // } else if (typeof value === 'boolean' || value || value === 0 ){
        keyValuePairs.push(`${key}=${value}`)
      }
    }
  }

  return keyValuePairs.join('&');
}
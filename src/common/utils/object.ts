export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key as K)) {
      acc[key as keyof Omit<T, K>] = obj[key as keyof T];
    }
    return acc;
  }, {} as Omit<T, K>);
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    const targetValue = result[key as keyof T];
    const sourceValue = source[key as keyof T];
    
    if (
      targetValue &&
      sourceValue &&
      typeof targetValue === 'object' &&
      typeof sourceValue === 'object'
    ) {
      result[key as keyof T] = deepMerge(
        targetValue as object,
        sourceValue as object
      ) as T[keyof T];
    } else if (sourceValue !== undefined) {
      result[key as keyof T] = sourceValue as T[keyof T];
    }
  });
  
  return result;
}
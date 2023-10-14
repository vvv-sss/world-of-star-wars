export const convertArrayToKeyedObject = <T extends {url: string}>(
  data: T[],
): Record<string, T> => {
  const obj: Record<string, T> = {};

  data.forEach(item => {
    if ('url' in item) {
      obj[item.url] = item;
    } else {
      console.log(
        '🔴 convertArrayToKeyedObject 🔴',
        'There is no url key provided',
      );
    }
  });

  return obj;
};

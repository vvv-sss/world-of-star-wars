import {getRequest} from '../setup/api/services';

export const fetchAllSettled = async <T>(
  urls: string[],
): Promise<(T | null)[]> => {
  const promises = urls.map(url => getRequest<T>({url}));

  const results = await Promise.allSettled(promises);

  return results.map(result => {
    if (result.status === 'fulfilled' && 'data' in result.value) {
      return result.value.data;
    } else {
      return null;
    }
  });
};

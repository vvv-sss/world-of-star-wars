type ItemWithNameField = {
  title: string;
};

export const getTitlesOfTruthyItems = <T extends ItemWithNameField>(
  items: (T | null)[],
): string[] => {
  const truthyItems = items.filter(item => item !== null) as T[];

  if (truthyItems.length > 0) {
    return truthyItems.map(item => item.title);
  } else {
    return ['Unknown'];
  }
};

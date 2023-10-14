type ItemWithNameField = {
  name: string;
};

export const getNamesOfTruthyItems = <T extends ItemWithNameField>(
  items: (T | null)[],
): string[] => {
  const truthyItems = items.filter(item => item !== null) as T[];

  if (truthyItems.length > 0) {
    return truthyItems.map(item => item.name);
  } else {
    return ['Unknown'];
  }
};

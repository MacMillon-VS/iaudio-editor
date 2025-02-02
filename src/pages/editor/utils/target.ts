export const getTypeFromClassName = (input: string): string | null => {
  const regex = /designcombo-scene-item-type-([^ ]+)/;
  const match = input.match(regex);
  return match ? match[1] : null;
};


export const getTargetById = (id: string): HTMLElement | null => {
  const element = document.querySelector<HTMLElement>(
    `.designcombo-scene-item.id-${id}`,
  );
  return element;
};

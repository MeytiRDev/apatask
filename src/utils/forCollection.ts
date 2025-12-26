import type { Func_FindIndex } from "./_types/forCollection.types";

export function findIndex({ array, isEqualBy }: Func_FindIndex) {
  const keys = Object.keys(isEqualBy);
  array.findIndex((data: any) => {
    return keys.some((key) => {
      return data[key] === isEqualBy[key];
    });
  });
}

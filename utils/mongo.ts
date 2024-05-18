/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const replaceMongoIdInArray = (array: any) => {
  const mappedArray = array
    .map((item: any) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map((item: any) => {
      const { _id, ...rest } = item;
      return { ...rest };
    });

  return mappedArray;
};

export const replaceMongoIdInObject = (obj: any) => {
  const { _id, ...updatedObj }: { _id: any } = {
    ...obj,
    id: obj._id.toString(),
  };

  return updatedObj;
};

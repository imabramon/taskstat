import { callUntilCondition } from './callUntilCondition';

export const random = (max: number = 100, min: number = 0): number => {
  if(min > max) {throw new Error('Минимальный больше максимального')}

  return Math.round(Math.random() * (max - min) + min)
};

type generator<T> = () => T;

export const randomArray = <T>(array: T[]): generator<T> => {
  let count = 0
  const indexes: number[] = []

  for(let i = 0; i < array.length; i++){
    let index = random(array.length - 1, 0)

      while((indexes.includes(index))){
        index = random(array.length - 1, 0)
      }

      indexes.push(index)
  }

  return () => {
    if (count === array.length) {
      throw new Error('Все элементы уже были получены');
    }

    count += 1;

    return array[indexes[count - 1]];
  };
};

export const sum = (...args: number[]) => args.reduce((s, x) => s + x, 0);

// Сделать min больше 0 в TS
// export const randomSplit = (partCount: number, min: number = Math.min(5, 100 / partCount)) => {
//   const usedPecents: number[] = [];
//   let minRemaining = min * partCount;

//   return () => {
//     const percent = callUntilCondition(
//       random,
//       (result: number) => sum(result, ...usedPecents) <= 100 - minRemaining + min,
//       100,
//       min
//     );

//     usedPecents.push(percent)
//     minRemaining -= min
//     return percent
//   };
// };

export const randomSplit = (partCount: number, min: number = Math.min(5, 100 / partCount)) => {
  if(min * partCount > 100) {throw new Error('Слишком большой минимальный элемент')}

  let remainCount = partCount - 1;
  let remainSum = 100;

  const array = Array.from({ length: partCount - 1 }).map(() => {
    const precent = random(remainSum - min * remainCount, min)

    remainSum -= precent
    remainCount -= 1

    return precent
  })

  array.push(remainSum)

  let count = 0

   return () => {
      if(count === array.length){throw new Error('все элементы уже поолучены')}

      count += 1
      return array[count - 1]
   }
};

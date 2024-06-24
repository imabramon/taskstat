import { randomArray } from './random'

test('Рандомный массив. Работоспособность', () => {
    const testFn = () => {
        const array: string[] = ['A', 'B', 'C']
        const randomElement = randomArray(array)
        const newArrray: string[] = []

        array.forEach(() => {
            newArrray.push(randomElement())
        })

        // сравнение двух отсортированных массивов должны быть одинаковы
        expect(newArrray.sort()).toEqual(array.sort())
       
    }

    Array.from({ length: 100 }).forEach(() => {
        testFn()
    })
})

test('Рандомный массив. Проброс ошибки', () => {
    const testFn = () => {
        const array: string[] = ['A', 'B', 'C']
        const randomElement = randomArray(array)
        const newArrray: string[] = []

        array.forEach(() => {
            newArrray.push(randomElement())
        })

        //если вернул андефайнд где-то
        expect(newArrray.filter((x) => x).length).toBe(array.length)

        //следующий вызов должен быть ошибкой
        expect(() => {
            randomElement()
        }).toThrow()
    }

    Array.from({ length: 100 }).forEach(() => {
        testFn()
    })
})

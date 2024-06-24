import { random, randomSplit, sum } from './random'

test('Рандомный процент. Работоспособность', () => {
    const testFn = () => {
        const partsCount = random(10, 1)
        const array: number[] = []
        const percent = randomSplit(partsCount)

        Array.from({ length: partsCount }).forEach(() => {
            array.push(percent())
        })

        //если вернул андефайнд где-то
        expect(sum(...array)).toBe(100)
    }

    Array.from({ length: 100 }).forEach(() => {
        testFn()
    })
})

test('Рандомный процент. Проверка на минимальный', () => {
    const testFn = () => {
        const partsCount = random(10, 1)
        const min = Math.floor(100 / partsCount) ? Math.floor(100 / partsCount) : 0
        const array: number[] = []
        const percent = randomSplit(partsCount, min)

        Array.from({ length: partsCount }).forEach(() => {
            array.push(percent())
        })

        array.forEach((x) => {
            expect(x).toBeGreaterThanOrEqual(min)
        })
    }

    Array.from({ length: 100 }).forEach(() => {
        testFn()
    })
})

test('Рандомный процент. Проверка на минимальный. Проброс ошибки', () => {
    const testFn = () => {
        const partsCount = random(10, 1)
        const min = Math.floor(100 / partsCount + 1)

        expect(() => {
            randomSplit(partsCount, min)
        }).toThrow()

    }

    Array.from({ length: 100 }).forEach(() => {
        testFn()
    })
})

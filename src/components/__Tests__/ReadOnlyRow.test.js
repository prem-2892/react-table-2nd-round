import { cleanup, render, screen } from '@testing-library/react'
import ReadOnlyRow from '../ReadOnlyRow'

afterEach(() => {
    cleanup()
})

describe('Button components', () => {
    test('render properly', () => {
        render(<ReadOnlyRow dt={{ startTime: '1', endTime: '1' }} />)

        const btns = screen.queryAllByRole('button')
        expect(btns).not.toHaveLength(0)
    })
})

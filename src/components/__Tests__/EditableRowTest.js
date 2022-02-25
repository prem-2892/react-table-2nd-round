import { cleanup, render, screen } from '@testing-library/react'
import EditableRow from '../EditableRow'

afterEach(() => {
    cleanup()
})

describe('Button components', () => {
    test('render properly', () => {
        render(<EditableRow editFormData={{ startTime: '1', endTime: '1' }} />)

        const btns = screen.queryAllByRole('button')
        expect(btns).not.toHaveLength(0)
    })
})

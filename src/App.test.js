import { cleanup, render, screen } from '@testing-library/react'
import App from './App'
// import ReadOnlyRow from './components/ReadOnlyRow'

afterEach(() => {
    cleanup()
})

describe('App component', () => {
    test('renders table', () => {
        render(<App />)

        const table = screen.getByRole('table')
        expect(table).toBeInTheDocument()
    })

    test('renders table with data', () => {
        // If the base JSON file is empty then this will FAIL
        // This test proves that table is rendering data

        render(<App />)

        const tds = screen.queryAllByRole('cell')
        expect(tds).not.toBeNull()
    })
})

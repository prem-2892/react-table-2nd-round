import logo from './logo.svg'
import './App.css'
import './main.css'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Data from './data.json'

// Components
import ReadOnlyRow from './components/ReadOnlyRow'
import EditableRow from './components/EditableRow'

function App() {
    const [data, setData] = useState(Data)
    const [time, setTime] = useState('')
    const [addFormData, setAddFormData] = useState({
        startTime: '',
        endTime: '',
        taskDesc: '',
    })
    const [editDataId, setEditDataId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        startTime: '',
        endTime: '',
        taskDesc: '',
    })

    const handleAddFormChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault()

        const newData = {
            id: nanoid(),
            startTime: addFormData.startTime,
            endTime: addFormData.endTime,
            taskDesc: addFormData.taskDesc,
        }

        if (newData.endTime < newData.startTime) {
            alert('End Time Cannot be lesser than Start Time!')
            return
        }

        const newDatas = [...data, newData]
        setData(newDatas)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()

        const editedData = {
            id: editDataId,
            startTime: editFormData.startTime,
            endTime: editFormData.endTime,
            taskDesc: editFormData.taskDesc,
        }

        const newData = [...data]

        const index = data.findIndex((data) => data.id === editDataId)

        newData[index] = editedData
        setData(newData)
        setEditDataId(null)
    }

    const handleEditClick = (event, data) => {
        event.preventDefault()
        setEditDataId(data.id)

        const formValues = {
            startTime: data.startTime,
            endTime: data.endTime,
            taskDesc: data.taskDesc,
        }

        setEditFormData(formValues)
    }

    const handleCancelClick = () => {
        setEditDataId(null)
    }

    const handleDeleteClick = (dataId) => {
        const newData = [...data]

        const index = data.findIndex((data) => data.id === dataId)

        newData.splice(index, 1)

        setData(newData)
    }

    const calcMin = (startTime, endTime) => {
        const h1 = startTime.split(':')[0]
        const m1 = startTime.split(':')[1]

        const h2 = endTime.split(':')[0]
        const m2 = endTime.split(':')[1]

        const hd = Math.abs(h2 - h1)
        hd = hd * 60
        const min = Math.abs(m1 - m2)
        const ans = min + hd
        return ans
    }

    return (
        <div className='App'>
            <div className='first-util-row'>
                <label htmlFor='main-date'>Select Date</label>
                <input
                    type='date'
                    id='main-date'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <hr />
            <form
                action='#'
                className='add-form'
                onSubmit={(e) => handleAddFormSubmit(e)}
            >
                <input
                    type='time'
                    name='startTime'
                    id='st'
                    placeholder='Start Time'
                    onChange={(e) => handleAddFormChange(e)}
                    required
                />
                <input
                    type='time'
                    name='endTime'
                    id='end'
                    placeholder='Start Time'
                    onChange={(e) => handleAddFormChange(e)}
                    required
                />
                <input
                    type='text'
                    name='taskDesc'
                    className='task-desc'
                    placeholder='Task Description'
                    onChange={(e) => handleAddFormChange(e)}
                    required
                />
                <button type='submit' className='btn-submit'>
                    Add
                </button>
            </form>
            <hr />
            <form action='' onSubmit={(e) => handleEditFormSubmit(e)}>
                <table className='main-table'>
                    <thead>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Task Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dt) => (
                            <>
                                {editDataId === dt.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={
                                            handleEditFormChange
                                        }
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        dt={dt}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default App

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
    const [allData, setAllData] = useState(Data)
    const [addFormData, setAddFormData] = useState({
        startTime: '',
        min: '',
        endTime: '',
        taskDesc: '',
    })
    const [editDataId, setEditDataId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        startTime: '',
        endTime: '',
        min: '',
        taskDesc: '',
    })
    const [totalMin, setTotalMin] = useState(0)
    const [editError, setEditError] = useState(false)
    const [changeData, setChangeData] = useState(undefined)

    //------------------

    // Data Change

    const handleDateChange = (event) => {
        event.preventDefault()
        setData(allData)

        const newDateData = allData.filter((item) => item.date === changeData)
        console.log(newDateData)
        setData(newDateData)
    }

    // -------------------------

    useEffect(() => {
        let tmp = 0
        setTotalMin(0)
        data.map((dt) => {
            tmp = tmp + dt.min
            // console.log('Min', dt.min)
        })
        setTotalMin(tmp)
        setEditError(false)
    }, [data])

    //-------------------

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

        const h1 = addFormData.startTime.split(':')[0]
        const m1 = addFormData.startTime.split(':')[1]

        const h2 = addFormData.endTime.split(':')[0]
        const m2 = addFormData.endTime.split(':')[1]

        let hd = Math.abs(h2 - h1)
        hd = hd * 60
        const min = Math.abs(m1 - m2)
        const ans = min + hd

        // console.log(h1)
        if (changeData === undefined) {
            alert('Please Select Date to add more data')
            return
        }
        const newData = {
            id: nanoid(),
            startTime: addFormData.startTime,
            endTime: addFormData.endTime,
            min: ans,
            date: changeData,
            taskDesc: addFormData.taskDesc,
        }

        if (newData.endTime < newData.startTime) {
            alert('End Time Cannot be lesser than Start Time!')
            return
        }

        const newDatas = [...data, newData]
        setData(newDatas)
        setAllData(newDatas)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()
        setEditError(true)

        const h1 = editFormData.startTime.split(':')[0]
        const m1 = editFormData.startTime.split(':')[1]

        const h2 = editFormData.endTime.split(':')[0]
        const m2 = editFormData.endTime.split(':')[1]

        let hd = Math.abs(h2 - h1)
        hd = hd * 60
        const min = Math.abs(m1 - m2)

        if (min > 0 && hd === 1) {
            hd = 0
        }
        const ans = min + hd

        const editedData = {
            id: editDataId,
            startTime: editFormData.startTime,
            endTime: editFormData.endTime,
            min: ans,
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

    return (
        <div className='App'>
            <div className='first-util-row'>
                <label htmlFor='main-date'>Select Date</label>
                <input
                    type='date'
                    id='main-date'
                    value={changeData}
                    onChange={(e) => setChangeData(e.target.value)}
                    required
                />
                <button type='button' onClick={(e) => handleDateChange(e)}>
                    Load
                </button>
                <button>Export As PNG</button>
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
                            <th>Minutes</th>
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
                <div className='total'>
                    <div className='min'>
                        <p className='text-min'>
                            Day Total In Minutes: {totalMin}
                        </p>
                    </div>
                    <div className='hour'>
                        <div className='text-hour'>
                            Day Total In Hours : {totalMin / 60}
                        </div>
                    </div>
                </div>
                <hr />
            </form>
        </div>
    )
}

export default App

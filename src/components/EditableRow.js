import React from 'react'

const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr>
            <td>
                <input
                    type='time'
                    required
                    name='startTime'
                    value={editFormData.startTime}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type='time'
                    required
                    name='endTime'
                    value={editFormData.endTime}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type='text'
                    placeholder='Enter New Task Description'
                    required
                    name='taskDesc'
                    value={editFormData.taskDesc}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <div className='btn-blocks'>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={(e) => handleCancelClick(e)}>
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default EditableRow

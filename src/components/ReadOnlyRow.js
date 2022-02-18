import React from 'react'

const ReadOnlyRow = ({ dt, handleEditClick, handleDeleteClick }) => {
    

    return (
        <tr key={dt.id}>
            <td>{dt.startTime}</td>
            <td>{dt.endTime}</td>
            <td>{`${dt.min} Minutes`}</td>
            <td>{dt.taskDesc}</td>
            <td>
                <div className='btns-block'>
                    <button
                        className='edit-btn'
                        onClick={(e) => handleEditClick(e, dt)}
                    >
                        Edit
                    </button>
                    <button
                        className='delete-btn'
                        onClick={() => handleDeleteClick(dt.id)}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ReadOnlyRow

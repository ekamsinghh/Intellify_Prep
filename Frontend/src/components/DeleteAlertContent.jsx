import React from 'react'

const DeleteAlertContent = ({content,onDelete}) => {
  return (
    <div className="p-5">
        <p className="text-[14px] md:text-base">{content}</p>

        <div className="flex justify-end mt-6">
            <button
            type="button"
            className="rounded text-white px-3 py-1 bg-red-600 hover:scale-102 active:scale-100 cursor-pointer"
            onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlertContent
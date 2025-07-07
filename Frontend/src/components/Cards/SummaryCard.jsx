import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
    colors,
    role,
    experience,
    topics,
    description,
    questions,
    lastUpdated,
    onSelect,
    onDelete
}) => {
  return (
    <div className="bg-white border-2 border-black/30 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-250 relative group hover:scale-105 transition-all duration-200 ease-in-out"
    onClick={onSelect}
    >
        <div className="rounded-lg p-4 cursor-pointer relative"
        style={{background: colors.bg}}
        >
            <div className="flex items-start">
                <div className=" flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
                    <span className="text-lg font-semibold text-black">
                        {getInitials(role)}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        {/* Title and Heading */}
                        <div>
                            <h2 className="text-[20px] font-semibold" >
                                {role}
                            </h2>
                            <p className="text-sm text-medium text-gray-900">{topics}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
            className="hidden group-hover:flex items-center gap-2 text-sm text-rose-500 font-medium bg-rose-100 px-3 py-1 rounded text-nowrap border-2 border-rose-200 hover:border-rose-400 cursor-pointer absolute top-0 right-0"
            onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }
            }
            >
                <LuTrash2/>
            </button>
        </div>

        <div className="px-3 pb-3">
            <div className="flex items-center gap-1 mt-4">
                <div className="text-[12px] font-medium bg-black text-white px-3 py-1 rounded-full">
                    Experience: {experience} {experience==1 ? "Year":"Years"}
                </div>
                <div className="text-[12px] font-medium bg-black text-white px-3 py-1 rounded-full">
                    {questions.length} Q&A
                </div>
                <div className="text-[12px] font-medium bg-black text-white px-3 py-1 rounded-full">
                    Last Updated: {lastUpdated}
                </div>
            </div>
            <p className="text-[14px] text-gray-500 font-medium line-clamp-2 mt-3">
                {description}
            </p>
        </div>
    </div>
  )
}

export default SummaryCard
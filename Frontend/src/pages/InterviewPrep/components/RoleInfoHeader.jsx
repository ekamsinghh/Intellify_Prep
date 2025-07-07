import React from 'react'

const RoleInfoHeader = ({
    role,
    topics,
    experience,
    questions,
    description,
    lastUpdated
}) => {
const ombreGradients = [
  "bg-gradient-to-r from-sky-200 via-indigo-300 to-purple-200",
  "bg-gradient-to-r from-teal-200 via-cyan-300 to-sky-200",
  "bg-gradient-to-r from-pink-200 via-rose-300 to-fuchsia-200",
  "bg-gradient-to-r from-emerald-200 via-green-300 to-lime-200",
  "bg-gradient-to-r from-violet-200 via-purple-300 to-indigo-200",
  "bg-gradient-to-r from-orange-200 via-amber-300 to-yellow-200",
  "bg-gradient-to-r from-blue-200 via-sky-300 to-cyan-200",
  "bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200",
  "bg-gradient-to-r from-lime-200 via-emerald-300 to-teal-200",
  "bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-200"
];



const randomGradient = ombreGradients[Math.floor(Math.random() * ombreGradients.length)];

  return (
    <div className={`${randomGradient} relative border-b-4`}>
        <div className="container mx-auto px-10 md:px-0">
            <div className="h-[200px] flex flex-col justify-center relative z-10">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-semibold">{role}</h2>
                                <p className="text-base text-medium text-gray-900 mt-1">
                                    {topics}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <div className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                        Experience: {experience} {experience == 1 ? "Year":"Years"}
                    </div>

                    <div className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                        {questions} Q&A
                    </div>

                    <div className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RoleInfoHeader
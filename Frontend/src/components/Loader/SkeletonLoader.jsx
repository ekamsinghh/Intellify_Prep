import React from 'react'

const SkeletonLoader = () => {
  return (
    <>
        <div class="animate-pulse space-y-4 max-w-3xl">
        <div class="bg-gray-200 rounded-md dark:bg-gray-400 w-full h-6"></div>

        <div class="space-y-2">
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-3/4 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-5/6 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-4/6 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-2/3 h-3"></div>
        </div>

        <div class="bg-gray-100 dark:bg-gray-400 rounded p-4 space-y-2">
            <div class="h-2.5 bg-gray-300 rounded w-3/4"></div>
            <div class="h-2.5 bg-gray-300 rounded w-2/4"></div>
            <div class="h-2.5 bg-gray-300 rounded w-1/2"></div>
        </div>
        </div>
        <div className="mt-3"></div>
        <div class="animate-pulse space-y-4 max-w-3xl">
        <div class="bg-gray-200 rounded-md dark:bg-gray-400 w-full h-6"></div>

        <div class="space-y-2">
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-3/4 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-5/6 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-4/6 h-3"></div>
            <div class="bg-gray-200 rounded dark:bg-gray-400 w-2/3 h-3"></div>
        </div>

        <div class="bg-gray-100 dark:bg-gray-400 rounded p-4 space-y-2">
            <div class="h-2.5 bg-gray-300 rounded w-3/4"></div>
            <div class="h-2.5 bg-gray-300 rounded w-2/4"></div>
            <div class="h-2.5 bg-gray-300 rounded w-1/2"></div>
        </div>
        </div>

        <div className="mt-3"></div>
        <div class="animate-pulse space-y-4 max-w-3xl">
            <div class="bg-gray-200 rounded-md dark:bg-gray-400 w-full h-6"></div>
        </div>
    </>
  )
}

export default SkeletonLoader
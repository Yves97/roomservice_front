import React from 'react'

export const Loader = () => {
  return (
     <div className="w-full h-96 flex justify-center items-center">
        <svg className="animate-spin h-20 w-5 bg-violet-500" viewBox="0 0 24 24"></svg>
    </div>
  )
}

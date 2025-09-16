// // ProgressBar.jsx - Updated version of your component
// import React from 'react'
// import ProgressBarr from '@ramonak/react-progress-bar'

// const ProgressBar = ({ 
//   completed = 0, 
//   bgColor = '#f88d35', 
//   label = '', 
//   showLabel = false,
//   height = '20px',
//   transitionDuration = '3s',
//   transitionTimingFunction = 'ease-in'
// }) => {
//   return (
//     <>
//       {showLabel && label && (
//         <div className="flex justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">{label}</span>
//           <span className="text-sm font-medium text-gray-700">{Math.round(completed)}%</span>
//         </div>
//       )}
//       <ProgressBarr 
//         bgColor={bgColor}
//         completed={completed}
//         height={height}
//         transitionDuration={transitionDuration}
//         transitionTimingFunction={transitionTimingFunction}
//         labelAlignment="center"
//         labelColor="#fff"
//       />
//     </>
//   )
// }

// export default ProgressBar
// ProgressBar.jsx
import React from 'react'
import ProgressBarr from '@ramonak/react-progress-bar'

const ProgressBar = ({ 
  completed = 0, 
  bgColor, // Remove default value to make it dynamic
  label = '', 
  showLabel = false,
  transitionDuration = '3s'
}) => {
  
  // Function to determine color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage === 0) {
      return '#f88d35'; // Gray for 0%
    } else if (percentage > 0 && percentage < 25) {
      return '#f88d35'; // Red for 1-24%
    } else if (percentage >= 25 && percentage < 50) {
      return '#F59E0B'; // Orange for 25-49%
    } else if (percentage >= 50 && percentage < 75) {
      return '#F59E0B'; // Yellow/Orange for 50-74%
    } else if (percentage >= 75 && percentage < 100) {
      return '#f88d35'; // Blue for 75-99%
    } else if (percentage === 100) {
      return '#f88d35'; // Green for 100%
    }
    return '#f88d35'; // Default fallback
  };

  // Use provided bgColor or determine dynamically
  const progressColor = bgColor || getProgressColor(completed);

  return (
    <>
      {showLabel && label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(completed)}%</span>
        </div>
      )}
      <ProgressBarr 
        bgColor={progressColor}
        completed={completed}
        transitionDuration={transitionDuration}
        transitionTimingFunction={'ease-in-out'}
        height="18px" // Optional: make it slightly taller
        borderRadius="4px" // Optional: add border radius
      />
    </>
  )
}

export default ProgressBar
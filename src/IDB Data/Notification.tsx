// import { BellIcon } from '@heroicons/react/16/solid'
// import {FC} from 'react'

// const Notification:FC = () => {
//   return (
//     <>
//       <div>
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative">
//               <BellIcon className='h-6 w-6 mr-3 cursor-pointer text-white'/>
//               <span className="absolute top-1 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
//             </div>
//             <div tabIndex={0} className="menu menu-sm my-2 cursor-pointer text-black dark:text-white dark:bg-black dropdown-content bg-base-100 rounded-box z-20 mt-3 w-36 p-2 shadow">
//               <p className='hover:bg-gray-200 rounded-lg p-2'>Notification 1</p>
//               <hr />
//               <p className='hover:bg-gray-200 rounded-lg p-2'>Notification 2</p>
//               <hr />
//               <p className='hover:bg-gray-200 rounded-lg p-2'>Notification 3</p>
//               <hr />
//             </div>
//           </div>
//         </div> 
//     </>
//   )
// }

// export default Notification

import { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/16/solid';
import { FC } from 'react';
import { io } from 'socket.io-client';

// Create a socket connection to the server
const socket = io('http://localhost:3000'); // Ensure the correct port is used for your backend server

const Notification: FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Listen for new notifications
  useEffect(() => {
    socket.on('new-movie', (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('new-movie');
    };
  }, []);

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative">
          <BellIcon className="h-6 w-6 mr-3 cursor-pointer text-white" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div
          tabIndex={0}
          className="menu menu-sm my-2 cursor-pointer text-black dark:text-white dark:bg-black dropdown-content bg-base-100 rounded-box z-20 mt-3 w-36 p-2 shadow"
        >
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index}>
                <p className="hover:bg-gray-200 rounded-lg p-2">{notification}</p>
                {index < notifications.length - 1 && <hr />}
              </div>
            ))
          ) : (
            <p className="text-center p-2">No notifications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;








// import { useEffect, useState } from 'react';
// import { BellIcon } from '@heroicons/react/24/outline'; // Bell icon from Heroicons
// import { io } from 'socket.io-client';

// const NotificationComponent = () => {
//   const [messages, setMessages] = useState<string[]>([]);  // Store notification messages
//   const [notificationCount, setNotificationCount] = useState<number>(0); // Track unread notifications
//   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // Track if dropdown is open

//   // Socket connection to listen for real-time notifications
//   useEffect(() => {
//     const socket = io('http://localhost:5000'); // Connect to your backend server

//     // Listen for new movie notification
//     socket.on('new_message', (message: string) => {
//       setMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the list
//       setNotificationCount((prevCount) => prevCount + 1); // Increment the count by 1 for each new message
//     });

//     // Cleanup: disconnect socket when component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   // Mark notifications as read and reset count
//   const markAllAsRead = () => {
//     setNotificationCount(0); // Reset notification count
//     setDropdownOpen(false); // Close the dropdown
//   };

//   return (
//     <div className="relative">
//       {/* Bell Icon with Notification Count */}
//       <button className="btn btn-ghost btn-circle relative" onClick={toggleDropdown}>
//         <BellIcon className="h-6 w-6 text-white cursor-pointer" />
//         {/* Show notification count badge */}
//         {notificationCount > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full">
//             {notificationCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown Menu */}
//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-black shadow-lg rounded-lg z-20">
//           <ul className="list-none p-2 max-h-60 overflow-y-auto">
//             {messages.length > 0 ? (
//               messages.map((message, index) => (
//                 <li key={index} className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2">
//                   {message}
//                 </li>
//               ))
//             ) : (
//               <li className="p-2 text-gray-500">No new notifications</li>
//             )}
//           </ul>
//           {/* Button to mark all as read */}
//           <div className="text-center p-2">
//             <button
//               onClick={markAllAsRead}
//               className="btn btn-sm bg-blue-500 text-white rounded-lg w-full"
//             >
//               Mark All as Read
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationComponent;
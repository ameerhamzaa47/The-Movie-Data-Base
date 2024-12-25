import { BellIcon } from '@heroicons/react/16/solid';
import { FC, useState, useEffect } from 'react';
import Ably from 'ably';

const Notification: FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newNotificationCount, setNewNotificationCount] = useState<number>(0); // Track the count of unread notifications

  // Retrieve notifications from localStorage on initial render
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications)); // Parse and set the stored notifications
    }

    // Initialize Ably with your API key
    const ably = new Ably.Realtime({ key: 'zaHaNQ.19AEng:Nvs1bDlFVvjDoVAgif5PmSGIeRig6LJ95znNpKtRpEo' });

    // Subscribe to both the 'movies-channel' and 'TvShow-channel'
    const movieChannel = ably.channels.get('movies-channel');
    const tvShowChannel = ably.channels.get('TvShow-channel');

    // Listen for new movie notifications
    movieChannel.subscribe('new-movie', (message) => {
      const newNotification = message.data;
      setNotifications((prevNotifications) => {
        const updatedNotifications = [newNotification, ...prevNotifications];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Store updated notifications
        setNewNotificationCount((prevCount) => prevCount + 1); // Increment the count of new notifications
        return updatedNotifications;
      });
    });

    // Listen for new TV show notifications
    tvShowChannel.subscribe('new-TvShow', (message) => {
      const newNotification = message.data;
      setNotifications((prevNotifications) => {
        const updatedNotifications = [newNotification, ...prevNotifications];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications)); // Store updated notifications
        setNewNotificationCount((prevCount) => prevCount + 1); // Increment the count of new notifications
        return updatedNotifications;
      });
    });

    // Cleanup Ably subscription when the component unmounts
    return () => {
      if (ably.connection.state === 'connected') {
        ably.close(); // Close the connection only if it is connected
      }
    };
  }, []);

  // Reset the notification count when the bell icon is clicked
  const handleBellClick = () => {
    setNewNotificationCount(0); // Reset the notification count
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle relative"
          onClick={handleBellClick} // Attach the click handler to the bell icon
        >
          <BellIcon className="h-6 w-6 mr-3 cursor-pointer text-white" />
          <span className="absolute top-1 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {newNotificationCount} {/* Show the unread notification count */}
          </span>
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
            <p className="p-2 text-gray-500">No notifications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
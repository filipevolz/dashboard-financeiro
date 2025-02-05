import { useState } from 'react';
import { Bell } from 'phosphor-react';
import { NotificationsContainer, NotificationsCount } from './styles';

interface NotificationProps {
  count: number;
}

export function Notifications({ count }: NotificationProps) {
  const [notificationCount, setNotificationCount] = useState(count);

  return (
    <NotificationsContainer>
      <Bell size={40} />
      {notificationCount > 0 && (
        <NotificationsCount>
          {notificationCount}
        </NotificationsCount>
      )}
    </NotificationsContainer>
  );
}

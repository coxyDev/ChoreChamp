
import React, { useState, useEffect } from "react";
import { Notification, User } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CheckCircle2, 
  Star, 
  Trophy, 
  Clock, 
  Trash2,
  MailCheck, // Replaced MarkAsRead with MailCheck
  BellOff
} from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";

const NotificationItem = ({ notification, onMarkRead, onDelete, delay = 0 }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'chore_completed':
        return <CheckCircle2 className="w-5 h-5" style={{ color: '#92B4A7' }} />;
      case 'level_up':
        return <Trophy className="w-5 h-5" style={{ color: '#DA4167' }} />;
      case 'achievement':
        return <Star className="w-5 h-5" style={{ color: '#93827F' }} />;
      case 'reminder':
        return <Clock className="w-5 h-5" style={{ color: '#5A5A5A' }} />;
      default:
        return <Bell className="w-5 h-5" style={{ color: '#5A5A5A' }} />;
    }
  };

  const getTimeDisplay = (date) => {
    if (isToday(new Date(date))) return "Today";
    if (isYesterday(new Date(date))) return "Yesterday";
    return format(new Date(date), "MMM d");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay }}
      className={`p-4 border-b last:border-b-0 ${!notification.is_read ? 'bg-blue-50' : ''}`}
      style={{ 
        borderColor: '#E2E8F0',
        backgroundColor: !notification.is_read ? '#F3F5ED' : 'transparent'
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 rounded-full" style={{ backgroundColor: '#F3F5ED' }}>
          {getIcon()}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-grow">
              <h4 className="font-semibold" style={{ color: '#2F2F2F' }}>
                {notification.title}
                {!notification.is_read && (
                  <Badge className="ml-2" style={{ backgroundColor: '#DA4167', color: 'white' }}>
                    New
                  </Badge>
                )}
              </h4>
              <p className="text-sm mt-1" style={{ color: '#5A5A5A' }}>
                {notification.message}
              </p>
              <p className="text-xs mt-2" style={{ color: '#5A5A5A' }}>
                {getTimeDisplay(notification.created_date)}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {!notification.is_read && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMarkRead(notification.id)}
                  className="hover:bg-blue-100"
                >
                  <MailCheck className="w-4 h-4" style={{ color: '#93827F' }} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(notification.id)}
                className="hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" style={{ color: '#DA4167' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      const notificationsData = await Notification.filter(
        { parent_email: user.email }, 
        "-created_date"
      );
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
    setIsLoading(false);
  };

  const handleMarkRead = async (notificationId) => {
    try {
      await Notification.update(notificationId, { is_read: true });
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await Notification.delete(notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.is_read);
    try {
      await Promise.all(
        unreadNotifications.map(n => Notification.update(n.id, { is_read: true }))
      );
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.is_read;
    if (filter === 'read') return n.is_read;
    return true;
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6" style={{ backgroundColor: '#F8F9F0', minHeight: '100vh' }}>
        <div className="animate-pulse">
          <div className="h-8 rounded w-1/3 mb-6" style={{ backgroundColor: '#BDC4A7' }}></div>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-20 rounded-lg" style={{ backgroundColor: '#BDC4A7' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto" style={{ backgroundColor: '#F8F9F0', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#2F2F2F' }}>Notifications</h1>
          <p className="mt-1" style={{ color: '#5A5A5A' }}>
            Stay updated with your family's chore progress.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            disabled={!notifications.some(n => !n.is_read)}
          >
            Mark All Read
          </Button>
        </div>
      </motion.div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#2F2F2F' }}>
            <Bell className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'text-white' : ''}
              style={filter === 'all' ? { backgroundColor: '#93827F' } : {}}
            >
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('unread')}
              className={filter === 'unread' ? 'text-white' : ''}
              style={filter === 'unread' ? { backgroundColor: '#93827F' } : {}}
            >
              Unread ({notifications.filter(n => !n.is_read).length})
            </Button>
            <Button 
              variant={filter === 'read' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('read')}
              className={filter === 'read' ? 'text-white' : ''}
              style={filter === 'read' ? { backgroundColor: '#93827F' } : {}}
            >
              Read
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                  delay={index * 0.05}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12"
              >
                <BellOff className="w-16 h-16 mx-auto mb-4" style={{ color: '#BDC4A7' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#2F2F2F' }}>
                  No notifications
                </h3>
                <p style={{ color: '#5A5A5A' }}>
                  {filter === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications to show.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

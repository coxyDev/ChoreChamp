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
  MailCheck,
  BellOff
} from "lucide-react";
import { format, isToday, isYesterday, isValid } from "date-fns";

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
        return <Clock className="text-muted-foreground" />;
      default:
        return <Bell className="text-muted-foreground" />;
    }
  };

  const getTimeDisplay = (dateString) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (!isValid(date)) return "Recently";
    
    try {
      if (isToday(date)) return "Today";
      if (isYesterday(date)) return "Yesterday";
      return format(date, "MMM d");
    } catch (error) {
      console.warn("Date formatting error:", error, "for date:", dateString);
      return "Recently";
    }
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
        <div className="bg-background min-h-screen">
          {getIcon()}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-grow">
              <h4 className="font-semibold" style={{ color: '#2F2F2F' }}>
                {notification.title}
                {!notification.is_read && (
                  <Badge className="bg-background min-h-screen">
                    New
                  </Badge>
                )}
              </h4>
              <p className="text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-muted-foreground">
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
    try {
      const unreadNotifications = notifications.filter(n => !n.is_read);
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
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#2F2F2F' }}>Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            style={filter === 'all' ? { backgroundColor: '#93827F', color: 'white' } : {}}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            style={filter === 'unread' ? { backgroundColor: '#93827F', color: 'white' } : {}}
          >
            Unread ({unreadCount})
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllRead}
              className="flex items-center gap-2"
            >
              <MailCheck className="w-4 h-4" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellOff className="w-16 h-16 mx-auto mb-4" style={{ color: '#BDC4A7' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2F2F2F' }}>
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-muted-foreground">
                {filter === 'unread' 
                  ? 'All caught up! Check back later for updates.' 
                  : 'Notifications about chore completions and achievements will appear here.'
                }
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                  delay={index * 0.1}
                />
              ))}
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
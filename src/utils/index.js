import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// URL helper function that your components are using
export function createPageUrl(pageName) {
  const pageRoutes = {
    'Dashboard': '/dashboard',
    'Children': '/children',
    'ChildProfile': '/child-profile',
    'ChoreTemplates': '/chore-templates',
    'Settings': '/settings',
    'Notifications': '/notifications',
    'AssignChore': '/assign-chore',
    'Achievements': '/achievements'
  }
  
  // Handle query parameters
  if (pageName.includes('?')) {
    const [page, query] = pageName.split('?')
    return `${pageRoutes[page] || `/${page.toLowerCase()}`}?${query}`
  }
  
  return pageRoutes[pageName] || `/${pageName.toLowerCase()}`
}

// Date formatting helpers
export function formatDate(date, format = 'MMM d, yyyy') {
  // Simple date formatter - in a real app you'd use date-fns
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Points calculation helpers
export function calculateLevel(points) {
  return Math.floor(points / 100) + 1
}

export function getProgressToNextLevel(points) {
  return points % 100
}
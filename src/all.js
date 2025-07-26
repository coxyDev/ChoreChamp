// Mock entity system for development
// In a real app, this would connect to your backend API

const mockData = {
  children: [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      avatar_color: 'sage',
      total_points: 150,
      total_money: 15.50,
      weekly_pocket_money: 8.00,
      level: 2,
      parent_email: 'parent@example.com'
    },
    {
      id: '2',
      name: 'Liam',
      age: 12,
      avatar_color: 'sea',
      total_points: 280,
      total_money: 32.75,
      weekly_pocket_money: 12.00,
      level: 3,
      parent_email: 'parent@example.com'
    }
  ],
  chores: [
    {
      id: '1',
      title: 'Make Bed',
      description: 'Tidy up bedroom and make bed properly',
      points: 10,
      category: 'bedroom',
      difficulty: 'easy',
      frequency: 'daily',
      min_age: 4,
      max_age: 16,
      is_template: true,
      assigned_to: '1',
      status: 'pending',
      due_date: '2025-07-27',
      parent_email: 'parent@example.com'
    },
    {
      id: '2',
      title: 'Load Dishwasher',
      description: 'Load dirty dishes and start the dishwasher',
      points: 15,
      category: 'kitchen',
      difficulty: 'medium',
      frequency: 'daily',
      min_age: 8,
      max_age: 16,
      is_template: true,
      assigned_to: '2',
      status: 'completed',
      due_date: '2025-07-26',
      completed_date: '2025-07-26T10:30:00Z',
      parent_email: 'parent@example.com'
    }
  ],
  notifications: [
    {
      id: '1',
      type: 'chore_completed',
      title: 'Chore Completed!',
      message: 'Liam completed "Load Dishwasher" and earned 15 points!',
      child_id: '2',
      chore_id: '2',
      is_read: false,
      parent_email: 'parent@example.com',
      created_date: '2025-07-26T10:30:00Z'
    }
  ],
  users: [
    {
      id: '1',
      email: 'parent@example.com',
      full_name: 'Parent User'
    }
  ]
}

// Mock API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Base Entity class
class BaseEntity {
  constructor(name) {
    this.name = name
    this.data = mockData[name.toLowerCase() + 's'] || []
  }

  async filter(criteria = {}, orderBy = null) {
    await delay(200) // Simulate API delay
    
    let filtered = this.data.filter(item => {
      return Object.entries(criteria).every(([key, value]) => {
        if (typeof value === 'boolean') {
          return item[key] === value
        }
        return item[key] === value
      })
    })

    if (orderBy) {
      const isDesc = orderBy.startsWith('-')
      const field = isDesc ? orderBy.substring(1) : orderBy
      
      filtered.sort((a, b) => {
        const aVal = a[field]
        const bVal = b[field]
        
        if (isDesc) {
          return bVal > aVal ? 1 : -1
        }
        return aVal > bVal ? 1 : -1
      })
    }

    return filtered
  }

  async get(id) {
    await delay(100)
    return this.data.find(item => item.id === id)
  }

  async create(data) {
    await delay(200)
    const newItem = {
      id: (this.data.length + 1).toString(),
      created_date: new Date().toISOString(),
      ...data
    }
    this.data.push(newItem)
    return newItem
  }

  async update(id, data) {
    await delay(200)
    const index = this.data.findIndex(item => item.id === id)
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...data }
      return this.data[index]
    }
    throw new Error('Item not found')
  }

  async delete(id) {
    await delay(200)
    const index = this.data.findIndex(item => item.id === id)
    if (index !== -1) {
      this.data.splice(index, 1)
      return true
    }
    throw new Error('Item not found')
  }
}

// User entity with special methods
class UserEntity extends BaseEntity {
  async me() {
    await delay(100)
    return mockData.users[0] // Return the first user as current user
  }

  async updateMyUserData(data) {
    await delay(200)
    Object.assign(mockData.users[0], data)
    return mockData.users[0]
  }

  async logout() {
    await delay(100)
    // In a real app, this would clear auth tokens and redirect
    console.log('User logged out')
  }
}

// Export entity instances
export const Child = new BaseEntity('Child')
export const Chore = new BaseEntity('Chore')
export const Notification = new BaseEntity('Notification')
export const User = new UserEntity('User')
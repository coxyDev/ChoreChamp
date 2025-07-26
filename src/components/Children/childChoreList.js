import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle2, Clock, Star, PlusCircle, ListTodo } from 'lucide-react';
import { format } from 'date-fns';

const ChoreItem = ({ chore, onVerify }) => {
  const isCompleted = chore.status === 'completed';
  const isVerified = chore.status === 'verified';

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0" style={{ borderColor: '#E2E8F0' }}>
      <div className="flex-grow">
        <p className={`font-bold ${isVerified ? 'line-through' : ''}`} style={{ color: isVerified ? '#5A5A5A' : '#2F2F2F' }}>
          {chore.title}
        </p>
        <div className="flex items-center gap-3 mt-1 text-sm" style={{ color: '#5A5A5A' }}>
          <span>Due: {format(new Date(chore.due_date), "MMM d, yyyy")}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" style={{ color: '#92B4A7' }} />
            {chore.points} pts
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        {isCompleted && (
          <Button 
            onClick={() => onVerify(chore.id)} 
            className="text-white"
            style={{ backgroundColor: '#92B4A7' }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" /> Verify
          </Button>
        )}
        {isVerified && (
          <Badge style={{ backgroundColor: '#93827F', color: 'white' }}>Verified</Badge>
        )}
        {chore.status === 'pending' && (
          <Badge variant="outline">Pending</Badge>
        )}
      </div>
    </div>
  );
};

export default function ChildChoreList({ chores, onVerify, childId }) {
  const [filter, setFilter] = useState('pending');

  const filteredChores = chores.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#2F2F2F' }}>
            <ListTodo className="w-5 h-5"/>
            Chore List
          </CardTitle>
          <Link to={createPageUrl(`AssignChore?childId=${childId}`)}>
            <Button className="text-white w-full sm:w-auto" style={{ backgroundColor: '#93827F' }}>
              <PlusCircle className="w-4 h-4 mr-2" /> Assign New Chore
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('pending')}
            className={filter === 'pending' ? 'text-white' : ''}
            style={filter === 'pending' ? { backgroundColor: '#93827F' } : {}}
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'completed' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'text-white' : ''}
            style={filter === 'completed' ? { backgroundColor: '#93827F' } : {}}
          >
            Completed
          </Button>
          <Button 
            variant={filter === 'verified' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('verified')}
            className={filter === 'verified' ? 'text-white' : ''}
            style={filter === 'verified' ? { backgroundColor: '#93827F' } : {}}
          >
            Verified
          </Button>
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'text-white' : ''}
            style={filter === 'all' ? { backgroundColor: '#93827F' } : {}}
          >
            All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y">
          {filteredChores.length > 0 ? (
            filteredChores.map(chore => <ChoreItem key={chore.id} chore={chore} onVerify={onVerify} />)
          ) : (
            <div className="text-center p-12" style={{ color: '#5A5A5A' }}>
              <p>No {filter} chores found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
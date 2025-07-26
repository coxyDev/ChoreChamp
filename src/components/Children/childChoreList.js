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
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border-b last:border-b-0 border-border">
      <div className="flex-grow min-w-0">
        <p className={`font-bold text-sm sm:text-base ${isVerified ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {chore.title}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1 text-sm text-muted-foreground">
          <span>Due: {format(new Date(chore.due_date), "MMM d, yyyy")}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-secondary" />
            {chore.points} pts
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        {isCompleted && (
          <Button 
            onClick={() => onVerify(chore.id)} 
            size="sm"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 min-h-[44px] sm:min-h-[36px]"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" /> 
            Verify
          </Button>
        )}
        {isVerified && (
          <Badge className="bg-primary text-primary-foreground">Verified</Badge>
        )}
        {chore.status === 'pending' && (
          <Badge variant="outline" className="border-border">Pending</Badge>
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

  const filterButtons = [
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'verified', label: 'Verified' },
    { key: 'all', label: 'All' }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
            <ListTodo className="w-5 h-5"/>
            Chore List
          </CardTitle>
          
          <Link to={createPageUrl(`AssignChore?childId=${childId}`)}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto min-h-[44px] sm:min-h-[36px]">
              <PlusCircle className="w-4 h-4 mr-2" /> 
              Assign New Chore
            </Button>
          </Link>
        </div>
        
        {/* Filter Buttons - Mobile First */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {filterButtons.map(({ key, label }) => (
            <Button 
              key={key}
              variant={filter === key ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter(key)}
              className={`
                min-h-[44px] sm:min-h-[32px] text-sm transition-all duration-200
                ${filter === key 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'border-border hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {filteredChores.length > 0 ? (
            filteredChores.map(chore => (
              <ChoreItem 
                key={chore.id} 
                chore={chore} 
                onVerify={onVerify} 
              />
            ))
          ) : (
            <div className="text-center p-8 sm:p-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <ListTodo className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No {filter} chores found</p>
              <p className="text-sm text-muted-foreground">
                {filter === 'pending' 
                  ? 'All chores are up to date!' 
                  : `Try switching to a different filter to see more chores.`
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
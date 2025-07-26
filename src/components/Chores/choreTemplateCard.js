
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryColors = {
  bedroom: 'bg-primary/20 text-primary',
  kitchen: 'bg-secondary/20 text-secondary-foreground',
  outdoor: 'bg-chorechamp-orange/20 text-chorechamp-orange',
  self_care: 'bg-accent/20 text-accent-foreground',
  pets: 'bg-muted text-muted-foreground',
  default: 'bg-card text-card-foreground'
};

export default function ChoreTemplateCard({ chore, delay }) {
  const colorClass = categoryColors[chore.category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="flex flex-col h-full border-border shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-foreground">{chore.title}</CardTitle>
            <Badge className={colorClass}>{chore.category.replace(/_/g, ' ')}</Badge>
          </div>
          <p className="text-sm text-muted-foreground pt-2">{chore.description}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-xs text-muted-foreground">AGES</p>
              <p className="font-bold text-foreground">{chore.min_age}-{chore.max_age}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">DIFFICULTY</p>
              <p className="font-bold text-foreground capitalize">{chore.difficulty}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 font-semibold text-primary/80">
              <Star className="w-4 h-4 fill-current text-secondary" />
              <span>{chore.points} points</span>
            </div>
          </div>
          <Link to={createPageUrl(`AssignChore?templateId=${chore.id}`)}>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <PlusCircle className="w-4 h-4 mr-2" />
              Assign
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

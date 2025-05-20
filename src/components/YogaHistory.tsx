
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface YogaSession {
  id: string;
  routine: string;
  date: string;
  duration: number;
  calories: number;
}

interface YogaHistoryProps {
  sessions: YogaSession[];
}

const YogaHistory = ({ sessions }: YogaHistoryProps) => {
  if (sessions.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Yoga Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            No yoga sessions completed yet. Start a session to track your progress!
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
  const totalCalories = sessions.reduce((acc, session) => acc + session.calories, 0);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Yoga Session History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-eco-light p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-eco-dark">{totalSessions}</p>
            <p className="text-sm text-gray-600">Sessions</p>
          </div>
          <div className="bg-eco-light p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-eco-dark">{totalMinutes}</p>
            <p className="text-sm text-gray-600">Minutes</p>
          </div>
          <div className="bg-eco-light p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-eco-dark">{totalCalories}</p>
            <p className="text-sm text-gray-600">Calories</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Routine</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.routine}</TableCell>
                  <TableCell>{session.duration} mins</TableCell>
                  <TableCell>{session.calories} kcal</TableCell>
                  <TableCell>
                    <Badge className="bg-eco text-white">
                      +{Math.round(session.duration / 2)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default YogaHistory;

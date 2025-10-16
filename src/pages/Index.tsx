import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const subjects = [
  'Русский язык',
  'Литература',
  'Алгебра',
  'Геометрия',
  'Информатика',
  'История',
  'Обществознание',
  'География',
  'Физика',
  'Химия',
  'Биология',
  'Английский язык',
  'Физкультура',
  'ОБЖ',
];

const schedule = {
  'Понедельник': [
    { subject: 'Русский язык', grades: [4, 5] },
    { subject: 'Алгебра', grades: [4] },
    { subject: 'История', grades: [] },
    { subject: 'Физика', grades: [] },
    { subject: 'Английский язык', grades: [] },
    { subject: 'Физкультура', grades: [] },
  ],
  'Вторник': [
    { subject: 'Геометрия', grades: [4, 5] },
    { subject: 'Литература', grades: [] },
    { subject: 'Биология', grades: [] },
    { subject: 'Информатика', grades: [] },
    { subject: 'География', grades: [] },
  ],
  'Среда': [
    { subject: 'Химия', grades: [4, 4] },
    { subject: 'Физика', grades: [5] },
    { subject: 'Русский язык', grades: [] },
    { subject: 'Обществознание', grades: [] },
    { subject: 'Английский язык', grades: [] },
    { subject: 'ОБЖ', grades: [] },
  ],
  'Четверг': [
    { subject: 'Алгебра', grades: [4, 4] },
    { subject: 'История', grades: [] },
    { subject: 'География', grades: [] },
    { subject: 'Физкультура', grades: [] },
    { subject: 'Литература', grades: [] },
  ],
  'Пятница': [
    { subject: 'Информатика', grades: [5, 4] },
    { subject: 'Биология', grades: [] },
    { subject: 'Английский язык', grades: [] },
    { subject: 'Геометрия', grades: [] },
    { subject: 'Химия', grades: [] },
  ],
};

const quarterGrades = subjects.map((subject) => ({
  subject,
  quarter1: subject === 'Литература' || subject === 'Геометрия' || subject === 'ОБЖ' ? 5 : 4,
}));

export default function Index() {
  const [activeDay, setActiveDay] = useState('Понедельник');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Icon name="BookOpen" size={32} className="text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Электронный дневник</h1>
          </div>
          <p className="text-muted-foreground">8Е класс • 2025/2026 учебный год</p>
          <Badge variant="outline" className="mt-2">Ученик: Котов Андрей</Badge>
        </header>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="schedule" className="text-base">
              <Icon name="Calendar" size={18} className="mr-2" />
              Расписание и оценки
            </TabsTrigger>
            <TabsTrigger value="quarters" className="text-base">
              <Icon name="Trophy" size={18} className="mr-2" />
              Четвертные оценки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className="p-6">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {Object.keys(schedule).map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      activeDay === day
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-3 font-semibold text-foreground">№</th>
                      <th className="text-left p-3 font-semibold text-foreground">Предмет</th>
                      <th className="text-left p-3 font-semibold text-foreground">Оценки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule[activeDay as keyof typeof schedule].map((lesson, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-muted-foreground">{index + 1}</td>
                        <td className="p-3 font-medium text-foreground">{lesson.subject}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {lesson.grades.length > 0 ? (
                              lesson.grades.map((grade, i) => (
                                <Badge
                                  key={i}
                                  variant={grade === 5 ? 'default' : 'secondary'}
                                  className={grade === 5 ? 'bg-accent hover:bg-accent/90' : ''}
                                >
                                  {grade}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="quarters">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-3 font-semibold text-foreground">Предмет</th>
                      <th className="text-center p-3 font-semibold text-foreground">I четверть</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quarterGrades.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-medium text-foreground">{item.subject}</td>
                        <td className="p-3 text-center">
                          <Badge
                            variant={item.quarter1 === 5 ? 'default' : 'secondary'}
                            className={item.quarter1 === 5 ? 'bg-accent hover:bg-accent/90' : ''}
                          >
                            {item.quarter1}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} />
            <span>МБОУ СОШ №43 • Электронный дневник успеваемости</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
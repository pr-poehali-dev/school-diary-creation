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
  quarter1: subject === 'Литература' || subject === 'Геометрия' || subject === 'ОБЖ' || subject === 'История' || subject === 'Физкультура' ? 5 : 4,
}));

export default function Index() {
  const [activeDay, setActiveDay] = useState('Понедельник');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="glass-effect rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-md">
                  <Icon name="BookOpen" size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold gradient-text">Электронный дневник</h1>
                  <p className="text-sm text-muted-foreground mt-1">МБОУ СОШ №43</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className="text-sm px-4 py-1.5">
                  <Icon name="User" size={14} className="mr-2" />
                  Котов Андрей
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  8Е класс • 2025/2026
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="glass-effect grid w-full grid-cols-2 mb-6 p-1.5 h-auto">
            <TabsTrigger value="schedule" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white rounded-lg transition-all">
              <Icon name="Calendar" size={18} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="quarters" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white rounded-lg transition-all">
              <Icon name="Trophy" size={18} className="mr-2" />
              Итоги четверти
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <div className="glass-effect rounded-xl p-4 shadow-md">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {Object.keys(schedule).map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all transform hover:scale-105 ${
                      activeDay === day
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                        : 'bg-white/50 text-foreground hover:bg-white/80'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <Card className="glass-effect shadow-lg border-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary/10 to-accent/10">
                      <th className="text-left p-4 font-semibold text-foreground rounded-tl-lg">№</th>
                      <th className="text-left p-4 font-semibold text-foreground">Предмет</th>
                      <th className="text-left p-4 font-semibold text-foreground rounded-tr-lg">Оценки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule[activeDay as keyof typeof schedule].map((lesson, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-white/50 transition-all">
                        <td className="p-4 text-muted-foreground font-medium">{index + 1}</td>
                        <td className="p-4 font-medium text-foreground">{lesson.subject}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {lesson.grades.length > 0 ? (
                              lesson.grades.map((grade, i) => (
                                <Badge
                                  key={i}
                                  variant={grade === 5 ? 'default' : 'secondary'}
                                  className={`text-base px-3 py-1 ${
                                    grade === 5 
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md' 
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  }`}
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
            <Card className="glass-effect shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-primary" />
                  Итоговые оценки за I четверть
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-4 font-semibold text-foreground">Предмет</th>
                      <th className="text-center p-4 font-semibold text-foreground">Оценка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quarterGrades.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-white/50 transition-all">
                        <td className="p-4 font-medium text-foreground">{item.subject}</td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={item.quarter1 === 5 ? 'default' : 'secondary'}
                            className={`text-lg px-4 py-1.5 ${
                              item.quarter1 === 5 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
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

        <footer className="mt-8 glass-effect rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-primary" />
            <span>Электронный дневник успеваемости</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

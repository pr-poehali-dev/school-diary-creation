import { useState, useEffect } from 'react';
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

const baseSchedule = {
  'Понедельник': [
    { subject: 'Русский язык' },
    { subject: 'Алгебра' },
    { subject: 'История' },
    { subject: 'Физика' },
    { subject: 'Английский язык' },
    { subject: 'Физкультура' },
  ],
  'Вторник': [
    { subject: 'Геометрия' },
    { subject: 'Литература' },
    { subject: 'Биология' },
    { subject: 'Информатика' },
    { subject: 'География' },
  ],
  'Среда': [
    { subject: 'Химия' },
    { subject: 'Физика' },
    { subject: 'Русский язык' },
    { subject: 'Обществознание' },
    { subject: 'Английский язык' },
    { subject: 'ОБЖ' },
  ],
  'Четверг': [
    { subject: 'Алгебра' },
    { subject: 'История' },
    { subject: 'География' },
    { subject: 'Физкультура' },
    { subject: 'Литература' },
  ],
  'Пятница': [
    { subject: 'Информатика' },
    { subject: 'Биология' },
    { subject: 'Английский язык' },
    { subject: 'Геометрия' },
    { subject: 'Химия' },
  ],
};

interface Week {
  weekNumber: number;
  startDate: Date;
  schedule: {
    [key: string]: Array<{ subject: string; grades: number[] }>;
  };
}

const quarterGrades = subjects.map((subject) => ({
  subject,
  quarter2: subject === 'Русский язык' || subject === 'Алгебра' || subject === 'Информатика' || subject === 'География' || subject === 'Английский язык' ? 5 : 4,
}));

const createWeekSchedule = () => {
  const weekSchedule: { [key: string]: Array<{ subject: string; grades: number[] }> } = {};
  
  const allLessons: Array<{ day: string; lesson: { subject: string } }> = [];
  Object.keys(baseSchedule).forEach((day) => {
    baseSchedule[day as keyof typeof baseSchedule].forEach((lesson) => {
      allLessons.push({ day, lesson });
    });
  });
  
  const totalLessons = allLessons.length;
  const lessonsWithGrades = Math.floor(totalLessons * 0.6);
  const maxThrees = Math.random() > 0.5 ? 1 : 2;
  
  const shuffled = [...allLessons].sort(() => Math.random() - 0.5);
  const lessonsToGrade = shuffled.slice(0, lessonsWithGrades);
  
  let threesCount = 0;
  const gradesMap = new Map<string, number[]>();
  
  lessonsToGrade.forEach(({ day, lesson }) => {
    const key = `${day}-${lesson.subject}`;
    let grade: number;
    
    if (threesCount < maxThrees && Math.random() < 0.1) {
      grade = 3;
      threesCount++;
    } else {
      grade = Math.random() > 0.4 ? 5 : 4;
    }
    
    gradesMap.set(key, [grade]);
  });
  
  Object.keys(baseSchedule).forEach((day) => {
    weekSchedule[day] = baseSchedule[day as keyof typeof baseSchedule].map((lesson) => {
      const key = `${day}-${lesson.subject}`;
      return {
        ...lesson,
        grades: gradesMap.get(key) || [],
      };
    });
  });
  
  return weekSchedule;
};

const getWeekNumber = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
};

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

export default function Index() {
  const [activeDay, setActiveDay] = useState('Понедельник');
  const [weeks, setWeeks] = useState<Week[]>(() => {
    localStorage.removeItem('diary-weeks');
    
    const today = new Date();
    const startDate = getStartOfWeek(new Date());
    return [{
      weekNumber: getWeekNumber(today),
      startDate,
      schedule: createWeekSchedule(),
    }];
  });
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  useEffect(() => {
    const checkAndAddWeek = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      
      if (dayOfWeek === 0) {
        const lastWeek = weeks[weeks.length - 1];
        const lastWeekStart = new Date(lastWeek.startDate);
        const nextWeekStart = new Date(lastWeekStart);
        nextWeekStart.setDate(lastWeekStart.getDate() + 7);
        
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        nextWeekStart.setHours(0, 0, 0, 0);
        
        if (todayStart >= nextWeekStart) {
          const newWeek: Week = {
            weekNumber: getWeekNumber(nextWeekStart),
            startDate: nextWeekStart,
            schedule: createWeekSchedule(),
          };
          
          const updatedWeeks = [...weeks, newWeek];
          setWeeks(updatedWeeks);
          localStorage.setItem('diary-weeks', JSON.stringify(updatedWeeks));
        }
      }
    };

    checkAndAddWeek();
    const interval = setInterval(checkAndAddWeek, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [weeks]);

  useEffect(() => {
    localStorage.setItem('diary-weeks', JSON.stringify(weeks));
  }, [weeks]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  const currentWeek = weeks[currentWeekIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="glass-effect rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg">
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
            <TabsTrigger value="schedule" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all shadow-sm">
              <Icon name="Calendar" size={18} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="quarters" className="text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all shadow-sm">
              <Icon name="Trophy" size={18} className="mr-2" />
              Итоги четверти
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <div className="glass-effect rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentWeekIndex(Math.max(0, currentWeekIndex - 1))}
                  disabled={currentWeekIndex === 0}
                  className="p-2 rounded-lg hover:bg-white/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Неделя {currentWeek.weekNumber}</p>
                  <p className="text-xs text-muted-foreground">с {formatDate(currentWeek.startDate)}</p>
                </div>
                <button
                  onClick={() => setCurrentWeekIndex(Math.min(weeks.length - 1, currentWeekIndex + 1))}
                  disabled={currentWeekIndex === weeks.length - 1}
                  className="p-2 rounded-lg hover:bg-white/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {Object.keys(currentWeek.schedule).map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all transform hover:scale-105 ${
                      activeDay === day
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'bg-white/60 text-foreground hover:bg-white/90 hover:shadow-md'
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
                    <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <th className="text-left p-4 font-semibold text-foreground rounded-tl-lg">№</th>
                      <th className="text-left p-4 font-semibold text-foreground">Предмет</th>
                      <th className="text-left p-4 font-semibold text-foreground rounded-tr-lg">Оценки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentWeek.schedule[activeDay as keyof typeof currentWeek.schedule]?.map((lesson, index) => (
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
                                  className={`text-base px-3 py-1 shadow-sm ${
                                    grade === 5 
                                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md' 
                                      : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200'
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
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-purple-600" />
                  Итоговые оценки за II четверть
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
                            variant={item.quarter2 === 5 ? 'default' : 'secondary'}
                            className={`text-lg px-4 py-1.5 shadow-sm ${
                              item.quarter2 === 5 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md' 
                                : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200'
                            }`}
                          >
                            {item.quarter2}
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

        <footer className="mt-8 glass-effect rounded-xl p-6 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-purple-600" />
              <span>Электронный дневник успеваемости</span>
            </div>
            <div className="flex items-center justify-between w-full max-w-md mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 shadow-md border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2.5 rounded-lg shadow-md">
                  <Icon name="TrendingUp" size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Средний балл</span>
              </div>
              {(() => {
                const average = (quarterGrades.reduce((sum, item) => sum + item.quarter2, 0) / quarterGrades.length).toFixed(2);
                return <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{average}</span>;
              })()}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
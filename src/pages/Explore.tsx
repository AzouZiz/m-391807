import React from 'react';
import { Flame, Filter, Search, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Explore = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">استكشف الوصفات</h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div className="flex items-center w-full md:w-auto">
            <Input type="search" placeholder="ابحث عن وصفة..." className="md:w-80" />
            <Button variant="outline" className="ml-2">
              <Search className="w-4 h-4 mr-2" />
              بحث
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              تصفية
            </Button>
            <Button>
              <BarChart2 className="w-4 h-4 mr-2" />
              تحليلات
            </Button>
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipe Cards */}
          <Card className="bg-card text-card-foreground shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">وصفة الكبسة السعودية</h2>
              <p className="text-sm text-muted-foreground mb-3">وصفة تقليدية من المملكة العربية السعودية.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  عالي السعرات
                </Badge>
                <Button variant="ghost">عرض التفاصيل</Button>
              </div>
            </div>
          </Card>

          <Card className="bg-card text-card-foreground shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">المندي اليمني</h2>
              <p className="text-sm text-muted-foreground mb-3">طبق لحم الأرز المدخن الشهير من اليمن.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  متوسط السعرات
                </Badge>
                <Button variant="ghost">عرض التفاصيل</Button>
              </div>
            </div>
          </Card>

          <Card className="bg-card text-card-foreground shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">البرياني الهندي</h2>
              <p className="text-sm text-muted-foreground mb-3">طبق أرز مختلط من شبه القارة الهندية.</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Flame className="w-3 h-3 mr-1" />
                  عالي السعرات
                </Badge>
                <Button variant="ghost">عرض التفاصيل</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;

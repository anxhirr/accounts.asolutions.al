import {
  SalesByCategoryChart,
  SalesByCategoryChartDataType,
  TransactionsChartDataType,
  UserMovementsChart,
  UserMovementsChartDataType,
} from "@/components/chart";
import { SelectCategoriesType } from "@/supabase/migrations/validation";
import { IncomeProgressCard } from "../card";
import {
  RevenueByCategoryChart,
  RevenueByCategoryChartDataType,
} from "../chart/pie/profit-by-category";
import { IncomeChart, IncomeChartDataType } from "../chart/radial/income";
import { RoleWrapper } from "../wrappers";

export function Dashboard({
  transBarChartData,
  userMovementsChartData,
  salesByCatChartData,
  revenueByCatPieChartData,
  incomeRadialChartData,

  netProfit,
  inventoryIntake,

  categoriesList,
}: {
  salesByCatChartData: SalesByCategoryChartDataType[];
  userMovementsChartData: UserMovementsChartDataType[];
  transBarChartData: TransactionsChartDataType[];
  revenueByCatPieChartData: RevenueByCategoryChartDataType[];
  incomeRadialChartData: IncomeChartDataType[];

  netProfit: number;
  inventoryIntake: number;

  categoriesList: SelectCategoriesType[];
}) {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 2xl:grid-cols-3'>
          {/* <TransactionsChart data={transBarChartData} /> */}
          <UserMovementsChart data={userMovementsChartData} />
          <SalesByCategoryChart
            data={salesByCatChartData}
            categoriesList={categoriesList}
          />
          <RoleWrapper requiredRole='ADMIN'>
            <RevenueByCategoryChart
              data={revenueByCatPieChartData}
              categoriesList={categoriesList}
            />

            <div className='grid gap-4 2xl:col-span-2 2xl:grid-cols-2'>
              <IncomeProgressCard
                title='Net Profit'
                amount={netProfit}
                percentage={10} // TODO: dynamic
              />
              <IncomeProgressCard
                title='Inventory Intake'
                amount={inventoryIntake}
                percentage={20} // TODO: dynamic
              />
            </div>
          </RoleWrapper>
        </div>
      </div>
      <RoleWrapper requiredRole='ADMIN'>
        <div>
          <IncomeChart data={incomeRadialChartData} />
        </div>
      </RoleWrapper>
    </main>
  );
}

import { defineComponent, reactive, ref, watch } from "vue";
import s from "./ExportPage.module.scss";
import { Icon } from "../shared/Icon";
import { MyButton } from "../shared/MyButton";
import { showFailToast, showSuccessToast } from "vant";
import { DateSelectDialog } from "../components/items/DateSelectDialog";
import { MainLayout } from "../layouts/MainLayout";
import { useRouter } from "vue-router";
import { http } from "../shared/Http";
import ExcelJS from "exceljs";

export const ExportPage = defineComponent({
  setup: (props, context) => {
    const router = useRouter();

    const goBack = () => {
      router.push("/items");
    };

    // 时间选择对话框：使用Overlay、Form来封装
    const show = ref(false);
    const dialogRef = ref();
    const defineDate = reactive({
      startDate: "",
      endDate: "",
    });
    const handleSelect = () => {
      dialogRef.value.openOverlay();
    };

    // 获取收支统计数据
    const balanceData = reactive<Balance>({
      income: 0,
      expenses: 0,
      balance: 0,
    });
    const getBalanceData = async () => {
      const res = await http.get<Balance>("/items/balance", {
        happen_after: defineDate.startDate.split("T")[0],
        happen_before: defineDate.endDate.split("T")[0],
      });
      Object.assign(balanceData, res.data);
    };

    // 获取账单数据
    const page = ref(1);
    const num = ref(0);
    const billData = ref<Item[]>([]);
    const timer = ref<number>(0);
    const getBillData = async () => {
      const res = await http.get<Resources<Item>>("/items", {
        happen_after: defineDate.startDate,
        happen_before: defineDate.endDate,
        page: page.value,
      });
      let { pager, resources } = res.data;
      num.value += resources.length;
      page.value++;
      billData.value.push(...resources);
      if (num.value < pager.count) {
        getBillData();
      }
    };

    watch(
      () => [defineDate.startDate, defineDate.endDate],
      async () => {
        billData.value = [];
        page.value = 1;
        try {
          await getBalanceData();
          await getBillData();
          exportExcel();
          showSuccessToast({
            message: "已导出为 excel 文件",
            duration: 2000,
            wordBreak: "break-word",
          });
        } catch (err) {
          showFailToast({
            message: "服务器繁忙",
            duration: 2000,
            wordBreak: "break-word",
          });
        }
      }
    );

    // 导出数据为excel
    function exportExcel() {
      const workbook = new ExcelJS.Workbook(); // 创建工作簿
      const worksheet_balance = workbook.addWorksheet("收支统计"); // 收支统计表
      const worksheet_bill = workbook.addWorksheet("账单详情"); // 账单表

      // 设置表头
      worksheet_balance.columns = [
        {
          header: "开始时间",
          key: "startDate",
          width: 20,
        },
        {
          header: "结束时间",
          key: "endDate",
          width: 20,
        },
        {
          header: "总收入",
          key: "income",
          width: 10,
        },
        {
          header: "总支出",
          key: "expenses",
          width: 10,
        },
        {
          header: "净收入",
          key: "balance",
          width: 10,
        },
      ];
      worksheet_bill.columns = [
        {
          header: "日期",
          key: "date",
          width: 20,
        },
        {
          header: "标签",
          key: "tag",
          width: 10,
        },
        {
          header: "金额",
          key: "amount",
          width: 20,
        },
        {
          header: "类型",
          key: "kind",
          width: 10,
        },
      ];
      // 添加表体数据
      worksheet_balance.addRow({
        startDate: defineDate.startDate.split("T")[0],
        endDate: defineDate.endDate.split("T")[0],
        income: balanceData.income,
        expenses: balanceData.expenses,
        balance: balanceData.balance,
      });
      billData.value.forEach((item) => {
        worksheet_bill.addRow({
          date: item.happen_at.split("T")[0],
          tag: item.tags[0].name,
          amount:
            item.kind === "expenses"
              ? `-${item.amount.toFixed(2)}`
              : item.amount.toFixed(2),
          kind: item.kind === "expenses" ? "支出" : "收入",
        });
      });

      // 第一行字体加粗
      worksheet_bill.getRow(1).font = {
        bold: true,
      };
      worksheet_balance.getRow(1).font = {
        bold: true,
      };
      // 设置所有单元格水平居中
      worksheet_bill.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
          cell.alignment = { horizontal: "center" };
        });
      });
      worksheet_balance.eachRow(
        { includeEmpty: true },
        function (row, rowNumber) {
          row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
            cell.alignment = { horizontal: "center" };
          });
        }
      );

      // 导出到：账单.xlsx
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "账单" + ".xlsx";
        link.click();
        URL.revokeObjectURL(link.href); // 下载完成释放掉blob对象
      });
    }

    return () => (
      <MainLayout>
        {{
          title: () => "导出账单",
          icon: () => <Icon name="home" class={s.navIcon} onClick={goBack} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <div class={s.pig_wrapper}>
                  <Icon name="pig" class={s.pig} />
                </div>
                <MyButton onClick={handleSelect}>点击选择日期</MyButton>
              </div>
              <DateSelectDialog
                ref={dialogRef}
                v-model:show={show.value}
                v-model:startDate={defineDate.startDate}
                v-model:endDate={defineDate.endDate}
              ></DateSelectDialog>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

export default ExportPage;

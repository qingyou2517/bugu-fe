import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";
import exp from "constants";
import dayjs from "dayjs";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

let id = 0;
const createId = () => {
  return ++id;
};
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params;
  const createTag = (n = 1, attrs?: object) => {
    // 长度为n的对象数组
    return Array.from({ length: n }).map(() => {
      return {
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: kind,
        ...attrs,
      };
    });
  };
  if (kind === "expenses" && (!page || page === 1)) {
    return [
      200,
      {
        resources: createTag(25),
        pager: {
          page,
          per_page: 25,
          count: 36,
        },
      },
    ];
  } else if (kind === "expenses" && page === 2) {
    return [
      200,
      {
        resources: createTag(11),
        pager: {
          page,
          per_page: 25,
          count: 36,
        },
      },
    ];
  } else if (kind === "income" && (!page || page === 1)) {
    return [
      200,
      {
        resources: createTag(25),
        pager: {
          page,
          per_page: 25,
          count: 55,
        },
      },
    ];
  } else if (kind === "income" && (!page || page === 2)) {
    return [
      200,
      {
        resources: createTag(25),
        pager: {
          page,
          per_page: 25,
          count: 55,
        },
      },
    ];
  } else if (kind === "income" && (!page || page === 3)) {
    return [
      200,
      {
        resources: createTag(5),
        pager: {
          page,
          per_page: 25,
          count: 55,
        },
      },
    ];
  } else {
    return [
      200,
      {
        resources: [],
        pager: {
          page,
          per_page: 0,
          count: 0,
        },
      },
    ];
  }
};

export const mockItemCreate: Mock = (config) => {
  // return [
  //   422,
  //   {
  //     errors: {
  //       tags_id: ["必须选择一个标签"],
  //       amount: ["必须输入金额"],
  //     },
  //   },
  // ];
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9900,
        note: null,
        tags_id: [3508],
        happen_at: "2020-10-29T16:00:00.000Z",
        created_at: "2022-07-03T15:35:56.301Z",
        updated_at: "2022-07-03T15:35:56.301Z",
        kind: "expenses",
      },
    },
  ];
};

export const mockItemIndexBalance: Mock = (config) => {
  const expenses = Math.floor(Math.random() * 10000);
  const income = Math.floor(Math.random() * 10000);
  return [
    200,
    {
      expenses,
      income,
      balance: income - expenses,
    },
  ];
};

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params;
  const per_page = 25;
  const count = 26;
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  });
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "income",
    ...attrs,
  });
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000), // 数据库的金额以分为单位
      tags_id: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: "income",
    }));
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
  });
  if (!page || page === 1) {
    return [200, createBody(25)];
  } else if (page === 2) {
    return [200, createBody(1)];
  } else {
    return [200, {}];
  }
};

export const mockTagCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 757,
        user_id: 286,
        name: "x",
        sign: "x",
        deleted_at: null,
        created_at: "2023-09-13T16:50:04.694+08:00",
        updated_at: "2023-09-13T16:50:04.694+08:00",
        kind: "income",
      },
    },
  ];
};

export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "expenses",
    ...attrs,
  });
  return [200, { resource: createTag() }];
};

export const mockTagEdit: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 757,
        user_id: 286,
        name: "x",
        sign: "x",
        deleted_at: null,
        created_at: "2023-09-13T16:50:04.694+08:00",
        updated_at: "2023-09-13T16:50:04.694+08:00",
        kind: "income",
      },
    },
  ];
};

export const mockTagDelete: Mock = (config) => {
  return [200, {}];
};

// 统计图表
export const mockItemSummary: Mock = (config) => {
  const { happened_after, happen_before, kind } = config.params;
  const startDate = dayjs(happened_after);
  const endDate = dayjs(happen_before);
  const thisMonth = dayjs().startOf("month");
  const lastMonth = thisMonth.add(-1, "month").startOf("month");
  if (
    startDate.isSame(thisMonth, "month") &&
    endDate.isSame(thisMonth, "month")
  ) {
    // console.log("本月");
    return [
      200,
      {
        groups: [
          {
            happened_at: startDate.format("YYYY-MM-DD"),
            amount: kind === "expenses" ? 10000 : 0,
          },
          {
            happened_at: startDate.add(2, "day").format("YYYY-MM-DD"),
            amount: kind === "expenses" ? 0 : 10000,
          },
          {
            happened_at: endDate.format("YYYY-MM-DD"),
            amount: 10000,
          },
        ],
      },
    ];
  } else if (
    startDate.isSame(lastMonth, "month") &&
    endDate.isSame(lastMonth, "month")
  ) {
    // console.log("上个月");
    return [
      200,
      {
        groups: [
          {
            happened_at: startDate.add(1, "day").format("YYYY-MM-DD"),
            amount: 20000,
          },
          {
            happened_at: startDate.add(2, "day").format("YYYY-MM-DD"),
            amount: kind === "expenses" ? 25000 : 0,
          },
          {
            happened_at: endDate.format("YYYY-MM-DD"),
            amount: 20000,
          },
        ],
      },
    ];
  } else if (
    startDate.isSame(dayjs().startOf("year"), "day") &&
    endDate.isSame(dayjs().endOf("year"), "day")
  ) {
    // console.log("今年");
    return [
      200,
      {
        groups: [
          {
            happened_at: startDate.format("YYYY-MM-DD"),
            amount: 30000,
          },
          {
            happened_at: startDate.add(1, "month").format("YYYY-MM-DD"),
            amount: kind === "expenses" ? 0 : 30000,
          },
          {
            happened_at: endDate.add(-2, "month").format("YYYY-MM-DD"),
            amount: kind === "expenses" ? 30000 : 35000,
          },
        ],
      },
    ];
  } else {
    // console.log("自定义时间");
    const array: Data[] = [];
    let date = startDate.add(0, "month");
    while (date.isBefore(endDate)) {
      array.push({
        happened_at: date.format("YYYY-MM-DD"),
        amount: kind === "expenses" ? 40000 : 45000,
      });
      date = date.add(1, "month");
    }
    return [
      200,
      {
        groups: array,
      },
    ];
  }
};

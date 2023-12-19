import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

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

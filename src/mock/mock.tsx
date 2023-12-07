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

export const mockTagIndex: Mock = (config) => {
  let id = 0;
  const createId = () => {
    return ++id;
  };
  const createTag = (n = 1, attrs?: object) => {
    // 长度为n的对象数组
    return Array.from({ length: n }).map(() => {
      return {
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: config.params.kind,
        ...attrs,
      };
    });
  };
  if (config.params.kind === "expense") {
    return [
      200,
      {
        resources: createTag(7),
      },
    ];
  } else if (config.params.kind === "income") {
    return [
      200,
      {
        resources: createTag(30),
      },
    ];
  }
  return [200, { resources: [] }];
};

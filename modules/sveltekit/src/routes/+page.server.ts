import { testData } from "testdata";

export const load = async () => {
  return { entries: await testData() };
};

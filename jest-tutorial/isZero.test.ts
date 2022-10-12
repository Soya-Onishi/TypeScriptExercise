import { isZero } from "./isZero";

test("0を渡したらTrue", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});

test("1を渡したらFalse", () => {
  const result = isZero(1);
  expect(result).toBe(false);
});
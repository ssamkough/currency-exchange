import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";

import App from "./App";

test("renders the correct content", () => {
  const { getByText } = render(<App />);

  expect(getByText("Currency Exchange"));
});

test("allow users to input currency and output the exchange", () => {
  const { getByText, getByTestId } = render(<App />);

  const input = getByText("Currency Exchange");
  expect(getByTestId("nativeSelect"));
  //   fireEvent.change(getByTestId("nativeSelect"), {
  //     target: { value: "USD" },
  //   });
  //   expect(getByText("USD"));
  //   fireEvent.change(input, { target: { value: "Test" } });
  //   fireEvent.click(getByText("Convert"));
});

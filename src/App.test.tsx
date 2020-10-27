import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

test("renders the correct content", async () => {
  const { getByText } = render(<App />);

  expect(getByText("Currency Exchange"));
  expect(getByText("Convert"));

  await waitFor(() => {
    expect(screen.getAllByDisplayValue("AUD"));
  });
});

test("allow users to input currency and output the exchange", async () => {
  const { getByText, getByTestId } = render(<App />);
  const leftClick = { button: 1 };

  await waitFor(() => {
    expect(screen.getAllByDisplayValue("AUD"));
  });

  fireEvent.change(getByTestId("nativeSelect"), {
    target: { value: "USD" },
  });
  expect(screen.getByDisplayValue("USD"));

  expect(screen.getAllByDisplayValue("0"));

  fireEvent.change(getByTestId("nativeInput"), {
    target: { value: "10" },
  });
  expect(screen.getByDisplayValue("10"));
  expect(screen.getByTestId("foreignInput")).toHaveDisplayValue("0");

  fireEvent.click(getByText("Convert"), leftClick);

  expect(screen.getByTestId("foreignInput")).not.toHaveTextContent("0");
});

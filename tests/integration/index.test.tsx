import React from "react";
import { screen, render } from "tests/utilities";
import { server } from "tests/mocks/server";
import { rest } from "msw";
import { Users } from "components/Users";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

describe("Users", () => {
  it("shows feedback on error", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users", (_req, res, ctx) =>
        res(ctx.status(503), ctx.json({ error: "Internal server error" }))
      )
    );

    render(<Users />);

    await waitFor(
      () =>
        screen.findByText(
          "Error fetching data. Check your connection, try again in a little while - and if nothing works, shoot us a message: this.email.address@doesnt.exist.com"
        ),
      { timeout: 5000 }
    );
  });

  it("renders users list", async () => {
    render(<Users />);

    await screen.findByText("1.");

    screen.getByText("Jan Kowalski");
    screen.getByText("@kowalsky");
    screen.getByText("2.");
    screen.getByText("Adam Nowak");
    screen.getByText("@nowakowski");
    screen.getByText("3.");
    screen.getByText("Paweł Kwiek");
    screen.getByText("@kwk");

    // only 3 and no more
    expect(screen.queryByText("4.")).toBeNull();
  });

  it("filters users list on typing", async () => {
    render(<Users />);

    await screen.findByText("Jan Kowalski");
    screen.getByText("Adam Nowak");
    screen.getByText("Paweł Kwiek");

    userEvent.type(screen.getByPlaceholderText("Search users"), "Adam");

    expect(screen.queryByText("1.")).toBeNull();
    expect(screen.queryByText("Jan Kowalski")).toBeNull();
    expect(screen.queryByText("3.")).toBeNull();
    expect(screen.queryByText("Paweł Kwiek")).toBeNull();

    // verify filtering feedback
    expect(screen.getByText("Adam")).toHaveStyle({
      textDecoration: "underline",
    });

    // only highlight what's important
    userEvent.click(screen.getByLabelText("Clear input"));
    userEvent.type(screen.getByPlaceholderText("Search users"), "Ad");

    expect(screen.getByText("Ad")).toHaveStyle({ textDecoration: "underline" });
  });
});

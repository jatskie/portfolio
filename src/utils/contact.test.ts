import { describe, expect, it } from "vitest";
import { buildMailto, validateContact } from "./contact";

describe("contact helpers", () => {
  it("requires name, email, and message", () => {
    expect(validateContact({ name: "", email: "", projectType: "", budgetTimeline: "", message: "" })).toEqual({
      name: "Enter your name.",
      email: "Enter your email.",
      message: "Tell me a little about the project."
    });
  });

  it("rejects invalid email", () => {
    expect(validateContact({ name: "Sam", email: "not-email", projectType: "", budgetTimeline: "", message: "Help" })).toEqual({
      email: "Enter a valid email address."
    });
  });

  it("builds a mailto URL with encoded project details", () => {
    const mailto = buildMailto({
      name: "Sam Lee",
      email: "sam@example.com",
      projectType: "Legacy rescue",
      budgetTimeline: "Soon",
      message: "We inherited a Laravel app."
    });

    expect(mailto).toContain("mailto:jace.macalalad@gmail.com");
    expect(mailto).toContain("subject=Project%20enquiry%20from%20Sam%20Lee");
    expect(mailto).toContain("We%20inherited%20a%20Laravel%20app.");
  });
});

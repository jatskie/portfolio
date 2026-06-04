import { describe, expect, it } from "vitest";
import { caseStudies, proofItems, services, SITE, stackGroups } from "./site";

describe("portfolio content", () => {
  it("uses the approved launch contact email", () => {
    expect(SITE.email).toBe("jace.macalalad@gmail.com");
  });

  it("keeps the primary positioning focused on systems and legacy rescue", () => {
    expect(SITE.tagline).toContain("Custom business systems");
    expect(SITE.tagline).toContain("legacy rescue");
    expect(SITE.tagline).toContain("firmware to frontend");
  });

  it("has the two approved service lanes", () => {
    expect(services.map((service) => service.id)).toEqual(["build", "rescue"]);
  });

  it("includes the required proof anchors", () => {
    const proofLabels = proofItems.map((item) => item.label);
    expect(proofLabels).toContain("UPDox");
    expect(proofLabels).toContain("Ignite Careers");
    expect(proofLabels).toContain("NEO self-service systems");
    expect(proofLabels).toContain("Iskomunidad / iskWiki");
  });

  it("keeps private client work anonymized", () => {
    const anonymized = caseStudies.find((item) => item.id === "anonymized-business-systems");
    expect(anonymized?.privacy).toBe("anonymized");
    expect(anonymized?.title.toLowerCase()).not.toContain("hotel name");
    expect(anonymized?.title.toLowerCase()).not.toContain("restaurant name");
  });

  it("represents firmware-to-frontend breadth in stack groups", () => {
    const stackText = stackGroups.flatMap((group) => group.items).join(" ");
    expect(stackText).toContain("C++");
    expect(stackText).toContain("PHP / Laravel");
    expect(stackText).toContain("Hardware integration");
    expect(stackText).toContain("TypeScript");
  });
});

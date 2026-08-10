import { describe, it, expect } from "vitest";
import { escapeHtml } from "./index.js";

describe("escapeHtml (Telegram parse_mode=HTML safety)", () => {
  it("escapes the HTML-significant characters", () => {
    expect(escapeHtml('<b>&"</b>')).toBe('&lt;b&gt;&amp;"&lt;/b&gt;');
  });

  it("escapes & first so it does not double-encode", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("neutralizes a company name that tries to inject markup", () => {
    expect(escapeHtml('Acme <a href="x">Corp</a>')).toBe(
      'Acme &lt;a href="x"&gt;Corp&lt;/a&gt;',
    );
  });

  it("coerces non-strings without throwing", () => {
    expect(escapeHtml(undefined)).toBe("undefined");
    expect(escapeHtml(42)).toBe("42");
  });
});

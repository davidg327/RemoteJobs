import {date} from "@/util/date";

describe("date", () => {

    it("formats date correctly", () => {
        const result = date("2026-01-01");
        expect(result).toBe("01/01/2026");
    });

    it("returns invalid date format when date is invalid", () => {
        const result = date("invalid-date");
        expect(result).toBe("Invalid date");
    });

    it("formats another date correctly", () => {
        const result = date("2025-12-31");
        expect(result).toBe("12/31/2025");
    });
});

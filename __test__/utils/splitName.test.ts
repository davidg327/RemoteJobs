import {getOnlyName, getCity} from "@/util/splitName";

describe("splitName utils", () => {

    describe("getOnlyName", () => {

        it("returns only name before parentheses", () => {
            const result = getOnlyName("React Native Developer (Remote)");
            expect(result).toBe("React Native Developer");
        });

        it("returns same text when no parentheses exist", () => {
            const result = getOnlyName("Frontend Developer");
            expect(result).toBe("Frontend Developer");
        });

        it("removes spaces after split", () => {
            const result = getOnlyName("Backend Developer ( Node )");
            expect(result).toBe("Backend Developer");
        });
    });

    describe("getCity", () => {

        it("returns city and country when job contains location", () => {
            const result = getCity(
                "Developer (Bogota)",
                "Colombia"
            );
            expect(result).toBe("Bogota - Colombia");
        });

        it("returns worldwide translated", () => {
            const result = getCity(
                "Developer",
                "Worldwide"
            );
            expect(result).toBe("Todo el mundo");
        });

        it("returns country when job has no location", () => {
            const result = getCity(
                "Developer",
                "Colombia"
            );
            expect(result).toBe("Colombia");
        });

        it("removes spaces from city name", () => {
            const result = getCity(
                "Developer ( Medellin )",
                "Colombia"
            );
            expect(result).toBe("Medellin - Colombia");
        });
    });
});

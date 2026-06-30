import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {CardJob} from "@/components/organisms/cardJob";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {TouchableOpacity} from "react-native";


jest.mock("expo-image", () => {
    const React = require("react");

    return {
        Image: (props: any) => (
            <mock-image {...props}/>
        ),
    };
});

jest.mock("@/components/atoms", () => {
    const React = require("react");

    return {
        ThemedText: ({children, ...props}: any) => (
            <mock-themed-text {...props}>
                {children}
            </mock-themed-text>
        ),
    };
});

jest.mock("@/hooks/use-color-scheme", () => ({
    useColorScheme: jest.fn(),
}));

jest.mock("@/util/splitName", () => ({
    getOnlyName: jest.fn((value) => `name-${value}`),
    getCity: jest.fn(() => "Bogota"),
}));

jest.mock("@/util/date", () => ({
    date: jest.fn(() => "01/01/2026"),
}));

jest.mock("@/constants/theme", () => ({
    Colors: {
        light: {
            background: "white",
            text: "black",
        },
        dark: {
            background: "black",
            text: "white",
        },
    },
}));

describe("CardJob", () => {
    const job = {
        title: "React Native Developer",
        companyLogo: "https://logo.com/image.png",
        companyName: "Google",
        candidateLocation: "Bogota",
        publicationDate: "2026-01-01",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useColorScheme as jest.Mock).mockReturnValue("light");
    });

    it("renders company logo", () => {
        const {UNSAFE_getByType} = render(
            <CardJob
                job={job as any}
                redirect={jest.fn()}
            />
        );

        const image = UNSAFE_getByType("mock-image");
        expect(image.props.source).toEqual({
            uri: "https://logo.com/image.png",
        });
    });

    it("renders job information", () => {
        const {UNSAFE_getAllByType} = render(
            <CardJob
                job={job as any}
                redirect={jest.fn()}
            />
        );

        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts[0].props.children).toBe("name-React Native Developer");
        expect(texts[1].props.children.join("")).toBe("Empresa: Google");
        expect(texts[2].props.children).toBe("Bogota");
        expect(texts[3].props.children).toBe("01/01/2026");
    });

    it("calls redirect when card is pressed", () => {
        const redirect = jest.fn();
        const {UNSAFE_getByType} = render(
            <CardJob
                job={job as any}
                redirect={redirect}
            />
        );
        const card = UNSAFE_getByType(
            TouchableOpacity
        );

        fireEvent.press(card);
        expect(redirect).toHaveBeenCalled();
    });

    it("uses dark theme colors", () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        const {UNSAFE_getByType} = render(
            <CardJob
                job={job as any}
                redirect={jest.fn()}
            />
        );
        const card = UNSAFE_getByType("View");
        expect(card.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: "black",
                borderColor: "white",
            })
        );
    });

    it("uses light theme when color scheme is undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue(undefined);
        const {UNSAFE_getByType} = render(
            <CardJob
                job={job as any}
                redirect={jest.fn()}
            />
        );

        const card = UNSAFE_getByType("View");
        expect(card.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: "white",
                borderColor: "black",
            })
        );
    });

    it("uses empty values when job fields are undefined", () => {
        (useColorScheme as jest.Mock).mockReturnValue("light");
        const emptyJob = {
            companyLogo: "",
            title: undefined,
            companyName: undefined,
            candidateLocation: undefined,
            publicationDate: undefined,
        };

        const {UNSAFE_getAllByType} = render(
            <CardJob
                job={emptyJob as any}
                redirect={jest.fn()}
            />
        );

        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts[1].props.children.join("")).toBe("Empresa: ");
    });
});

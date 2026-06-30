import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import {DetailJobTemplate} from "@/components/template/DetailJobTemplate";
import {useDetailJobTemplate} from "@/hooks/template/use-detail-job-template";
import {TouchableOpacity} from "react-native";

jest.mock("@/hooks/template/use-detail-job-template", () => ({
    useDetailJobTemplate: jest.fn(),
}));

jest.mock("@/components/molecules", () => {
    const React = require("react");
    return {
        HeaderBack: (props: any) => (
            <mock-header-back {...props}/>
        ),
    };
});

jest.mock("@/components/atoms", () => {
    const React = require("react");
    return {
        IconSymbol: (props: any) => (
            <mock-icon-symbol {...props}/>
        ),
        ThemedText: ({children}: any) => (
            <mock-themed-text>
                {children}
            </mock-themed-text>
        ),
        ViewHtml: (props: any) => (
            <mock-view-html {...props}/>
        ),
    };
});

jest.mock("expo-image", () => {
    const React = require("react");
    return {
        Image: (props: any) => (
            <mock-image {...props}/>
        ),
    };
});

jest.mock("@/util/splitName", () => ({
    getOnlyName: jest.fn(() => "React Native"),
    getCity: jest.fn(() => "Bogota"),
}));

jest.mock("@/util/date", () => ({
    date: jest.fn(() => "01/01/2026"),
}));

jest.mock("@/util/numCategoryJob", () => ({
    categoryJobs: {
        frontend: "Frontend",
    },
}));

jest.mock("@/util/numTypeJob", () => ({
    typeJobs: {
        fulltime: "Full Time",
    },
}));

describe("DetailJobTemplate", () => {
    const job = {
        title: "React Native Developer",
        companyLogo: "logo.png",
        companyName: "Google",
        candidateLocation: "Bogota",
        salary: "5000",
        publicationDate: "2026",
        url: "https://google.com",
        category: "frontend",
        jobType: "fulltime",
        description: "<p>Description</p>",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                color: "black",
                success: "green",
                existFavorite: false,
                job,
                styles: {
                    container: {},
                    image: {},
                    containerInfo: {},
                    containerInfoCompany: {},
                    containerIcons: {},
                    buttonApply: {},
                    textButton: {},
                    containerCategories: {},
                    containerCard: {},
                    textThin: {},
                    textCompanyName: {},
                },
                favoriteJob: jest.fn(),
                goBack: jest.fn(),
                openJob: jest.fn(),
                shareJob: jest.fn(),
            });
    });

    it("renders job information", () => {
        const {UNSAFE_getAllByType} = render(<DetailJobTemplate/>);
        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts.length).toBeGreaterThan(0);
    });

    it("calls goBack from HeaderBack", () => {
        const {UNSAFE_getByType} = render(<DetailJobTemplate/>);
        const header = UNSAFE_getByType("mock-header-back");
        header.props.action();
        expect(useDetailJobTemplate().goBack).toHaveBeenCalled();
    });

    it("calls favoriteJob when favorite icon is pressed", () => {
        const favoriteJob = jest.fn();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValueOnce({
                ...useDetailJobTemplate(),
                favoriteJob,
            });
        const {UNSAFE_getAllByType} = render(<DetailJobTemplate/>);
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[0]);
        expect(favoriteJob).toHaveBeenCalledWith(job);
    });

    it("calls shareJob when share icon is pressed", () => {
        const shareJob = jest.fn();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useDetailJobTemplate(),
                shareJob,
            });
        const {UNSAFE_getAllByType} = render(<DetailJobTemplate/>);
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[1]);
        expect(shareJob).toHaveBeenCalledWith(job.url);
    });

    it("calls openJob when apply button is pressed", () => {
        const openJob = jest.fn();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                ...useDetailJobTemplate(),
                openJob,
            });
        const {UNSAFE_getAllByType} = render(<DetailJobTemplate/>);
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[2]);
        expect(openJob).toHaveBeenCalledWith(job.url);
    });

    it("renders html description", () => {
        const {UNSAFE_getByType} = render(<DetailJobTemplate/>);
        const html = UNSAFE_getByType("mock-view-html");
        expect(html.props.source).toBe(job.description);
    });

    it("uses empty values when optional job fields are undefined", () => {
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                color: "black",
                success: "green",
                existFavorite: false,
                job: {
                    title: undefined,
                    companyName: undefined,
                    candidateLocation: undefined,
                    publicationDate: undefined,
                    salary: undefined,
                    url: undefined,
                    category: undefined,
                    jobType: undefined,
                    description: undefined,
                },
                styles: {
                    container: {},
                    image: {},
                    containerInfo: {},
                    containerInfoCompany: {},
                    containerIcons: {},
                    buttonApply: {},
                    textButton: {},
                    containerCategories: {},
                    containerCard: {},
                    textThin: {},
                    textCompanyName: {},
                },
                favoriteJob: jest.fn(),
                goBack: jest.fn(),
                openJob: jest.fn(),
                shareJob: jest.fn(),
            });
        const {UNSAFE_getAllByType} = render(
            <DetailJobTemplate/>
        );
        const texts = UNSAFE_getAllByType("mock-themed-text");
        expect(texts.some(item => item.props.children?.includes("Nombre: "))).toBe(true);
        expect(texts.some(item => item.props.children?.includes("Fecha: "))).toBe(true);
    });

    it("uses success color when job is favorite", () => {
        const shareJob = jest.fn();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                color: "black",
                success: "green",
                existFavorite: true,
                job: {
                    ...job,
                    url: undefined,
                },
                styles: {
                    container: {},
                    image: {},
                    containerInfo: {},
                    containerInfoCompany: {},
                    containerIcons: {},
                    buttonApply: {},
                    textButton: {},
                    containerCategories: {},
                    containerCard: {},
                    textThin: {},
                    textCompanyName: {},
                },
                favoriteJob: jest.fn(),
                goBack: jest.fn(),
                openJob: jest.fn(),
                shareJob,
            });
        const {UNSAFE_getAllByType} = render(
            <DetailJobTemplate/>
        );
        const icons = UNSAFE_getAllByType("mock-icon-symbol");
        expect(icons[0].props.color).toBe("green");
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[1]);
        expect(shareJob).toHaveBeenCalledWith("");
    });

    it("calls openJob with empty string when url is undefined", () => {
        const openJob = jest.fn();
        (useDetailJobTemplate as jest.Mock)
            .mockReturnValue({
                color: "black",
                success: "green",
                existFavorite: false,
                job: {
                    ...job,
                    url: undefined,
                },
                styles: {
                    container: {},
                    image: {},
                    containerInfo: {},
                    containerInfoCompany: {},
                    containerIcons: {},
                    buttonApply: {},
                    textButton: {},
                    containerCategories: {},
                    containerCard: {},
                    textThin: {},
                    textCompanyName: {},
                },
                favoriteJob: jest.fn(),
                goBack: jest.fn(),
                openJob,
                shareJob: jest.fn(),
            });
        const {UNSAFE_getAllByType} = render(
            <DetailJobTemplate/>
        );
        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[2]);
        expect(openJob).toHaveBeenCalledWith("");
    });
});

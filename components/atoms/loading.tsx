import {ActivityIndicator} from "react-native";

interface ILoadingComponent {
    size: 'small' | 'large';
    color: string;
}

export function LoadingComponent({size, color}: ILoadingComponent) {
    return <ActivityIndicator size={size} color={color} />;
}

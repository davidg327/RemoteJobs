import {JSX} from "react";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {IconSymbol, LoadingComponent} from "@/components/atoms";
import {CardJob} from "@/components/organisms/cardJob";
import {EmptyTemplate} from "@/components/template/EmptyTemplate";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {IJobs} from "@/interface/jobs";
import {Colors} from "@/constants/theme";

interface IListJob {
    jobs: IJobs[];
    loading: boolean;
    newLoading: boolean;
    text: string;
    moreJobs: () => void;
    redirect: (value: IJobs) => void;
    refreshJobs: () => void;
    deleteFavorite?: (id: number) =>void;
}
const white = '#FFFFFF';

const renderRightActions = (
    item: IJobs,
    deleteFavorite: (id: number) => void,
) => (
    <TouchableOpacity
        style={styles.swipeable}
        onPress={() => deleteFavorite(item.id)}
    >
        <IconSymbol name="trash.fill" color={white} />
    </TouchableOpacity>
);

export function ListJobs({
                             jobs,
                             loading,
                             newLoading,
                             text,
                             moreJobs,
                             redirect,
                             refreshJobs,
                             deleteFavorite,
                         }: IListJob) {
    const colorScheme = useColorScheme();

    const color = Colors[colorScheme ?? 'light'].success;

    const renderItem: ({item}: { item: any }) => JSX.Element = ({ item }) => {
        return (
            <ReanimatedSwipeable
                renderRightActions={() =>
                    deleteFavorite
                        ? renderRightActions(item, deleteFavorite)
                        : null
                }
            >
                <CardJob job={item} redirect={() => redirect(item)} />
            </ReanimatedSwipeable>
        );
    };

    return (
        <FlatList
            data={jobs}
            refreshing={newLoading}
            onRefresh={refreshJobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            onEndReached={() => {
                if (!loading) {
                    moreJobs();
                }
            }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                <EmptyTemplate text={text} />
            }
            ListFooterComponent={
                loading ? (
                    <LoadingComponent size={'small'} color={color} />
                ) : null
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 180,
    },
    swipeable: {
        alignItems: "center",
        backgroundColor: "red",
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: "center",
        height: '88%',
        marginRight: 20,
        width: '20%',
    }
});


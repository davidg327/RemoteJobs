import {JSX} from "react";
import {FlatList, StyleSheet} from "react-native";
import {LoadingComponent} from "@/components/atoms";
import {CardJob} from "@/components/organisms/cardJob";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {IJobs} from "@/interface/jobs";
import {Colors} from "@/constants/theme";

interface IListJob {
    jobs: IJobs[];
    loading: boolean;
    newLoading: boolean;
    moreJobs: () => void;
    refreshJobs: () => void;
}
export function ListJobs({
                             jobs,
                             loading,
                             newLoading,
                             moreJobs,
                             refreshJobs,
                         }: IListJob) {
    const colorScheme = useColorScheme();

    const color = Colors[colorScheme ?? 'light'].success;

    const renderItem: ({item}: { item: any }) => JSX.Element = ({ item }) => (
        <CardJob job={item} />
    );

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
        paddingBottom: 120,
    }
});


import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Spinner} from "@/components/molecules";
import {JobTemplate} from "@/components/template/JobTemplate";
import {EmptyTemplate} from "@/components/template/EmptyTemplate";
import {ErrorTemplate} from "@/components/template/ErrorTemplate";
import {useJob} from "@/hooks/use-job";

export default function HomeScreen() {

    const {
        error,
        jobs,
        jobCounts,
        loading,
        styles
    } = useJob();


    return (
        <SafeAreaView style={styles.container} >
            <>
                {!loading && jobCounts > 0 && (
                    <JobTemplate />
                )}
                {!loading && jobCounts === 0 && error === '' &&  (
                    <EmptyTemplate text='No hay ofertas en estos momentos' />
                )}
                {!loading && error !== '' && (
                    <ErrorTemplate text='Intentar más tarde' />
                )}
                {loading && jobs.length === 0 && (
                    <View style={styles.containerLoad}>
                        <Spinner text={'Cargando ...'} />
                    </View>
                )}
            </>
        </SafeAreaView>
    );
}

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDetailJob} from "@/hooks/use-detailJob";
import {DetailJobTemplate} from "@/components/template/DetailJobTemplate";

export default function DetailJobScreen() {

    const {
        styles
    } = useDetailJob();

    return (
        <SafeAreaView style={styles.container}  >
            <DetailJobTemplate />
        </SafeAreaView>
    );
}

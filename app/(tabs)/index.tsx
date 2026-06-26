import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useJob} from "@/hooks/use-job";
import {JobTemplate} from "@/components/template/JobTemplate";
import {Spinner} from "@/components/molecules";

export default function HomeScreen() {

  const {
      jobs,
      loading,
      styles
  } = useJob();


  return (
    <SafeAreaView style={styles.container} >
      <>
        {!loading && (
            <JobTemplate />
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

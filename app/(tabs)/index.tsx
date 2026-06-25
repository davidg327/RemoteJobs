import {View} from 'react-native';
import {useJob} from "@/hooks/use-job";
import {JobTemplate} from "@/components/template/JobTemplate";
import {JobStyles} from "@/styles/job.styles";
import {Spinner} from "@/components/components";

export default function HomeScreen() {

  const {
    loading,
    colorScheme
  } = useJob();

  const styles = JobStyles(colorScheme);

  return (
    <View style={styles.container} >
      <>
        {!loading && (
            <JobTemplate />
        )}
        {loading && (
            <View style={styles.containerLoad}>
                <Spinner text={'Cargando ...'} />
            </View>
        )}
      </>
    </View>
  );
}

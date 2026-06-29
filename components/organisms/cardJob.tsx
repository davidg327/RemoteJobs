import {Image} from "expo-image";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/atoms";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {getCity, getOnlyName} from "@/util/splitName";
import {IJobs} from "@/interface/jobs";
import {Colors} from "@/constants/theme";
import {date} from "@/util/date";

interface ICardJob {
    job: IJobs;
    redirect: () => void;
}
export function CardJob({job, redirect}: ICardJob) {
    const colorScheme = useColorScheme();
    const styles =  stylesCard(colorScheme);

    return (
        <TouchableOpacity
            onPress={redirect}
            style={styles.container}>
            <Image
                source={{uri: job.companyLogo}}
                style={styles.image}
            />
            <View style={styles.containerText}>
                <ThemedText type='miniBold'>
                    {getOnlyName(job?.title ?? '')}
                </ThemedText>
                <ThemedText type='simpleText'>
                    Empresa: {job?.companyName ?? ''}
                </ThemedText>
                <View style={styles.containerInfoText}>
                    <ThemedText type="thin">
                        {getCity(job?.title ?? '', job?.candidateLocation ?? '')}
                    </ThemedText>
                    <ThemedText type="thin">
                        {date(job?.publicationDate ?? '')}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const stylesCard = (colorScheme: 'light' | 'dark' | null | undefined) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: Colors[colorScheme ?? 'light'].text,
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: 15,
            flexDirection: 'row',
            padding: 20,
            width: '90%',
        },
        containerInfoText: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
        },
        containerText: {
            marginLeft: 20,
            gap: 6,
            width: '75%',
        },
        image: {
            borderRadius: 25,
            height: 50,
            width: 50,
        }
    });

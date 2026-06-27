import React from "react";
import {Image} from "expo-image";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {useDetailJobTemplate} from "@/hooks/template/use-detail-job-template";
import {HeaderBack} from "@/components/molecules";
import {getCity, getOnlyName} from "@/util/splitName";
import {IconSymbol, ThemedText, ViewHtml} from "@/components/atoms";
import {date} from "@/util/date";
import {typeJobs} from "@/util/numTypeJob";
import {categoryJobs} from "@/util/numCategoryJob";
import {IJobs} from "@/interface/jobs";

export function DetailJobTemplate () {

    const {
        color,
        existFavorite,
        job,
        styles,
        success,
        favoriteJob,
        goBack,
        openJob,
        shareJob,
    } = useDetailJobTemplate();

    return (
        <View style={styles.container}>
            <HeaderBack text={getOnlyName(job?.title ?? '')} action={goBack} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerInfo}>
                    <ThemedText type='defaultSemiBold'>
                        Información de la empresa:
                    </ThemedText>
                    <Image
                        source={{uri: job?.companyLogo}}
                        contentFit='cover'
                        style={styles.image}
                    />
                    <View style={styles.containerInfoCompany}>
                        <View style={styles.containerIcons}>
                            <ThemedText type='simpleText' >
                                Nombre: {job?.companyName ?? ''}
                            </ThemedText>
                            <ThemedText type='simpleText'>
                                Ubicación: {getCity(job?.title ?? '', job?.candidateLocation ?? '')}
                            </ThemedText>
                            {job?.salary && (
                                <ThemedText type='simpleText' >
                                    Salario: {job.salary}
                                </ThemedText>
                            )}
                            <ThemedText type='simpleText'>
                                Fecha: {date(job?.publicationDate ?? '')}
                            </ThemedText>
                        </View>
                        <View style={styles.containerIcons}>
                            <TouchableOpacity
                                onPress={() => favoriteJob(job as IJobs)}
                            >
                                <IconSymbol name={'heart.fill'} color={existFavorite ? success : color} size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => shareJob(job?.url ?? '')}
                            >
                                <IconSymbol name={'share.fill'} color={color} size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonApply}
                        onPress={() => openJob(job?.url ?? '')}
                    >
                        <ThemedText type='miniSemiBold' style={styles.textButton}>
                            Aplicar
                        </ThemedText>
                    </TouchableOpacity>
                    <View style={styles.containerCategories}>
                        <View style={styles.containerCard}>
                            <ThemedText type='thin' style={styles.textThin}>
                                Categoria:
                            </ThemedText>
                            <ThemedText type='miniSemiBold' style={styles.textThin}>
                                {categoryJobs[job?.category] ?? job?.category}
                            </ThemedText>
                        </View>
                        <View style={styles.containerCard}>
                            <ThemedText type='thin' style={styles.textThin}>
                                Tipo de Trabajo:
                            </ThemedText>
                            <ThemedText type='miniSemiBold' style={styles.textThin}>
                                {typeJobs[job?.jobType] ?? job?.jobType}
                            </ThemedText>
                        </View>
                    </View>
                    <ThemedText type='defaultSemiBold' style={styles.textCompanyName}>
                        Descripción del trabajo:
                    </ThemedText>
                    <ViewHtml source={job?.description ?? ''} />
                </View>
            </ScrollView>
        </View>
    )
}

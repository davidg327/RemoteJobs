import {useFavoriteStore} from "@/store/favorite.store";
import {IJobs} from "@/interface/jobs";
import {router} from "expo-router";
import {useJobStore} from "@/store/job.store";
import {useState} from "react";
import Toast from "react-native-toast-message";

export function useFavoriteTemplate() {

    const favorites = useFavoriteStore((state) => state.favorites);
    const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
    const getJob = useJobStore((state)  => state.getJob);

    const [idDelete, setIdDelete] = useState<number>(0);
    const [modal, setModal] = useState(false);

    const redirect = (value: IJobs) => {
        getJob(value);
        router.push("/detailJob");
    };

    const deleteFavorite = (id: number) => {
        setIdDelete(id);
        setModal(true);
    }

    const cancelDelete = () => {
        setModal(false);
    }

    const handleConfirmDelete = () => {
        removeFavorite(idDelete);
        Toast.show({
            type: "success",
            text1: "¡Lo sentimos!",
            text2: "Se ha quitado de favoritos",
        });
        setModal(false);
        setIdDelete(0);
    };

    return {
        favorites,
        modal,
        cancelDelete,
        handleConfirmDelete,
        deleteFavorite,
        redirect,
    };
}

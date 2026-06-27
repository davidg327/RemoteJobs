import {create} from "zustand";
import {IJobs} from "@/interface/jobs";

type FavoriteState = {
    favorites: IJobs[];
    getFavorite: (job: IJobs) => void;
    removeFavorite: (id: number) => void;
    getFavorites: (jobs: IJobs[]) => void;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: [],
    getFavorite: (job: IJobs) => {
        set({
            favorites: [...get().favorites, job],
        });
    },
    removeFavorite: (id: number) => {
        const newFavorites = get().favorites.filter((item) => item.id !== id);
        set({
            favorites: newFavorites,
        });
    },
    getFavorites: (jobs: IJobs[]) => {
        set({
            favorites: jobs,
        });
    }
}));

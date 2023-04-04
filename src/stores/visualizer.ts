import { PathingAlgos, SettingsForm, SettingsSpeed, SortingAlgos } from "@/constants/interfaces";
import { defineStore } from "pinia";

export const visualizerStore = defineStore("visualizer", {
    state: () => ({
        activeForm: { 
            algorithm: "" as keyof PathingAlgos | keyof SortingAlgos,
            speed: SettingsSpeed.DEFAULT as SettingsSpeed
        } as SettingsForm,
        isRunning: false as boolean
    }),
    getters: {
        getActiveForm: (state) => state.activeForm,
        getIsRunning: (state) => state.isRunning
    },
    actions: {
        setActiveForm(form:SettingsForm) {
            this.activeForm.algorithm = form.algorithm;
            this.activeForm.speed = form.speed;
        },
        setIsRunning(isRunning: boolean) {
            this.isRunning = isRunning;
        }
    }
})

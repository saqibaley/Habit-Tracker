import { create } from "zustand";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void; // Fixed typo
}

const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  addHabit: (name, frequency) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: Date.now().toString(), // Generate a unique ID
          name,
          frequency,
          completedDates: [], // Start with an empty array for completedDates
          createdAt: new Date().toISOString(), // Set createdAt to the current date and time
        },
      ],
    })),
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id), // Fix the syntax
    })),
  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(date)
                ? habit.completedDates.filter((d) => d !== date) // Remove date if it's already completed
                : [...habit.completedDates, date], // Add date if it's not completed
            }
          : habit
      ),
    })),
}));

export default useHabitStore;

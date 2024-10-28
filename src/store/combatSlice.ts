import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  name: string;
  url: string;
}

interface CombatState {
  combatList: Pokemon[];
}

const initialState: CombatState = {
  combatList: [],
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    addPokemonToCombat: (state, action: PayloadAction<Pokemon>) => {
      if (!state.combatList.some(pokemon => pokemon.name === action.payload.name)) {
        state.combatList.push(action.payload);
      }
    },
    removePokemonFromCombat: (state, action: PayloadAction<string>) => {
      state.combatList = state.combatList.filter(pokemon => pokemon.name !== action.payload);
    },
  },
});

export const { addPokemonToCombat, removePokemonFromCombat } = combatSlice.actions;
export default combatSlice.reducer;

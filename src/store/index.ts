import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './treeSlice';
import { loadTreeFromStorage, saveTreeToStorage } from '../utils/storage';
import type { TreeNode } from '../model/Node.model';

// Load persisted tree or fallback to default
const savedTree = loadTreeFromStorage();

export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
  preloadedState: savedTree
    ? {
        tree: {
          root: savedTree as TreeNode
        }
      }
    : undefined,
});

store.subscribe(() => {
  const state = store.getState();
  saveTreeToStorage(state.tree.root);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

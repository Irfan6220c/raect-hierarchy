import type { TreeNode } from "../model/Node.model";

const STORAGE_KEY = "cybusTree";

export function saveTreeToStorage(tree: TreeNode) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
}

export function loadTreeFromStorage(): TreeNode | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

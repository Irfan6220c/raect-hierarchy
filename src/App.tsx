import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTree } from "./store/treeSlice";
import { loadTreeFromStorage, saveTreeToStorage } from "./utils/storage";
import type { RootState } from "./store";
import TreeView from "./components/TreeView";

function App() {
  const dispatch = useDispatch();
  const treeData = useSelector((state: RootState) => state.tree.root);

  // On load: hydrate Redux from localStorage/mock
  useEffect(() => {
    const saved = loadTreeFromStorage();
    if (saved) {
      dispatch(setTree(saved));
    }
  }, [dispatch]);

  // Sync Redux → localStorage
  useEffect(() => {
    saveTreeToStorage(treeData);
  }, [treeData]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Cybus Asset Hierarchy</h1>
      <TreeView />
    </div>
  );
}

export default App;

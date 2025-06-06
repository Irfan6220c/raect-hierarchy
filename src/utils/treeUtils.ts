import type { TreeNode, Label } from "../model/Node.model";

/**
 * Recursively searches tree to find the full path to a specific asset or datapoint.
 */
export function findPathToTarget(
  root: TreeNode,
  targetId: string,
  type: "asset" | "datapoint",
  path: string[] = []
): string[] | null {
  const currentPath = [...path, root.name];

  for (const asset of root.assets) {
    if (type === "asset" && asset.id === targetId) {
      return [...currentPath, asset.name];
    }
    if (type === "datapoint") {
      const match = asset.datapoints.find(dp => dp.id === targetId);
      if (match) {
        return [...currentPath, asset.name, match.name];
      }
    }
  }

  for (const child of root.children) {
    const result = findPathToTarget(child, targetId, type, currentPath);
    if (result) return result;
  }

  return null;
}

/**
 * Recursively collects all labels from parent nodes of a given asset or datapoint.
 */
export function collectInheritedLabels(
  root: TreeNode,
  targetId: string,
  type: "asset" | "datapoint",
  labels: Label[] = [],
  path: TreeNode[] = []
): Label[] {
  const currentPath = [...path, root];

  for (const asset of root.assets) {
    if (type === "asset" && asset.id === targetId) {
      return currentPath.flatMap(n => n.labels);
    }
    if (type === "datapoint") {
      const match = asset.datapoints.find(dp => dp.id === targetId);
      if (match) {
        return currentPath.flatMap(n => n.labels);
      }
    }
  }

  for (const child of root.children) {
    const result = collectInheritedLabels(child, targetId, type, labels, currentPath);
    if (result.length > 0) return result;
  }

  return [];
}

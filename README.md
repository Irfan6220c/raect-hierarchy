#  Hierarchy Tree

A  React + Redux-based application to manage and visualize hierarchical structures of Nodes, Assets, and Datapoints.

---

##  Setup Instructions

### 1. Clone the Repository

```bash
cd react-hierarchy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🔍 Features

- Add, edit, and delete Nodes, Assets, and Datapoints
- Drag-and-drop reordering of Nodes
- Add, edit, and remove Labels for all entities
-  Inherited label visibility from parent Nodes
-  Show path from root to any Node/Asset/Datapoint
-  Collapsible label editors and add-forms
- Search & filter by Node name, Asset name, or Label key/value
- Powered by Redux Toolkit for scalable global state
- Persistent tree using browser `localStorage`
- Responsive and accessible UI design

---

##  Data Model

```ts
type TreeNode = {
  id: string;
  name: string;
  type: string;
  labels: Label[];
  assets: Asset[];
  children: TreeNode[];
};

type Asset = {
  id: string;
  name: string;
  type: string;
  labels: Label[];
  datapoints: Datapoint[];
};

type Datapoint = {
  id: string;
  name: string;
  type: "number" | "string" | "boolean";
  labels: Label[];
};

type Label = {
  key: string;
  value: string;
};
```

---

##  Application Architecture

###  Approach

- Root is a `TreeNode` with recursive children, assets, and datapoints.
- Redux Toolkit manages global state for predictability and dev tooling.
- Utility functions handle:
  - Inherited label resolution
  - Full path tracing

###  Component Structure

- TreeNodeItem – Renders & handles interaction with tree nodes
- AssetItem – Represent nested asset entities
- LabelEditor – Add/edit/delete labels with toggle-based visibility etc.

### State Persistence

- localStorage is used for persistence in this demo


## Recursive Rendering

- Tree is rendered recursively via TreeNodeItem


## Search & Filter Logic

- Matches against:
  - Node name
  - Asset name
  - Label key or value
- If a child node matches, its *arents are shown to preserve context
- Only matching branches are rendered

---

## File Structure


-

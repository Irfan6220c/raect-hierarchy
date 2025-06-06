import React, { useState } from "react";
import type { Label } from "../model/Node.model";

type LabelEditorProps = {
  labels: Label[];
  onChange: (newLabels: Label[]) => void;
};

const LabelEditor: React.FC<LabelEditorProps> = ({ labels, onChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const addLabel = () => {
    if (!keyInput.trim() || !valueInput.trim()) return;
    const newLabel: Label = { key: keyInput.trim(), value: valueInput.trim() };
    onChange([...labels, newLabel]);
    setKeyInput("");
    setValueInput("");
    setShowForm(false);
  };

  const removeLabel = (index: number) => {
    const updated = [...labels];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div style={{ marginTop: 8 }}>
      <button onClick={() => setShowForm(p => !p)}>
        {showForm ? "Cancel Label" : " Add Label"}
      </button>

      {showForm && (
        <div style={{ marginTop: 6 }}>
          <input
            placeholder="key"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            style={{ marginRight: 4 }}
          />
          <input
            placeholder="value"
            value={valueInput}
            onChange={e => setValueInput(e.target.value)}
            style={{ marginRight: 4 }}
          />
          <button onClick={addLabel}>Add</button>
        </div>
      )}

      <ul style={{ marginTop: 4 }}>
        {labels.map((label, index) => (
          <li key={index} style={{ fontSize: "0.9em" }}>
            <strong>{label.key}</strong>: {label.value}
            <button onClick={() => removeLabel(index)} style={{ marginLeft: 8 }}>
              Delete Label
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelEditor;

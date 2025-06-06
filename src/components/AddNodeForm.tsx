import React, { useState } from "react";

type Props = {
  onSubmit: (name: string, type: string) => void;
};

const AddNodeForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("custom");

  return (
    <div style={{ marginLeft: 16, marginTop: 5 }}>
      <input
        placeholder="Node name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="custom">Custom</option>
        <option value="organization">Organization</option>
        <option value="country">Country</option>
        <option value="site">Site</option>
        <option value="hall">Hall</option>
        <option value="line">Line</option>
      </select>
      <button
        onClick={() => name.trim() && onSubmit(name.trim(), type)}
        style={{ marginLeft: 5 }}
      >
        Create
      </button>
    </div>
  );
};

export default AddNodeForm;

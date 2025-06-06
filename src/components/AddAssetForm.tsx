import React, { useState } from "react";

type Props = {
  onSubmit: (name: string, type: string) => void;
};

const AddAssetForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  return (
    <div style={{ marginLeft: 16, marginTop: 5 }}>
      <input
        placeholder="Asset name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Asset type"
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <button
        onClick={() => name.trim() && onSubmit(name.trim(), type || "Generic")}
        style={{ marginLeft: 5 }}
      >
        Create
      </button>
    </div>
  );
};

export default AddAssetForm;

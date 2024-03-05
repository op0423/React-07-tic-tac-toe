import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setEditing] = useState(false);
  let editPlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  function editName() {
    setEditing((isEditing) => !isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(e) {
    setPlayerName(e.target.value);
  }
  if (isEditing) {
    editPlayerName = (
      <input
        type="text"
        required
        defaultValue={playerName}
        onChange={handleChange}
      ></input>
    );
    btnCaption = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editName}>{btnCaption}</button>
    </li>
  );
}

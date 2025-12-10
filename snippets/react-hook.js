import { useState } from "react";

export function useToggle() {
  const [state, setState] = useState(false);
  return [state, () => setState(!state)];
}


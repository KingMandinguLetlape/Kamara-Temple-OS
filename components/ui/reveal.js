import { useState } from "react";

export default function Reveal({ children }) {
  const [visible, setVisible] = useState(true);
  return visible ? <div>{children}</div> : null;
}

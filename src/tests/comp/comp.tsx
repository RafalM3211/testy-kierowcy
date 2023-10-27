import { useEffect } from "react";
import { helper } from "./helper";

export default function Comp() {
  useEffect(() => {
    console.log(helper());
  });

  return <div>example component</div>;
}

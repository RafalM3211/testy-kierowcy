import { useEffect, useState } from "react";
import { helper } from "./helper";
import { useMutation } from "@tanstack/react-query";
import { useOnMount } from "../../utility/hooks";

async function signOut() {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 3300);
  });
}

export default function Comp() {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["signout"],
    mutationFn: signOut,
  });

  const [a, sA] = useState(true);

  useOnMount(() => {
    mutate();
    sA(false);
  });

  const [emailValue, setEmailValue] = useState("");
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(e.target.value);
  }

  useEffect(() => {
    console.log(isLoading);
  });

  return (
    <>
      {!isLoading && !a ? (
        <p>loading</p>
      ) : (
        <div>
          <label>
            email*
            <input
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
            />
          </label>
        </div>
      )}
    </>
  );
}

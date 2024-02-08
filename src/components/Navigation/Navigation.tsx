"use client";
import { FC, useEffect, useState } from "react";
export const Navigation: FC = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  function toggleShowed() {
    setIsShowed(!isShowed);
  }
  const message = `Hello World !`;

  useEffect(() => {
    function listenForKeyupShortcuts(event: KeyboardEvent) {
      return;
    }
    function listenForKeydownShortcuts(event: KeyboardEvent) {
      // check if esc is pressed.

      // ignore tab switching
      const { key, keyCode }: { key: string, keyCode: number } = event;
      if (keyCode === 27) {
        setIsShowed(false);
        return;
      }
    }
    window.addEventListener("keyup", listenForKeyupShortcuts);
    window.addEventListener("keydown", listenForKeydownShortcuts);
    return () => {
      window.removeEventListener("keyup", listenForKeyupShortcuts);
      window.removeEventListener("keydown", listenForKeydownShortcuts);
    }
  }, []);
  return (
    <>
      <nav className="navigation">
        <ul className="navigation-list-parent">
          <li className="navigation-list">
            <a className="navigation-link" data-logo="Neodown" href="/">Neodown</a>
          </li>
          <li className="w-fit h-fit p-0.5">
            <a className="navigation-link" href="https://github.com/AlviDervishaj/Neodown">Contribute</a>
          </li>
          <li className="w-fit h-fit p-0.5">
            <a className="navigation-link" href="mailto:alvidervishaj9@gmail.com?subject=Hello World&body={}">Contact</a>
          </li>
          <li className="w-fit h-fit p-0.5">
            <button
              className="navigation-link"
              onClick={toggleShowed}
              data-type="navigation-link"
            >How it works </button>
          </li>
        </ul>
      </nav>
      <div className="separator" />
      {isShowed ?
        <div className="navigation-info-expanded">
          <h2>This is an example of the pop up explenation. </h2>
        </div>
        : null
      }
    </>
  )
}

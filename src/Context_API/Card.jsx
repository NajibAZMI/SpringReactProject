import { useState } from "react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const styles = () => {
    if (isDarkMode) {
      return {
        color: "white",
        backgroundColor: "black",
      };
    }
    return {
      color: "black",
      backgroundColor: "white",
    };
  };

  return <></>;
}

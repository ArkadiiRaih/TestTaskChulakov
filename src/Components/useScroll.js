import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

function useScroll(initial, maxItems, ref) {
  const [showedItems, setShowedItems] = useState(initial);

  const listenScroll = throttle(e => {
    if (
      window.scrollY + window.innerHeight >=
      ref.current.offsetTop + ref.current.offsetHeight - 50
    ) {
      setShowedItems(items => {
        if (items >= maxItems) {
          return maxItems;
        }
        return items + 10;
      });
    }
  }, 100);

  useEffect(() => {
    if (initial >= maxItems) return;
    window.addEventListener("scroll", listenScroll);
    return () => window.removeEventListener("scroll", listenScroll);
  }, []);

  useEffect(() => {
    if (showedItems >= maxItems) {
      window.removeEventListener("scroll", listenScroll);
    }
  }, [showedItems]);
  return showedItems;
}

export default useScroll;

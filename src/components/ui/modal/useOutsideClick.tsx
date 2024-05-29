// import { useEffect } from 'react';

// // export const useOutSideClick = (ref, callback: () => void) => {
// //   useEffect(() => {
// //     const handleClick = (event: MouseEvent) => {
// //       if (ref.current && !ref.current.contains(event.target as Node)) {
// //         callback();
// //       }
// //     };

// //     window.addEventListener('mousedown', handleClick);

// //     return () => window.removeEventListener('mousedown', handleClick);
// //   }, [callback, ref]);
// // };

// function useOutSideClick(ref, callback) {
//   useEffect(() => {
//     const handleClick = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback?.();
//       }
//     };

//     window.addEventListener('mousedown', handleClick);

//     return () => window.removeEventListener('mousedown', handleClick);
//   }, [ref, callback]);
// }

// export default useOutSideClick;

import { RefObject, useEffect } from 'react';

type UseOutsideClickProps = {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
};

export function useOutSideClick({ ref, handler }: UseOutsideClickProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  });
}

export function Logo({ isOpen }) {
  return (
    <>
      {isOpen ? (
        <img width={190} height={37} alt="logo" src="/logo.svg" />
      ) : (
        <img
          width={37}
          height={37}
          alt="logo cropped"
          src="/logo-reduced.svg"
        />
      )}
    </>
  );
}

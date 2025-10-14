export function Logo({ isOpen }) {
  return (
    <>
      {isOpen ? (
        <img width={190} height={37} alt="logo" src="/logo.png" />
      ) : (
        <img width={70} height={70} alt="logo cropped" src="/logo.png" />
      )}
    </>
  );
}

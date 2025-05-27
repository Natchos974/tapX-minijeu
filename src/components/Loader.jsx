function Loader() {
  return (
    <div className="w-full overflow-hidden">
      <div className="h-[2px] bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 h-full animate-load"></div>
      </div>
    </div>
  );
}

export default Loader;

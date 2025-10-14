function NfcItem({ id }) {
  return (
    <div className="relative shadow-md border rounded-md p-1 cursor-pointer md:max-w-[400px] flex flex-col justify-evenly hover:border-slate-400 hover:border-[3px]">
      <h2 className="absolute bottom-2 left-4 font-semibold text-muted-foreground w-[120px]">
        Carte numéro: {id}
      </h2>
      <img
        src="/card-google.jpg
        "
        className="rounded-md"
      />
    </div>
  );
}

export default NfcItem;

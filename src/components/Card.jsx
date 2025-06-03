import { cn } from "../lib/utils";

function Card({ type, file, selectedOption, setSelectedOption }) {
  const onClick = (value) => {
    selectedOption ? setSelectedOption(null) : setSelectedOption(value);
  };
  const isActive = selectedOption === type;
  return (
    <div
      className={cn(
        "shadow-md border rounded-md p-1 cursor-pointer md:max-w-[400px] flex flex-col justify-evenly hover:border-slate-400 hover:border-[3px]", // Classe de base commune
        isActive ? " border-slate-400 border-[3px]" : "bg-slate-50" // Classe conditionnelle
      )}
      onClick={() => onClick(type)}
    >
      <img src={`/${file}`} className="rounded-md" />
    </div>
  );
}

export default Card;

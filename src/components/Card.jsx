import { cn } from "../lib/utils";

function Card({ name, description, value, selectedOption, setSelectedOption }) {
  const onClick = (value) => {
    setSelectedOption(value);
  };
  const isActive = selectedOption === value;
  return (
    <div
      className={cn(
        "shadow-md border rounded-md p-3 cursor-pointer min-h-[100px] flex flex-col justify-evenly hover:bg-slate-100", // Classe de base commune
        isActive ? "bg-sky-100 hover:bg-sky-100" : "bg-slate-50" // Classe conditionnelle
      )}
      onClick={() => onClick(value)}
    >
      <h1 className="font-bold">{name}</h1>
      <p className="text-sm md:text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default Card;

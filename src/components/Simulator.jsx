import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import numStr from "../utils/functions";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  BarElement,
  CategoryScale,
  LinearScale
);

function Simulator() {
  const [scpi1, setScpi1] = useState(200);
  const [scpi2, setScpi2] = useState(200);
  const percentageScpi1 =
    scpi1 || scpi2 ? ((scpi1 / (scpi1 + scpi2)) * 100).toFixed(0) : 0;
  const percentageScpi2 =
    scpi1 || scpi2 ? ((scpi2 / (scpi1 + scpi2)) * 100).toFixed(0) : 0;

  const interestRate1 = 0.05; // 5% annual interest rate for SCPI 1
  const interestRate2 = 0.07; // 7% annual interest rate for SCPI 2
  const [years, setYears] = useState(10);

  const data = {
    datasets: [
      {
        label: "% of investments",
        data: [percentageScpi1, percentageScpi2],
        backgroundColor: ["#157a6e", "#77b28c"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["SCPI 1", "SCPI 2"],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Répartition investissement",
        font: {
          size: 16,
        },
      },
      datalabels: {
        formatter: (value) => {
          return `${value} %`;
        },
        color: "white",
      },
    },
  };
  const handleInputChange = (e, setValue) => {
    const value = e.target.value;
    // Vérifie si la valeur est un nombre ou une chaîne vide
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setValue(value === "" ? 0 : Number(value));
    }
  };

  const handleKeyDown = (e) => {
    // Empêche l'entrée de caractères non numériques
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleSliderChange = (e) => {
    setYears(e.target.value);
  };

  const calculateCompoundInterest = (principal, rate, years) => {
    const amounts = [];
    for (let year = 1; year <= years; year++) {
      const amount = Math.round(principal * Math.pow(1 + rate, year));
      amounts.push(amount);
    }
    return amounts;
  };
  const scpi1Amounts = calculateCompoundInterest(scpi1, interestRate1, years);
  const scpi2Amounts = calculateCompoundInterest(scpi2, interestRate2, years);
  const d = new Date();
  let currentYear = d.getFullYear();
  console.log(currentYear);
  const dataBar = {
    labels: Array.from({ length: years }, (_, i) => 2025 + i),
    datasets: [
      {
        label: "SCPI 1",
        data: scpi1Amounts,
        backgroundColor: "#157a6e",
      },
      {
        label: "SCPI 2",
        data: scpi2Amounts,
        backgroundColor: "#77b28c",
      },
    ],
  };

  const optionsBar = {
    plugins: {
      title: {
        display: true,
        text: "Evolution temporelle investissement",
        font: {
          size: 16,
        },
      },
      datalabels: {
        color: "white",
        formatter: (value) => {
          return `${numStr(value.toFixed(0), ".")} €`; // Formater les valeurs pour afficher deux décimales
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div className="flex p-2 flex-col gap-1 w-full">
      <div className="flex gap-4 items-center">
        <label className="font-bold">SCPI 1:</label>
        <div className="relative flex items-center">
          <input
            id="scpi1"
            name="scpi1"
            type="text"
            className="px-4 flex items-center w-150px text-grey-800 rounded-md appearance-none transition duration-300 ease-in-out text-heading focus:outline-none focus:ring-0 focus:bg-white border border-border-base focus:border-primary-main focus:shadow-[0px_0px_0px_3px_#BEEBB7] bg-white focus:primary focus:text-primary-main pr-8 border-grey-400 h-12 text-medium"
            spellCheck="false"
            inputMode="decimal"
            placeholder="0"
            pattern="[0-9\s,]*"
            onChange={(e) => handleInputChange(e, setScpi1)}
            onKeyDown={handleKeyDown}
            value={scpi1}
          ></input>
          <span className="font-primary text-medium absolute right-0 pr-3">
            €
          </span>
        </div>
        <span className="flex w-fit justify-center items-center px-2 bg-slate-300/55 h-12 rounded-lg border border-gray-200 text-muted-foreground cursor-not-allowed">
          Rendement: 5%
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <label className="font-bold">SCPI 2:</label>
        <div className="relative mt-1 flex items-center">
          <input
            id="scpi2"
            name="scpi2"
            type="text"
            className="px-4 flex items-center w-150px text-grey-800 rounded-md appearance-none transition duration-300 ease-in-out text-heading focus:outline-none focus:ring-0 focus:bg-white border border-border-base focus:border-primary-main focus:shadow-[0px_0px_0px_3px_#BEEBB7] bg-white focus:primary focus:text-primary-main pr-8 border-grey-400 h-11 text-medium"
            spellCheck="false"
            inputMode="decimal"
            placeholder="0"
            pattern="[0-9\s,]*"
            onChange={(e) => handleInputChange(e, setScpi2)}
            onKeyDown={handleKeyDown}
            value={scpi2}
          ></input>
          <span className="font-primary text-medium absolute right-0 pr-3">
            €
          </span>
        </div>
        <span className="flex w-fit justify-center items-center px-2 bg-slate-300/55 h-12 rounded-lg border border-gray-200 text-muted-foreground cursor-not-allowed">
          Rendement: 7%
        </span>
      </div>
      <div style={{ width: "300px" }}>
        <Doughnut data={data} options={options} />
      </div>
      <div style={{ maxWidth: "1800px" }}>
        <Bar data={dataBar} options={optionsBar} />
        <input
          type="range"
          min={8}
          max={25}
          value={years}
          onChange={handleSliderChange}
          className="cursor-pointer w-full mt-5 accent-emerald-700"
        />
        <span className="flex w-fit justify-center items-center px-2 bg-slate-300/55 h-12 rounded-lg border border-gray-200 text-muted-foreground cursor-not-allowed">
          Horizon investissement: {years} années
        </span>
      </div>
    </div>
  );
}

export default Simulator;

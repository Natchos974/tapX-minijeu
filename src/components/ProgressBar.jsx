import { Progress } from "./ui/progress";

function ProgressBar({ progress }) {
  return (
    <div>
      <div>Progrès partie théorique: {progress} %</div>
      <Progress value={progress} />
    </div>
  );
}

export default ProgressBar;

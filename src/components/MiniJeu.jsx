import MiniJeuSettings from "./MiniJeuSettings";

function MiniJeu() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="headline-1">Paramétrage du mini-jeu</h1>
      <p className="paragraph">
        Vous pouvez paramétrer jusqu&apos;à 5 lots. Associez à chaque lot un %
        de chance (plus le % est proche de 100, plus vos utilisateurs auront de
        chance de gagner le lot concerné). Attention la somme des % de tous les
        lots doit faire 100%. Vous pouvez aussi ajouter des lots vide ou des
        lots mentionnant &apos;perdu&apos;
      </p>
      <MiniJeuSettings />
    </div>
  );
}

export default MiniJeu;

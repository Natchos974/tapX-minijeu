import { SkeletonCard } from "./SkeletonCard";
import NfcItem from "./NfcItem";
import { useData } from "../utils/useData";

function NfcCard() {
  const { nfcCards: cards, isLoading, refetchNfcCards } = useData();

  if (isLoading) return <SkeletonCard />;
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="headline-1">Cartes NFC appairées à votre compte </h1>
      <p className="paragraph">
        Les cartes déjà appairées à votre compte se trouvent ci dessous. Si vous
        venez d&apos;appairer une carte, appuyez sur le bouton rafraichir pour
        la voir apparaitre{" "}
      </p>
      {cards?.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune carte NFC n&apos;a été ajoutée pour le moment...
        </p>
      ) : (
        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {cards &&
            cards.map((item) => <NfcItem key={item.id} id={item.card_id} />)}
        </div>
      )}
      <button className="button-primary" onClick={refetchNfcCards}>
        Rafraichir
      </button>
    </div>
  );
}

export default NfcCard;

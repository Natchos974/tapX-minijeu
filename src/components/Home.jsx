import { SkeletonCard } from "./SkeletonCard";

function Home({ isLoading, data }) {
  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            Voici la page d accueil du dashboard
          </p>
        </div>
      )}
    </>
  );
}

export default Home;

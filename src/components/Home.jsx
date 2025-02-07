import { SkeletonCard } from "./SkeletonCard";

function Home({ isLoading }) {
  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <p className="headline-2">Accueil</p>
          <img src="/planMasse.png" width="100%" />
        </div>
      )}
    </>
  );
}

export default Home;

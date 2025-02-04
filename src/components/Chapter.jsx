import { Suspense } from "react";
import { useParams } from "react-router-dom";
import PlayerH5p from "./PlayerH5P";
import { SuccessProvider } from "../utils/SuccessContext";
import NextChapterButton from "./NextChapterButton";
import { useSession } from "../utils/useSession";

function Chapter({ courses, updateChapterStatus }) {
  const { chapterId, id } = useParams();
  const session = useSession();
  const { user } = session;
  const course = courses?.find((course) => course.id === Number(id));
  const chapter = course?.chapterArray?.find(
    (item) => item.id === Number(chapterId)
  );
  console.log(`/h5p/${chapter.h5p_reference}`);
  return (
    <SuccessProvider>
      <div className="flex flex-col gap-5 md:max-w-[70%] z-0">
        <h1 className="font-semibold text-lg">{chapter?.description}</h1>
        {chapter?.h5p_reference ? (
          <div>
            <Suspense fallback={<p>Loading mini-game...</p>}>
              <PlayerH5p h5pJsonPath={`/h5p/${chapter.h5p_reference}`} />
            </Suspense>
          </div>
        ) : chapter?.videoURL ? (
          <div className="responsive-iframe-container h-full">
            <iframe
              src={chapter.videoURL}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ) : chapter?.PDFLink ? (
          <div className="responsive-iframe-container h-full">
            <Suspense fallback={<p>Loading...</p>}>
              <iframe src={chapter.PDFLink} width="100%" height="100%" />
            </Suspense>
          </div>
        ) : (
          <div>Il n y a rien dans ce chapitre pour le moment</div>
        )}
        <NextChapterButton
          courseId={id}
          currentChapterId={Number(chapterId)}
          initialIsCompleted={chapter?.isCompleted}
          isCourseSigned={false}
          isLastChapter={false}
          nextChapterId={Number(chapterId) + 1}
          userId={user.id}
          updateChapterStatus={updateChapterStatus}
        />
      </div>
    </SuccessProvider>
  );
}

export default Chapter;

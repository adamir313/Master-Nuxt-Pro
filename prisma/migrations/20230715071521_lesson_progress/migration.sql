-- CreateTable
CREATE TABLE "LessonProgress" (
    "ide" SERIAL NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "lessonId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("ide")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lessonId_userEmail_key" ON "LessonProgress"("lessonId", "userEmail");

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

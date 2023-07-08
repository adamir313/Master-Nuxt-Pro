-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "ide" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("ide")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "ide" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "videoId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chapterIde" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("ide")
);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapterIde_fkey" FOREIGN KEY ("chapterIde") REFERENCES "Chapter"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

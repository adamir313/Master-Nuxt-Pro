/*
  Warnings:

  - You are about to drop the column `lessonId` on the `LessonProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonIde,userEmail]` on the table `LessonProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonIde` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_lessonId_fkey";

-- DropIndex
DROP INDEX "LessonProgress_lessonId_userEmail_key";

-- AlterTable
ALTER TABLE "LessonProgress" DROP COLUMN "lessonId",
ADD COLUMN     "lessonIde" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lessonIde_userEmail_key" ON "LessonProgress"("lessonIde", "userEmail");

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonIde_fkey" FOREIGN KEY ("lessonIde") REFERENCES "Lesson"("ide") ON DELETE RESTRICT ON UPDATE CASCADE;

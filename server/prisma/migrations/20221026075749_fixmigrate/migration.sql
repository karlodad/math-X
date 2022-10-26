/*
  Warnings:

  - You are about to drop the column `CreateData` on the `Answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "CreateData",
ADD COLUMN     "CreateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

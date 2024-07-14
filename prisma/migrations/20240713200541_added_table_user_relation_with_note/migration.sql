/*
  Warnings:

  - Added the required column `IdUser` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "IdUser" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `verificationMediaUrl` to the `Verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verificationMediaUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Verification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Verification" ("id", "profileId") SELECT "id", "profileId" FROM "Verification";
DROP TABLE "Verification";
ALTER TABLE "new_Verification" RENAME TO "Verification";
CREATE UNIQUE INDEX "Verification_profileId_key" ON "Verification"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

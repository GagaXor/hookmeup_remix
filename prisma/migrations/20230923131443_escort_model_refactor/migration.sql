/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `Escort` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Escort" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sexualOrientation" TEXT,
    "build" TEXT,
    "bustSize" TEXT,
    "occupation" TEXT,
    "education" TEXT,
    "smoker" BOOLEAN,
    "profileId" TEXT NOT NULL,
    CONSTRAINT "Escort_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Escort" ("build", "bustSize", "education", "id", "occupation", "profileId", "sexualOrientation", "smoker") SELECT "build", "bustSize", "education", "id", "occupation", "profileId", "sexualOrientation", "smoker" FROM "Escort";
DROP TABLE "Escort";
ALTER TABLE "new_Escort" RENAME TO "Escort";
CREATE UNIQUE INDEX "Escort_profileId_key" ON "Escort"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

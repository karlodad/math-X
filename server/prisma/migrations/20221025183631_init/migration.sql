-- CreateTable
CREATE TABLE "Answers" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "CreateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

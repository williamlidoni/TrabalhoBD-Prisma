-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT,
    "id_usuario" INTEGER,
    CONSTRAINT "tarefas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "tarefas_id_usuario_idx" ON "tarefas"("id_usuario");


CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "cargo" TEXT NOT NULL,
  "nivel" TEXT NOT NULL,
  "certificacao" TEXT,
  "disponibilidade" TEXT NOT NULL,
  "modalidade" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "telefone" TEXT,
  "fotoUrl" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE "Agencia" (
  "id" TEXT NOT NULL,
  "codigo" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "cidade" TEXT NOT NULL,
  "estado" TEXT NOT NULL,
  "endereco" TEXT NOT NULL,
  "qtd_switches" INTEGER NOT NULL,
  "data_prevista" TIMESTAMP NOT NULL,
  "status" TEXT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Switch" (
  "id" TEXT NOT NULL,
  "numero_serie" TEXT NOT NULL,
  "modelo" TEXT NOT NULL,
  "hostname" TEXT NOT NULL,
  "agenciaId" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "vrp_version" TEXT NOT NULL,
  "pat_version" TEXT NOT NULL,
  "observacoes" TEXT,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("agenciaId") REFERENCES "Agencia"("id")
);

CREATE TABLE "Fluxo" (
  "id" TEXT NOT NULL,
  "agenciaId" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("agenciaId") REFERENCES "Agencia"("id")
);

CREATE TABLE "FluxoEquipe" (
  "id" TEXT NOT NULL,
  "fluxoId" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "funcao" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("fluxoId") REFERENCES "Fluxo"("id")
);

CREATE TABLE "FluxoAnexo" (
  "id" TEXT NOT NULL,
  "fluxoId" TEXT NOT NULL,
  "nomeArquivo" TEXT NOT NULL,
  "caminhoArquivo" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("fluxoId") REFERENCES "Fluxo"("id")
);


-- CreateTable
CREATE TABLE "Producto1" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "imagen" TEXT,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Producto1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" TEXT NOT NULL,
    "cantidad" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto1_id_key" ON "Producto1"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_id_key" ON "Venta"("id");

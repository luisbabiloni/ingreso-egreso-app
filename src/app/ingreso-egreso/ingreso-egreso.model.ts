export class IngresoEgreso {
  concepto: string;
  importe: number;
  tipo: string;
  uid?: string;

  constructor(obj: any) {
    this.concepto = (obj && obj.concepto) || null;
    this.importe = (obj && obj.importe) || null;
    this.tipo = (obj && obj.tipo) || null;
    // this.uid = (obj && obj.uid) || null;
  }
}

export class TransactionModel {
  private anexoNome: string;
  private anexoUrl: string;
  private categoria: string;
  private dataCriacao: Date;
  private descricao: string;
  private id: string;          // gerado pelo Firebase
  private idUsuario: string;   // gerado pelo Firebase
  private mesReferencia: number;
  private tipoTransacao: string;
  private valor: number;

  constructor(
    anexoNome: string,
    anexoUrl: string,
    categoria: string,
    dataCriacao: Date,
    descricao: string,
    mesReferencia: number,
    tipoTransacao: string,
    valor: number
  ) {
    this.anexoNome = anexoNome;
    this.anexoUrl = anexoUrl;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.descricao = descricao;
    this.mesReferencia = mesReferencia;
    this.tipoTransacao = tipoTransacao;
    this.valor = valor;

    // id e idUsuario virão do Firebase
    this.id = '';
    this.idUsuario = '';
  }

  // ------------------------
  // GETTERS
  // ------------------------

  public getAnexoNome(): string {
    return this.anexoNome;
  }

  public getAnexoUrl(): string {
    return this.anexoUrl;
  }

  public getCategoria(): string {
    return this.categoria;
  }

  public getDataCriacao(): Date {
    return this.dataCriacao;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getId(): string {
    return this.id;
  }

  public getIdUsuario(): string {
    return this.idUsuario;
  }

  public getMesReferencia(): number {
    return this.mesReferencia;
  }

  public getTipoTransacao(): string {
    return this.tipoTransacao;
  }

  public getValor(): number {
    return this.valor;
  }

  // ------------------------
  // SETTERS
  // ------------------------

  public setAnexoNome(value: string): void {
    this.anexoNome = value;
  }

  public setAnexoUrl(value: string): void {
    this.anexoUrl = value;
  }

  public setCategoria(value: string): void {
    this.categoria = value;
  }

  public setDataCriacao(value: Date): void {
    this.dataCriacao = value;
  }

  public setDescricao(value: string): void {
    this.descricao = value;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public setIdUsuario(value: string): void {
    this.idUsuario = value;
  }

  public setMesReferencia(value: number): void {
    this.mesReferencia = value;
  }

  public setTipoTransacao(value: string): void {
    this.tipoTransacao = value;
  }

  public setValor(value: number): void {
    this.valor = value;
  }
}

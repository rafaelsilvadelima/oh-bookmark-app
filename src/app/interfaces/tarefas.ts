export interface Tarefas {
    id?: string;
    idUsuario: string;
    nome: string;
    episodio?: number | undefined;
    temporada: string;
    lancamento: string;
    site: string;
    imagem?: string;
}
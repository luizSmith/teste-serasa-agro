import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SafraService } from '../safra.service';
import { SafraRepository } from 'src/repository/safra/safra.repository';
import { FazendaService } from 'src/service/fazenda/fazenda.service';
import { CriarSafraRequest } from 'src/controller/safra/request/criarSafra.request';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { ObterSafraResponse } from 'src/controller/safra/response/obterSafra.response';
import { FinalizarSafraRequest } from 'src/controller/safra/request/desativarSafra.request';
import { ObterSafraAnoRequest } from 'src/controller/safra/request/obterSafra.request';
import { ObterFazendaIdDAO } from 'src/model/fazenda/dao/obterFazendaId.dao';
import { Safra } from 'src/repository/safra/entity/safra.entity';

describe('SafraService', () => {
    let safraService: SafraService;
    let safraRepository: SafraRepository;
    let fazendaService: FazendaService;

    beforeEach(async () => {
        safraRepository = {
            criarSafra: vi.fn(),
            obterSafraId: vi.fn(),
            finalizarSafra: vi.fn(),
            obterSafraAno: vi.fn(),
            obterFazendaIdFazenda: vi.fn(),
        } as any;

        fazendaService = {
            obterFazendaId: vi.fn(),
        } as any;

        safraService = new SafraService(safraRepository, fazendaService);
    });

    describe('criarSafra', () => {
        it('deve criar uma nova safra', async () => {
            const parametros: CriarSafraRequest = {
                idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
            };

            const mockFazenda: ObterFazendaIdDAO = {
                id: parametros.idFazenda,
                nome: 'Fazenda A',
                quantidadeTotalHectares: 50,
                logradouro: 'Rua 1',
                numero: 123,
                referencia: null,
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                idCidade: '42cbf6b7-9f1a-4c8d-9205-f7e76b8c0f60',
            };

            const mockSafraResponse = {
                id: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
                idFazenda: parametros.idFazenda,
                dtInicio: new Date(),
                dtFim: null,
                ativo: true,
            } as Safra;

            vi.spyOn(fazendaService, 'obterFazendaId').mockResolvedValueOnce(mockFazenda);

            vi.spyOn(safraRepository, 'criarSafra').mockResolvedValueOnce(mockSafraResponse);

            const result = await safraService.criarSafra(parametros);

            expect(result).toEqual(mockSafraResponse);
        });

        it('deve lançar um erro se a fazenda já tiver uma safra ativa', async () => {
            const parametros: CriarSafraRequest = {
                idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
            };

            const mockFazenda: ObterFazendaIdDAO = {
                id: parametros.idFazenda,
                nome: 'Fazenda A',
                quantidadeTotalHectares: 50,
                logradouro: 'Rua 1',
                numero: 123,
                referencia: null,
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                idCidade: '42cbf6b7-9f1a-4c8d-9205-f7e76b8c0f60',
            };

            const mockSafraResponse = {
                id: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
                idFazenda: parametros.idFazenda,
                dtInicio: new Date(),
                dtFim: null,
                ativo: true,
            } as Safra;

            vi.spyOn(fazendaService, 'obterFazendaId').mockResolvedValueOnce(mockFazenda);

            vi.spyOn(safraRepository, 'obterFazendaIdFazenda').mockResolvedValueOnce(mockSafraResponse);

            await expect(safraService.criarSafra(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('obterSafraId', () => {
        it('deve retornar a safra de uma fazenda', async () => {
            const idFazenda = 'a6f54f77-df4f-474b-8f55-b3505391c0f4';
            const mockSafra: ObterSafraResponse = {
                id: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
                idFazenda: idFazenda,
                ativo: true,
                dtInicio: new Date(),
                dtFim: null,
            };

            vi.spyOn(safraRepository, 'obterSafraId').mockResolvedValueOnce(mockSafra);

            const result = await safraService.obterSafraId(idFazenda);

            expect(result).toEqual(mockSafra);
        });

        it('deve lançar erro se não encontrar safra', async () => {
            const idFazenda = 'a6f54f77-df4f-474b-8f55-b3505391c0f4';

            vi.spyOn(safraRepository, 'obterSafraId').mockResolvedValueOnce(null);

            await expect(safraService.obterSafraId(idFazenda)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('finalizarSafra', () => {
        it('deve finalizar a safra corretamente', async () => {
            const parametros: FinalizarSafraRequest = {
                idSafra: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
            };

            const safraMock = {
                id: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
                idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
                ativo: true,
                dtInicio: new Date(),
                dtFim: null,
            }

            vi.spyOn(safraService, 'obterSafraId').mockResolvedValueOnce(safraMock);

            vi.spyOn(safraRepository, 'finalizarSafra').mockResolvedValueOnce(undefined);

            await safraService.finalizarSafra(parametros);

            expect(safraRepository.finalizarSafra).toHaveBeenCalledWith(parametros.idSafra);
        });

        it('deve lançar erro ao finalizar uma safra inexistente', async () => {
            const parametros: FinalizarSafraRequest = {
                idSafra: '3a1f5c6b-9e8e-4203-8c09-8bbdb6f170e5',
            };

            vi.spyOn(safraRepository, 'obterSafraId').mockResolvedValueOnce(undefined);

            await expect(safraService.finalizarSafra(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('obterSafraAno', () => {
        it('deve retornar a safra do ano correto', async () => {
            const parametros: ObterSafraAnoRequest = {
                idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
                ano: '2023',
            };

            const mockSafraAnoResponse = [
                {
                    idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
                    nomeFazenda: 'Fazenda A',
                    nomeCultura: 'Soja',
                    ano: '2023',
                    quantidadePlantada: 7000
                },
            ];



            vi.spyOn(safraRepository, 'obterSafraAno').mockResolvedValueOnce(mockSafraAnoResponse);

            const result = await safraService.obterSafraAno(parametros);

            expect(result).toEqual(mockSafraAnoResponse);
        });

        it('deve lançar erro se não encontrar safra para o ano', async () => {
            const parametros: ObterSafraAnoRequest = {
                idFazenda: 'a6f54f77-df4f-474b-8f55-b3505391c0f4',
                ano: '2023',
            };

            vi.spyOn(safraRepository, 'obterSafraAno').mockResolvedValueOnce([]);

            await expect(safraService.obterSafraAno(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });
});

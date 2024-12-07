import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VegetacaoService } from '../vegetacao.service';
import { VegetacaoRepository } from 'src/repository/vegetacao/vegetacao.repository';
import { ProdutorService } from '../../produtor/produtor.service';
import { FazendaService } from '../../fazenda/fazenda.service';
import { CulturaService } from '../../cultura/cultura.service';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { CriarVegetacaoRequest } from 'src/controller/vegetacao/request/criarVegetacao.request';
import { ObterVegetacaoResponse } from 'src/controller/vegetacao/response/obterVegetacao.response';
import { Cultura } from 'src/repository/cultura/entity/cultura.entity';
import { ObterFazendaResponse } from 'src/controller/fazenda/response/obterFazendas.response';
import { FazendaCultura } from 'src/repository/vegetacao/entity/fazendaCultura.entity';

describe('VegetacaoService', () => {
    let vegetacaoService: VegetacaoService;
    let vegetacaoRepository: VegetacaoRepository;
    let produtorService: ProdutorService;
    let fazendaService: FazendaService;
    let culturaService: CulturaService;

    beforeEach(() => {
        vegetacaoRepository = {
            obterVegetacaoProdutor: vi.fn(),
            criarVegetacao: vi.fn(),
            obterVegetacaoFazenda: vi.fn(),
        } as any;

        produtorService = {
            obterProdutorId: vi.fn(),
        } as any;

        fazendaService = {
            obterFazendaId: vi.fn(),
        } as any;

        culturaService = {
            obterCulturaId: vi.fn(),
        } as any;

        vegetacaoService = new VegetacaoService(
            vegetacaoRepository,
            produtorService,
            fazendaService,
            culturaService
        );
    });

    describe('obterVegetacaoProdutor', () => {
        it('deve retornar a vegetação de um produtor', async () => {
            const idProdutor = 'd2c5d466-df4e-4c2a-9b77-7e82b9e5ae59';
            const mockResponse = [
                {
                    id: 'a91b1ac7-0c0b-4cf5-b1c7-fbbe4da7ad7c',
                    nome: 'Fazenda A',
                    quantidadeVegetacao: 200.5,
                },
            ] as ObterVegetacaoResponse[];

            vi.spyOn(produtorService, 'obterProdutorId').mockResolvedValue(null);
            vi.spyOn(vegetacaoRepository, 'obterVegetacaoProdutor').mockResolvedValue(mockResponse);

            const result = await vegetacaoService.obterVegetacaoProdutor({ idProdutor });

            expect(result).toEqual(mockResponse);
        });
    });

    describe('criarVegetacao', () => {
        it('deve criar uma nova vegetação para a fazenda', async () => {
            const parametros: CriarVegetacaoRequest = {
                idFazenda: 'd6f45e79-73c9-4dbd-839e-d60cd87b56ea',
                idCultura: 'e53b61cc-b8d2-4f73-bb35-6fc8bb0b0296',
                quantidadeVegetacao: 100.5,
            };

            const mockFazenda: ObterFazendaResponse = {
                id: parametros.idFazenda,
                nome: 'Fazenda Nova',
                quantidadeTotalHectares: 500,
                logradouro: 'Rua 1',
                numero: 123,
                referencia: null,
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                idCidade: '42cbf6b7-9f1a-4c8d-9205-f7e76b8c0f60',
            };

            const mockCultura = {
                id: parametros.idCultura,
                nome: 'Soja',
            } as Cultura;

            const mockVegetacaoCriada = {
                idCultura: parametros.idCultura,
                idFazenda: parametros.idFazenda,
                quantidadeVegetacao: parametros.quantidadeVegetacao,
                id: 'c3a7b574-6a2d-4854-bf6e-4515b5da4501',
            } as unknown as FazendaCultura;

            vi.spyOn(fazendaService, 'obterFazendaId').mockResolvedValue(mockFazenda);
            vi.spyOn(culturaService, 'obterCulturaId').mockResolvedValue(mockCultura);
            vi.spyOn(vegetacaoRepository, 'obterVegetacaoFazenda').mockResolvedValue(null);
            vi.spyOn(vegetacaoRepository, 'criarVegetacao').mockResolvedValue(mockVegetacaoCriada);

            const result = await vegetacaoService.criarVegetacao(parametros);

            expect(result).toEqual(mockVegetacaoCriada);
        });

        it('deve lançar erro se a área de vegetação ultrapassar o tamanho total da fazenda', async () => {
            const parametros: CriarVegetacaoRequest = {
                idFazenda: 'd6f45e79-73c9-4dbd-839e-d60cd87b56ea',
                idCultura: 'e53b61cc-b8d2-4f73-bb35-6fc8bb0b0296',
                quantidadeVegetacao: 600,
            };

            const mockFazenda: ObterFazendaResponse = {
                id: parametros.idFazenda,
                nome: 'Fazenda Nova',
                quantidadeTotalHectares: 500,
                logradouro: 'Rua 1',
                numero: 123,
                referencia: null,
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                idCidade: '42cbf6b7-9f1a-4c8d-9205-f7e76b8c0f60',
            }

            const mockCultura = {
                id: parametros.idCultura,
                nome: 'Soja',
            } as Cultura;

            vi.spyOn(fazendaService, 'obterFazendaId').mockResolvedValue(mockFazenda);
            vi.spyOn(culturaService, 'obterCulturaId').mockResolvedValue(mockCultura);
            vi.spyOn(vegetacaoRepository, 'obterVegetacaoFazenda').mockResolvedValue(null);

            await expect(vegetacaoService.criarVegetacao(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });
});

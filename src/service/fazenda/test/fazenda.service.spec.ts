import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FazendaService } from '../fazenda.service';
import { FazendaRepository } from 'src/repository/fazenda/fazenda.repository';
import { ViaCepClient } from 'src/repository/client/viaCep/viaCep.client';
import { CidadeService } from 'src/service/cidade/cidade.service';
import { ProdutorService } from 'src/service/produtor/produtor.service';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { Fazenda } from 'src/repository/fazenda/entity/fazenda.entity';
import { ObterFazendasDAO } from 'src/model/fazenda/dao/obterFazendas.dao';
import { ObterFazendaIdDAO } from 'src/model/fazenda/dao/obterFazendaId.dao';
import { ObterEnderecoPeloCepDAO } from 'src/model/client/viaCep/dao/obterEnderecoPeloCep.dao';
import { Cidade } from 'src/repository/cidade/entity/cidade.entity';
import { CriarFazendaRequest } from 'src/controller/fazenda/request/criarFazendas.request';

describe('FazendaService', () => {
    let fazendaService: FazendaService;
    let fazendaRepository: FazendaRepository;
    let viaCepClient: ViaCepClient;
    let cidadeService: CidadeService;
    let produtorService: ProdutorService;

    beforeEach(() => {
        fazendaRepository = {
            obterFazendas: vi.fn(),
            obterFazendaId: vi.fn(),
            criarFazenda: vi.fn(),
            deletarFazendaId: vi.fn(),
            atualizarFazenda: vi.fn(),
        } as any;

        viaCepClient = {
            obterEnderecoPeloCep: vi.fn(),
        } as any;

        cidadeService = {
            obterCidadeNomeUf: vi.fn(),
        } as any;

        produtorService = {
            obterProdutorId: vi.fn(),
        } as any;

        fazendaService = new FazendaService(
            fazendaRepository,
            viaCepClient,
            produtorService,
            cidadeService
        );
    });

    describe('obterFazendas', () => {
        it('deve retornar uma lista de fazendas', async () => {
            const mockFazendas: ObterFazendasDAO[] = [
                {
                    id: 'd1e76913-b57e-4c96-bdcb-d279ec837d8e',
                    nome: 'Fazenda A',
                    quantidadeTotalHectares: 50,
                    logradouro: 'Rua 1',
                    numero: 123,
                    referencia: null,
                    idProdutor: 'b6a3b8f6-1f58-4a58-b8dc-5c6d89df32d7',
                    idCidade: '83d718ab-46cb-4c77-b8cd-f872543ddc5f',
                },
                {
                    id: '0f9b5c9d-4712-468a-9e93-0df01703edc7',
                    nome: 'Fazenda B',
                    quantidadeTotalHectares: 100,
                    logradouro: 'Rua 2',
                    numero: 456,
                    referencia: 'Perto do rio',
                    idProdutor: 'c7f29a73-90ec-478b-bf80-fd6b88cbd347',
                    idCidade: '172834d1-72db-4d90-bbea-5f19e85bf6e1',
                },
            ]

            vi.spyOn(fazendaRepository, 'obterFazendas').mockResolvedValue(mockFazendas);

            const produtor = {
                idProdutor: 'b5d5ed9c-19e2-4c49-8c0f-2f414c6c0bb4',
            }

            const result = await fazendaService.obterFazendas(produtor);

            expect(result).toEqual(mockFazendas);
        });
    });

    describe('obterFazendaId', () => {
        it('deve retornar uma fazenda pelo ID', async () => {
            const fazendaId = '8c7a37e5-2d49-4d7f-9a7a-c08d7e92c4d8';
            const mockFazenda: ObterFazendaIdDAO = {
                id: fazendaId,
                nome: 'Fazenda A',
                quantidadeTotalHectares: 50,
                logradouro: 'Rua 1',
                numero: 123,
                referencia: null,
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                idCidade: '42cbf6b7-9f1a-4c8d-9205-f7e76b8c0f60',
            };

            vi.spyOn(fazendaRepository, 'obterFazendaId').mockResolvedValue(mockFazenda);

            const result = await fazendaService.obterFazendaId(fazendaId);

            expect(result).toEqual(mockFazenda);
        });

        it('deve lançar erro se a fazenda não existir', async () => {
            const fazendaId = 'invalid-uuid';
            vi.spyOn(fazendaRepository, 'obterFazendaId').mockResolvedValue(null);

            await expect(fazendaService.obterFazendaId(fazendaId)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    // describe('criarFazenda', () => {
    //     it('deve criar uma nova fazenda com sucesso', async () => {
    //         const mockEndereco: ObterEnderecoPeloCepDAO = {
    //             cep: '12345678',
    //             logradouro: 'Rua Nova',
    //             complemento: 'Apto 101',
    //             bairro: 'Centro',
    //             localidade: 'Cidade Nova',
    //             uf: 'SP',
    //             ibge: '1234567',
    //             gia: '1234',
    //             ddd: '11',
    //             siafi: '1234'
    //         }

    //         const mockCidade = {
    //             id: 'f318c3a7-924e-4576-8bf8-16b2b8cd42af',
    //             nome: "São Paulo",
    //             uf: "SP"
    //         } as Cidade;

    //         const mockFazenda = {
    //             id: '6f51e0f8-2c33-469e-a799-14b1be66a227',
    //             nome: 'Fazenda Nova',
    //             qtTotalHectares: 120,
    //             numero: 55,
    //             referencia: 'Próximo ao lago',
    //             idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
    //             logradouro: 'Rua Nova',
    //             idCidade: mockCidade.id,
    //         } as Fazenda;

    //         const parametros: CriarFazendaRequest = {
    //             nome: 'Fazenda Nova',
    //             qtTotalHectares: 120,
    //             cep: '12345678',
    //             numero: 55,
    //             referencia: 'Próximo ao lago',
    //             idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
    //         };

    //         vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue(mockEndereco);
    //         vi.spyOn(cidadeService, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);
    //         vi.spyOn(fazendaRepository, 'criarFazenda').mockResolvedValue(mockFazenda);

    //         const result = await fazendaService.criarFazenda(parametros);

    //         expect(result).toEqual(mockFazenda);
    //     });

    //     it('deve lançar erro se o CEP não for válido', async () => {
    //         const parametros: CriarFazendaRequest = {
    //             nome: 'Fazenda Nova',
    //             qtTotalHectares: 120,
    //             numero: 55,
    //             referencia: 'Próximo ao lago',
    //             idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
    //             cep: '00000000',
    //         };

    //         vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockRejectedValue(new Error('CEP inválido'));

    //         await expect(fazendaService.criarFazenda(parametros)).rejects.toThrow(RegraDeNegocioException);
    //     });
    // });
});

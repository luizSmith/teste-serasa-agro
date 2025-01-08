import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FazendaService } from '../fazenda.service';
import { FazendaRepository } from 'src/repository/fazenda/fazenda.repository';
import { ViaCepClient } from 'src/repository/client/viaCep/viaCep.client';
import { CidadeService } from 'src/service/cidade/cidade.service';
import { ProdutorService } from 'src/service/produtor/produtor.service';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { CriarFazendaRequest } from 'src/controller/fazenda/request/criarFazendas.request';
import { ObterEnderecoPeloCepDAO } from 'src/model/client/viaCep/dao/obterEnderecoPeloCep.dao';
import { Cidade } from 'src/repository/cidade/entity/cidade.entity';
import { Fazenda } from 'src/repository/fazenda/entity/fazenda.entity';

// Mockando o @Transactional para que não execute transações reais
vi.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),  // Não faz nada, ou seja, ignora transações
}));

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
            criarCidade: vi.fn(),
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

    describe('criarFazenda', () => {
        it('deve criar uma nova fazenda com sucesso', async () => {
            const mockEndereco: ObterEnderecoPeloCepDAO = {
                cep: '12345678',
                logradouro: 'Rua Nova',
                complemento: 'Apto 101',
                bairro: 'Centro',
                localidade: 'Cidade Nova',
                uf: 'SP',
                ibge: '1234567',
                gia: '1234',
                ddd: '11',
                siafi: '1234',
            };

            const mockCidade = {
                id: 'f318c3a7-924e-4576-8bf8-16b2b8cd42af',
                nome: 'São Paulo',
                uf: 'SP',
            } as Cidade;

            const mockFazenda = {
                id: '6f51e0f8-2c33-469e-a799-14b1be66a227',
                nome: 'Fazenda Nova',
                qtTotalHectares: 120,
                numero: 55,
                referencia: 'Próximo ao lago',
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                logradouro: 'Rua Nova',
                idCidade: mockCidade.id,
            } as Fazenda;

            const parametros: CriarFazendaRequest = {
                nome: 'Fazenda Nova',
                qtTotalHectares: 120,
                cep: '12345678',
                numero: 55,
                referencia: 'Próximo ao lago',
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
            };

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue(mockEndereco);
            vi.spyOn(cidadeService, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);
            vi.spyOn(fazendaRepository, 'criarFazenda').mockResolvedValue(mockFazenda);

            const result = await fazendaService.criarFazenda(parametros);

            expect(fazendaRepository.criarFazenda).toHaveBeenCalledWith({
                nome: parametros.nome,
                qtTotalHectares: parametros.qtTotalHectares,
                logradouro: mockEndereco.logradouro,
                numero: parametros.numero,
                referencia: parametros.referencia,
                idProdutor: parametros.idProdutor,
                idCidade: mockCidade.id,
            });

            expect(result).toEqual(mockFazenda);
        });

        it('deve lançar erro se o CEP não for válido', async () => {
            const parametros: CriarFazendaRequest = {
                nome: 'Fazenda Nova',
                qtTotalHectares: 120,
                numero: 55,
                referencia: 'Próximo ao lago',
                idProdutor: '1c9f897a-6d12-4a4d-b5cc-e8a8346a4fcd',
                cep: '00000000',
            };

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValueOnce(null);

            await expect(fazendaService.criarFazenda(parametros)).rejects.toThrow(RegraDeNegocioException);
        });
    });
});

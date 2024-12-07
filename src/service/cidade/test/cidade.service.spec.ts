import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CidadeService } from '../cidade.service';
import { CidadeRepository } from 'src/repository/cidade/cidade.repository';
import { Cidade } from 'src/repository/cidade/entity/cidade.entity';
import { ObterCidadeDTO } from 'src/model/cidade/dto/obterCidade.dto';
import { CriarCidadeDTO } from 'src/model/cidade/dto/criarCidade.dto';

describe('CidadeService', () => {
    let cidadeService: CidadeService;
    let cidadeRepository: CidadeRepository;

    beforeEach(() => {
        cidadeRepository = {
            obterCidadeNomeUf: vi.fn(),
            criarCidade: vi.fn(),
        } as any;
        cidadeService = new CidadeService(cidadeRepository);
    });

    describe('obterCidadeNomeUf', () => {
        it('deve retornar uma cidade válida com os parâmetros corretos', async () => {
            const mockCidade: Cidade = {
                id: 'b7a405a5-9dfc-4cf7-87a5-40122862a589',
                nome: 'São Paulo',
                uf: 'SP',
            } as Cidade;

            const parametros: ObterCidadeDTO = {
                nome: 'São Paulo',
                uf: 'SP',
            };

            vi.spyOn(cidadeRepository, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);

            const result = await cidadeService.obterCidadeNomeUf(parametros);

            expect(cidadeRepository.obterCidadeNomeUf).toHaveBeenCalledWith(parametros);
            expect(result).toEqual(mockCidade);
        });

        it('deve lançar RegraDeNegocioException quando não encontrar a cidade', async () => {
            const parametros: ObterCidadeDTO = {
                nome: 'Cidade Inexistente',
                uf: 'XX',
            };

            vi.spyOn(cidadeRepository, 'obterCidadeNomeUf').mockResolvedValue(null);

            expect(await cidadeService.obterCidadeNomeUf(parametros)).toEqual(null);

            expect(cidadeRepository.obterCidadeNomeUf).toHaveBeenCalledWith(parametros);
        });
    });

    describe('criarCidade', () => {
        it('deve criar uma cidade com os parâmetros corretos', async () => {
            const mockCidade: Cidade = {
                id: 'b7a405a5-9dfc-4cf7-87a5-40122862a590',
                nome: 'Rio de Janeiro',
                uf: 'RJ',
            } as Cidade;

            const parametros: CriarCidadeDTO = {
                nome: 'Rio de Janeiro',
                uf: 'RJ',
            };

            vi.spyOn(cidadeRepository, 'criarCidade').mockResolvedValue(mockCidade);

            const result = await cidadeService.criarCidade(parametros);

            expect(cidadeRepository.criarCidade).toHaveBeenCalledWith(parametros);
            expect(result).toEqual(mockCidade);
        });

        it('deve lançar RegraDeNegocioException se ocorrer um erro ao criar', async () => {
            const parametros: CriarCidadeDTO = {
                nome: 'Cidade Inválida',
                uf: 'XX',
            };

            try {
                await cidadeService.criarCidade(parametros)
            } catch (error) {
                expect(error.message).toStrictEqual(['Erro ao criar cidade'])
                expect(error.statusCode).toStrictEqual(400)
            }

            expect(cidadeRepository.criarCidade).toHaveBeenCalledWith(parametros);
        });
    });
});

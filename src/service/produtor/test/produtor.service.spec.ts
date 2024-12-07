import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProdutorService } from '../produtor.service';
import { ProdutorRepository } from 'src/repository/produtor/produtor.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { CriarProdutorDTO } from 'src/model/produtor/dto/criarProdutor.dto';
import { AtualizarProdutorRequest } from 'src/controller/produtor/request/atualizarProdutor.request';
import { Produtor } from 'src/repository/produtor/entity/produtor.entity';

describe('ProdutorService', () => {
    let produtorService: ProdutorService;
    let produtorRepository: ProdutorRepository;

    beforeEach(() => {
        produtorRepository = {
            obterProdutor: vi.fn(),
            obterProdutorId: vi.fn(),
            criarProdutor: vi.fn(),
            deletarProdutorId: vi.fn(),
            atualizarProdutor: vi.fn(),
        } as any;

        produtorService = new ProdutorService(produtorRepository);
    });

    describe('obterProdutor', () => {
        it('deve retornar um, na lista de produtores', async () => {
            const mockProdutores = [
                {
                    id: 'b5d5ed9c-19e2-4c49-8c0f-2f414c6c0bb4',
                    nome: 'Produtor A',
                    cnpj: '12345678000195',
                    cpf: null,
                    ativo: true,
                    criado: new Date(),
                },
                {
                    id: '51a5e9f2-18c7-4f5a-b72d-9c0e2436a8e4',
                    nome: 'Produtor B',
                    cnpj: null,
                    cpf: '12345678909',
                    ativo: true,
                    criado: new Date(),
                },
            ] as Produtor[];

            vi.spyOn(produtorRepository, 'obterProdutor').mockResolvedValue(mockProdutores);

            const result = await produtorService.obterProdutor();

            expect(result).toEqual(mockProdutores);
        });
    });

    describe('obterProdutorId', () => {
        it('deve retornar um produtor pelo ID', async () => {
            const produtorId = 'b5d5ed9c-19e2-4c49-8c0f-2f414c6c0bb4';

            const mockProdutor = {
                id: produtorId,
                nome: 'Produtor A',
                cnpj: '12345678000195',
                cpf: null,
                ativo: true,
                criado: new Date(),
            } as Produtor;

            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(mockProdutor);

            const result = await produtorService.obterProdutorId({ idProdutor: produtorId });

            expect(result).toEqual(mockProdutor);
        });

        it('deve lançar erro se o produtor não existir', async () => {
            const produtorId = 'invalid-uuid';
            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(null);

            await expect(
                produtorService.obterProdutorId({ idProdutor: produtorId })
            ).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('criarProdutor', () => {
        it('deve criar um novo produtor com CNPJ válido', async () => {
            const parametros: CriarProdutorDTO = {
                nome: 'Produtor C',
                cnpj: '12345678000195',
                cpf: null,
            };
            const mockProdutor = {
                id: '1c9b19f0-dc68-4f47-8a02-4c58ea736720',
                ...parametros,
                ativo: true,
                criado: new Date(),
            } as Produtor;

            vi.spyOn(produtorRepository, 'criarProdutor').mockResolvedValue(mockProdutor);

            const result = await produtorService.criarProdutor(parametros);

            expect(result).toEqual(mockProdutor);
        });

        it('deve lançar erro se CNPJ e CPF forem enviados ao mesmo tempo', async () => {
            const parametros: CriarProdutorDTO = {
                nome: 'Produtor Inválido',
                cnpj: '12345678000195',
                cpf: '12345678909',
            };

            await expect(produtorService.criarProdutor(parametros)).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('deleteProdutorId', () => {
        it('deve inativar um produtor pelo ID', async () => {
            const produtorId = 'b5d5ed9c-19e2-4c49-8c0f-2f414c6c0bb4';

            const mockProdutor = {
                id: produtorId,
                nome: 'Produtor A',
                cnpj: '12345678000195',
                cpf: null,
                ativo: true,
                criado: new Date(),
            } as Produtor;

            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(mockProdutor);

            vi.spyOn(produtorRepository, 'deletarProdutorId').mockResolvedValue(1);

            await produtorService.deleteProdutorId({ idProdutor: produtorId });

            expect(produtorRepository.deletarProdutorId).toHaveBeenCalledWith(produtorId);
        });

        it('deve lançar erro se o produtor não existir', async () => {
            const produtorId = 'invalid-uuid';
            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(null);

            await expect(
                produtorService.deleteProdutorId({ idProdutor: produtorId })
            ).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('atualizarProdutor', () => {
        it('deve atualizar os dados de um produtor existente', async () => {
            const produtorId = 'bc9cb591-7f27-4bb8-bccd-f1b7d52f5d61';
            const parametros = {
                nome: 'Produtor Atualizado',
            } as AtualizarProdutorRequest;

            const produtor = {
                id: produtorId,
                nome: 'Produtor Antigo',
                cnpj: '12345678000195',
                cpf: null,
                ativo: true,
                criado: new Date(),
            } as Produtor

            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(produtor);
            vi.spyOn(produtorRepository, 'atualizarProdutor').mockResolvedValue(1);

            const result = await produtorService.atualizarProdutor(produtorId, parametros);

            expect(result).toEqual(1);
            expect(produtorRepository.atualizarProdutor).toHaveBeenCalledWith(produtorId, parametros);
        });

        it('deve lançar erro ao enviar CPF para produtor com CNPJ', async () => {
            const produtorId = '7db01e02-bf44-42b6-82de-d2e8b52d1b66';
            const parametros = {
                cpf: '12345678909',
            } as AtualizarProdutorRequest;

            const produtor = {
                id: produtorId,
                nome: 'Produtor PJ',
                cnpj: '12345678000195',
                cpf: null,
                ativo: true,
                criado: new Date(),
            } as Produtor;

            vi.spyOn(produtorRepository, 'obterProdutorId').mockResolvedValue(produtor);

            await expect(produtorService.atualizarProdutor(produtorId, parametros)).rejects.toThrow(RegraDeNegocioException);
        });
    });
});

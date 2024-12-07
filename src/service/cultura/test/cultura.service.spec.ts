import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CulturaRepository } from 'src/repository/cultura/cultura.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { Cultura } from 'src/repository/cultura/entity/cultura.entity';
import { CulturaService } from '../cultura.service';

describe('CulturaService', () => {
    let culturaService: CulturaService;
    let culturaRepository: CulturaRepository;

    beforeEach(() => {
        culturaRepository = {
            obterCulturaId: vi.fn(),
            obterCultura: vi.fn(),
        } as unknown as CulturaRepository;

        culturaService = new CulturaService(culturaRepository);
    });

    describe('obterCulturaId', () => {
        it('deve retornar uma cultura válida quando o ID for encontrado', async () => {
            const mockCultura = {
                id: 'b7a405a5-9dfc-4cf7-87a5-40122862a588',
                nome: 'Soja',
            } as Cultura;

            const culturaSpy = vi.spyOn(culturaRepository, 'obterCulturaId').mockImplementation(async (idCultura) => {
                return idCultura === mockCultura.id ? mockCultura : null;
            });

            const result = await culturaService.obterCulturaId('b7a405a5-9dfc-4cf7-87a5-40122862a588');
            expect(result).toEqual(mockCultura);

            culturaSpy.mockRestore();
        });

        it('deve lançar RegraDeNegocioException quando o ID não for encontrado', async () => {

            vi.spyOn(culturaRepository, 'obterCulturaId').mockImplementation(null);

            await expect(culturaService.obterCulturaId('b7a405a5-9dfc-4cf7-87a5-40122862a588')).rejects.toThrow(RegraDeNegocioException);
            expect(culturaRepository.obterCulturaId).toHaveBeenCalledWith('b7a405a5-9dfc-4cf7-87a5-40122862a588');
        });
    });


    describe('obterCultura', () => {
        it('deve retornar uma lista de culturas', async () => {
            const mockCulturas = [
                { id: 'b7a405a5-9dfc-4cf7-87a5-40122862a589', nome: 'Soja' },
                { id: 'f90c68e5-1c9b-419d-a3a4-6c756a8e2ecf', nome: 'Milho' },
            ] as Cultura[];

            const culturaSpy = vi.spyOn(culturaRepository, 'obterCultura').mockResolvedValue(mockCulturas);

            const result = await culturaService.obterCultura();

            expect(result).toStrictEqual(mockCulturas);

            culturaSpy.mockRestore();
        });

        it('deve retornar uma lista vazia quando não houver culturas', async () => {
            vi.spyOn(culturaRepository, 'obterCultura').mockResolvedValue([]);

            const result = await culturaService.obterCultura();

            expect(result).toStrictEqual([]);
        });
    });
});

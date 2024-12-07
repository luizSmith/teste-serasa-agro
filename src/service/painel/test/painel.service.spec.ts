import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PainelService } from '../painel.service';
import { PainelRepository } from 'src/repository/painel/painel.repository';
import { ObterPainelProdutorDAO } from 'src/model/painel/dao/obterPainelProdutor.dao';
import { ObterPainelProdutorResponse } from 'src/controller/painel/response/obterPainelProdutor.response';

describe('PainelService', () => {
  let painelService: PainelService;
  let painelRepository: PainelRepository;

  beforeEach(() => {
    painelRepository = {
      obterPainelProdutor: vi.fn(),
    } as any;

    painelService = new PainelService(painelRepository);
  });

  describe('obterPainelProdutor', () => {
    it('deve retornar as informações do painel do produtor', async () => {
      const mockPainelProdutor: ObterPainelProdutorDAO[] = [
        {
          idFazenda: 'd2c5d466-df4e-4c2a-9b77-7e82b9e5ae59',
          nomeFazenda: 'Fazenda 1',
          quantidadeVegetacao: 100.5,
          idCultura: 'f318c3a7-924e-4576-8bf8-16b2b8cd42af',
          nomeCultura: 'Soja',
          quantidadeTotalFazenda: 1500,
          idCidade: '12345678-1234-1234-1234-1234567890ab',
          nomeCidade: 'São Paulo',
          ufCidade: 'SP',
        },
        {
          idFazenda: 'd7f71b28-dc91-4681-b234-9c8750fe0cb0',
          nomeFazenda: 'Fazenda 2',
          quantidadeVegetacao: 200.75,
          idCultura: 'a907ffb4-ef3b-4f9d-90e4-11248dff8106',
          nomeCultura: 'Milho',
          quantidadeTotalFazenda: 2500,
          idCidade: '23456789-2345-2345-2345-234567890abc',
          nomeCidade: 'Campinas',
          ufCidade: 'SP',
        },
      ];

      const mockResponse: ObterPainelProdutorResponse = {
        quantidadeFazendas: 2,
        quantidadeHectares: 4000,
        porcentagemDoSoloComVegetacao: 7.53,
        porcentagensFazendasPorUf: {
          SP: 100,
        },
        porcentagemPorTipoCultura: {
          Soja: 50,
          Milho: 50,
        },
      };

      vi.spyOn(painelRepository, 'obterPainelProdutor').mockResolvedValue(mockPainelProdutor);

      const result = await painelService.obterPainelProdutor();

      expect(result).toEqual(mockResponse);
    });

    it('deve tratar corretamente os dados e retornar a resposta adequada', async () => {
      const mockPainelProdutor: ObterPainelProdutorDAO[] = [
        {
          idFazenda: 'd2c5d466-df4e-4c2a-9b77-7e82b9e5ae59',
          nomeFazenda: 'Fazenda 1',
          quantidadeVegetacao: 300.5,
          idCultura: 'f318c3a7-924e-4576-8bf8-16b2b8cd42af',
          nomeCultura: 'Café',
          quantidadeTotalFazenda: 1000,
          idCidade: '12345678-1234-1234-1234-1234567890ab',
          nomeCidade: 'São Paulo',
          ufCidade: 'SP',
        },
        {
          idFazenda: 'd7f71b28-dc91-4681-b234-9c8750fe0cb0',
          nomeFazenda: 'Fazenda 2',
          quantidadeVegetacao: 400.25,
          idCultura: 'a907ffb4-ef3b-4f9d-90e4-11248dff8106',
          nomeCultura: 'Milho',
          quantidadeTotalFazenda: 1500,
          idCidade: '23456789-2345-2345-2345-234567890abc',
          nomeCidade: 'Campinas',
          ufCidade: 'SP',
        },
      ];

      const mockResponse: ObterPainelProdutorResponse = {
        quantidadeFazendas: 2,
        quantidadeHectares: 2500,
        porcentagemDoSoloComVegetacao: 28.03,
        porcentagensFazendasPorUf: {
          SP: 100,
        },
        porcentagemPorTipoCultura: {
          Café: 50,
          Milho: 50,
        },
      };

      vi.spyOn(painelRepository, 'obterPainelProdutor').mockResolvedValue(mockPainelProdutor);

      const result = await painelService.obterPainelProdutor();

      expect(result).toEqual(mockResponse);
    });
  });
});

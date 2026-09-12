import { casa } from '@/data/casa';
import type { Destino } from '@/lib/links';

export type Categoria = 'frutos-do-mar' | 'regional' | 'carnes' | 'padaria' | 'bar';

export type Sabor = Destino & {
  id: string;
  nome: string;
  /** A frase curta que resume por que vale a visita. */
  especialidade: string;
  onde: string;
  categoria: Categoria;
  minutosDeCarro: number;
  /** Pratos que o anfitrião recomenda pedir. */
  pratos: string[];
  telefone?: string;
  /**
   * Texto que já vai escrito quando o hóspede toca no botão do WhatsApp.
   * Sem ele, o cartão manda uma apresentação genérica.
   */
  mensagemWhatsApp?: string;
  /** Destaque pessoal do anfitrião — ganha selo no cartão. */
  favoritoDoAnfitriao?: boolean;
};

export const categorias: { id: Categoria | 'todos'; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Tudo' },
  { id: 'frutos-do-mar', rotulo: 'Frutos do mar' },
  { id: 'regional', rotulo: 'Comida regional' },
  { id: 'carnes', rotulo: 'Carnes' },
  { id: 'padaria', rotulo: 'Padaria' },
  { id: 'bar', rotulo: 'Bar de praia' },
];

/** Quem indica os lugares — o dono da casa, sempre o primeiro da lista. */
const anfitriao = casa.anfitrioes[0].nome;

export const sabores: Sabor[] = [
  {
    id: 'padaria-mitsu',
    nome: 'Padaria Mitsu',
    especialidade: 'A melhor sopa do Litoral Sul da Paraíba',
    onde: 'Jacumã · Conde',
    categoria: 'padaria',
    minutosDeCarro: 4,
    pratos: ['Sopa', 'Pães', 'Bolos', 'Pastelaria'],
    favoritoDoAnfitriao: true,
    buscaMapa: 'Padaria Mitsu, Jacuma, Conde - PB',
  },
  {
    id: 'arca-da-bilu',
    nome: 'Arca da Bilú',
    especialidade: 'A melhor caldeirada do Litoral Sul — o paraíso gastronômico de Tambaba',
    onde: 'Praia de Tambaba · Conde',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 20,
    pratos: ['Caldeirada', 'Peixes', 'Frutos do mar'],
    favoritoDoAnfitriao: true,
    buscaMapa: 'Arca da Bilu, Praia de Tambaba, Conde - PB',
  },
  {
    id: 'turek',
    nome: 'Turek',
    especialidade: 'Costela assada e moqueca de pescada amarela — e uma torta holandesa fora de série',
    onde: 'Praia de Carapibus · Conde',
    categoria: 'carnes',
    minutosDeCarro: 6,
    pratos: ['Costela bovina assada', 'Costela suína assada', 'Moqueca de pescada amarela', 'Torta holandesa'],
    favoritoDoAnfitriao: true,
    buscaMapa: 'Turek, Praia de Carapibus, Conde - PB',
  },
  {
    id: 'casa-de-taipa',
    nome: 'Casa de Taipa',
    especialidade: 'O melhor rubacão da região',
    onde: 'Perto do Shopping Rural de Tambaba · Conde',
    categoria: 'regional',
    minutosDeCarro: 18,
    pratos: ['Rubacão', 'Comida regional'],
    favoritoDoAnfitriao: true,
    buscaMapa: 'Casa de Taipa, Tambaba, Conde - PB',
  },
  {
    id: 'irmao-neno',
    nome: 'Irmão Neno',
    especialidade: 'O melhor filé de robalo e de badejo da Paraíba, na última praia do estado',
    onde: 'Pontinha · Acaú · Pitimbu',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 55,
    pratos: ['Filé de robalo', 'Filé de badejo'],
    telefone: '83 99647-0428',
    mensagemWhatsApp:
      `Olá! Vim por indicação do ${anfitriao}, da Casa de Praia da Praia do Amor. ` +
      'Gostaria de saber quais opções de refeições vocês preparam para comer aí no restaurante. ' +
      'Agradeço desde já!',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Restaurante Irmao Neno, Pontinha, Acau, Pitimbu - PB',
  },
  {
    id: 'bar-da-ova',
    nome: 'Bar do Eterno Ex-Gordo (Bar da Ova)',
    especialidade: 'A melhor lagosta e a melhor ova de peixe da Paraíba',
    onde: 'Pontinha · Acaú · Pitimbu',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 55,
    pratos: ['Lagosta', 'Ova de peixe'],
    favoritoDoAnfitriao: true,
    buscaMapa: 'Bar da Ova, Pontinha, Acau, Pitimbu - PB',
  },
  {
    id: 'tabagrill-mirante',
    nome: 'TabaGrill Mirante',
    especialidade: 'Almoço com o mar de Tabatinga II na frente',
    onde: 'Beira-mar de Tabatinga II · Conde',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 9,
    pratos: ['Peixes', 'Grelhados', 'Petiscos'],
    buscaMapa: 'Restaurante TabaGrill Mirante, Tabatinga, Conde - PB',
  },
  {
    id: 'praia-soul',
    nome: 'Praia Soul Bar e Restaurante',
    especialidade: 'Pé na areia em Tabatinga II, do almoço ao fim de tarde',
    onde: 'Beira-mar de Tabatinga II · Conde',
    categoria: 'bar',
    minutosDeCarro: 9,
    pratos: ['Petiscos', 'Frutos do mar', 'Drinks'],
    buscaMapa: 'Praia Soul Bar e Restaurante, Tabatinga, Conde - PB',
  },
  {
    id: 'panela-de-barro',
    nome: 'Panela de Barro',
    especialidade: 'Comida regional na beira da PB-008',
    onde: 'PB-008, sentido Shopping Rural de Tambaba',
    categoria: 'regional',
    minutosDeCarro: 16,
    pratos: ['Comida regional', 'Pratos na panela de barro'],
    buscaMapa: 'Restaurante Panela de Barro, PB-008, Conde - PB',
  },
  {
    id: 'self-service-tambaba',
    nome: 'Self service do Shopping Rural',
    especialidade: 'Comida regional a quilo, no meio da feira',
    onde: 'Shopping Rural de Tambaba · Conde',
    categoria: 'regional',
    minutosDeCarro: 18,
    pratos: ['Buffet regional', 'Pratos do dia'],
    buscaMapa: 'Shopping Rural de Tambaba, Conde - PB',
  },
  {
    id: 'bar-da-kada',
    nome: 'Bar e Restaurante da Kada',
    especialidade: 'Comida típica regional na estrada de volta para João Pessoa',
    onde: 'Depois da Barra de Gramame, sentido João Pessoa',
    categoria: 'regional',
    minutosDeCarro: 17,
    pratos: ['Comida típica', 'Pratos regionais'],
    buscaMapa: 'Bar e Restaurante da Kada, Barra de Gramame, Conde - PB',
  },
  {
    id: 'bar-seu-zezinho',
    nome: 'Bar do Seu Zezinho',
    especialidade: 'Bar de beira-rio na Barra de Gramame',
    onde: 'Barra de Gramame · Conde',
    categoria: 'bar',
    minutosDeCarro: 15,
    pratos: ['Petiscos', 'Frutos do mar', 'Cerveja gelada'],
    buscaMapa: 'Bar do Seu Zezinho, Barra de Gramame, Conde - PB',
  },
  {
    id: 'bar-do-mexicano',
    nome: 'Bar do Mexicano',
    especialidade: 'Onde acontece a apresentação do Guaiamum Gigante, sábado e domingo a partir das 9h',
    onde: 'Barra de Gramame · Conde',
    categoria: 'bar',
    minutosDeCarro: 15,
    pratos: ['Petiscos', 'Caranguejo', 'Cerveja gelada'],
    buscaMapa: 'Bar do Mexicano, Barra de Gramame, Conde - PB',
  },
];

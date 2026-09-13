import { casa } from '@/data/casa';
import type { Litoral } from '@/data/praias';
import type { Destino } from '@/lib/links';

export type Categoria =
  | 'frutos-do-mar'
  | 'regional'
  | 'carnes'
  | 'padaria'
  | 'bar'
  | 'lanche'
  | 'tematico';

export type Sabor = Destino & {
  id: string;
  nome: string;
  /** A frase curta que resume por que vale a visita. */
  especialidade: string;
  onde: string;
  litoral: Litoral;
  categoria: Categoria;
  minutosDeCarro: number;
  /** Pratos que o anfitrião recomenda pedir. */
  pratos: string[];
  /** Um aviso prático: quando ir, com o que combinar, se precisa reservar. */
  dica?: string;
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
  { id: 'lanche', rotulo: 'Hambúrguer' },
  { id: 'tematico', rotulo: 'Temáticos' },
];

/** Quem indica os lugares — o dono da casa, sempre o primeiro da lista. */
const anfitriao = casa.anfitrioes[0].nome;

/* =========================================================================
 * LITORAL SUL — Conde e Pitimbu
 * ======================================================================= */

const litoralSul: Sabor[] = [
  {
    id: 'padaria-mitsu',
    nome: 'Padaria Mitsu',
    especialidade: 'A melhor sopa do Litoral Sul da Paraíba — e pães, bolos e pastelaria de padrão alto',
    onde: 'Jacumã · Conde',
    litoral: 'sul',
    categoria: 'padaria',
    minutosDeCarro: 4,
    pratos: ['Sopa', 'Pães', 'Bolos', 'Pastelaria'],
    dica: 'Boa parada para o café da manhã antes de sair para a praia.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Padaria Mitsu, Jacuma, Conde - PB',
  },
  {
    id: 'arca-da-bilu',
    nome: 'Arca da Bilú',
    especialidade: 'A melhor caldeirada do Litoral Sul — o paraíso gastronômico de Tambaba',
    onde: 'Praia de Tambaba · Conde',
    litoral: 'sul',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 20,
    pratos: ['Caldeirada', 'Peixes', 'Frutos do mar'],
    dica: 'Almoço obrigatório no dia de Tambaba — fica no alto da praia.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Arca da Bilu, Praia de Tambaba, Conde - PB',
  },
  {
    id: 'turek',
    nome: 'Turek',
    especialidade: 'Costela assada e moqueca de pescada amarela — e uma torta holandesa fora de série',
    onde: 'Praia de Carapibus · Conde',
    litoral: 'sul',
    categoria: 'carnes',
    minutosDeCarro: 6,
    pratos: ['Costela bovina assada', 'Costela suína assada', 'Moqueca de pescada amarela', 'Torta holandesa'],
    dica: 'Fica a poucos minutos da casa. Guarde espaço para a torta holandesa.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Turek, Praia de Carapibus, Conde - PB',
  },
  {
    id: 'casa-de-taipa',
    nome: 'Casa de Taipa',
    especialidade: 'O melhor rubacão da região',
    onde: 'Perto do Shopping Rural de Tambaba · Conde',
    litoral: 'sul',
    categoria: 'regional',
    minutosDeCarro: 18,
    pratos: ['Rubacão', 'Comida regional'],
    dica: 'Rubacão é o prato a pedir. Combine com a manhã em Tambaba.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Casa de Taipa, Tambaba, Conde - PB',
  },
  {
    id: 'irmao-neno',
    nome: 'Irmão Neno',
    especialidade: 'O melhor filé de robalo e de badejo da Paraíba, na última praia do estado',
    onde: 'Pontinha · Acaú · Pitimbu',
    litoral: 'sul',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 55,
    pratos: ['Filé de robalo', 'Filé de badejo'],
    dica: 'Fica no extremo sul do litoral paraibano — combine com as piscinas naturais de Pitimbu.',
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
    litoral: 'sul',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 55,
    pratos: ['Lagosta', 'Ova de peixe'],
    dica: 'Mesmo trecho do Irmão Neno, na Pontinha.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Bar da Ova, Pontinha, Acau, Pitimbu - PB',
  },
  {
    id: 'tabagrill-mirante',
    nome: 'TabaGrill Mirante',
    especialidade: 'Almoço com vista para as falésias de Tabatinga II',
    onde: 'Beira-mar de Tabatinga II · Conde',
    litoral: 'sul',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 9,
    pratos: ['Peixes', 'Grelhados', 'Petiscos'],
    dica: 'Fica ao lado do Mirante da Voçoroca — praia de manhã e almoço no mesmo ponto.',
    buscaMapa: 'Restaurante TabaGrill Mirante, Tabatinga, Conde - PB',
  },
  {
    id: 'praia-soul',
    nome: 'Praia Soul Bar e Restaurante',
    especialidade: 'Beach club pé na areia em Tabatinga II, com estrutura para passar o dia',
    onde: 'Beira-mar de Tabatinga II · Conde',
    litoral: 'sul',
    categoria: 'bar',
    minutosDeCarro: 9,
    pratos: ['Petiscos', 'Frutos do mar', 'Drinks'],
    dica: 'Bom para almoço demorado com vista para o mar. Em alta temporada, chegue cedo para pegar mesa.',
    buscaMapa: 'Praia Soul Bar e Restaurante, Tabatinga, Conde - PB',
  },
  {
    id: 'panela-de-barro',
    nome: 'Panela de Barro',
    especialidade: 'Comida regional de panela na beira da PB-008 — cozinha caseira e porções fartas',
    onde: 'PB-008, sentido Shopping Rural de Tambaba',
    litoral: 'sul',
    categoria: 'regional',
    minutosDeCarro: 16,
    pratos: ['Comida regional', 'Pratos na panela de barro'],
    dica: 'Fica no caminho de quem vai para Tambaba.',
    buscaMapa: 'Restaurante Panela de Barro, PB-008, Conde - PB',
  },
  {
    id: 'self-service-tambaba',
    nome: 'Self-service do Shopping Rural',
    especialidade: 'Comida regional a quilo, dentro do Shopping Rural de Tambaba',
    onde: 'Shopping Rural de Tambaba · Conde',
    litoral: 'sul',
    categoria: 'regional',
    minutosDeCarro: 18,
    pratos: ['Buffet regional', 'Pratos do dia'],
    dica: 'Opção rápida e econômica para o almoço em família, no meio da feira.',
    buscaMapa: 'Shopping Rural de Tambaba, Conde - PB',
  },
  {
    id: 'bar-da-kada',
    nome: 'Bar e Restaurante da Kada',
    especialidade: 'Comida típica regional na volta do passeio pela Barra de Gramame',
    onde: 'Depois da Barra de Gramame, sentido João Pessoa',
    litoral: 'sul',
    categoria: 'regional',
    minutosDeCarro: 17,
    pratos: ['Comida típica', 'Pratos regionais'],
    dica: 'Boa parada no caminho de volta para João Pessoa.',
    buscaMapa: 'Bar e Restaurante da Kada, Barra de Gramame, Conde - PB',
  },
  {
    id: 'bar-seu-zezinho',
    nome: 'Bar do Seu Zezinho',
    especialidade: 'Peixe e petiscos pé na areia, com vista para o encontro do rio Gramame com o mar',
    onde: 'Barra de Gramame · Conde',
    litoral: 'sul',
    categoria: 'bar',
    minutosDeCarro: 15,
    pratos: ['Peixe', 'Petiscos', 'Cerveja gelada'],
    buscaMapa: 'Bar do Seu Zezinho, Barra de Gramame, Conde - PB',
  },
  {
    id: 'bar-do-mexicano',
    nome: 'Bar do Mexicano',
    especialidade: 'Onde acontece a apresentação do Guaiamum Gigante, sábado e domingo a partir das 9h',
    onde: 'Barra de Gramame · Conde',
    litoral: 'sul',
    categoria: 'bar',
    minutosDeCarro: 15,
    pratos: ['Petiscos', 'Caranguejo', 'Cerveja gelada'],
    dica: 'Chegue cedo, é concorrido.',
    buscaMapa: 'Bar do Mexicano, Barra de Gramame, Conde - PB',
  },
];

/* =========================================================================
 * LITORAL NORTE — João Pessoa e Cabedelo
 * ======================================================================= */

const litoralNorte: Sabor[] = [
  {
    id: 'peixada-do-edson',
    nome: 'Peixada do Edson',
    especialidade: 'A melhor peixada do trecho norte, na PB-008, no caminho das praias da zona sul de João Pessoa',
    onde: 'Praia da Penha · PB-008',
    litoral: 'norte',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 28,
    pratos: ['Peixada'],
    dica: 'Almoço natural do dia da Praia da Penha e das piscinas naturais.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Peixada do Edson, Praia da Penha, Joao Pessoa - PB',
  },
  {
    id: 'bar-do-cabeca',
    nome: 'Bar do Cabeça',
    especialidade: 'A comida típica regional mais gostosa da cidade, em porções generosas',
    onde: 'Mangabeira · João Pessoa',
    litoral: 'norte',
    categoria: 'regional',
    minutosDeCarro: 30,
    pratos: ['Comida típica regional', 'Porções generosas'],
    dica: 'Fica no mesmo bairro do Shopping Mangabeira.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Bar do Cabeca, Mangabeira, Joao Pessoa - PB',
  },
  {
    id: 'recanto-do-picui',
    nome: 'Recanto do Picuí',
    especialidade: 'A melhor carne de sol do Nordeste — com nata, macaxeira e queijo coalho',
    onde: 'João Pessoa',
    litoral: 'norte',
    categoria: 'carnes',
    minutosDeCarro: 45,
    pratos: ['Carne de sol', 'Nata', 'Macaxeira', 'Queijo coalho'],
    dica: 'Casa tradicional, costuma encher no almoço de fim de semana.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Recanto do Picui, Joao Pessoa - PB',
  },
  {
    id: 'tempero-da-neide',
    nome: 'Tempero da Neide',
    especialidade: 'O maior e melhor galeto da Paraíba',
    onde: 'João Pessoa',
    litoral: 'norte',
    categoria: 'carnes',
    minutosDeCarro: 45,
    pratos: ['Galeto'],
    dica: 'Boa relação entre porção e preço para grupos — bom para dividir.',
    favoritoDoAnfitriao: true,
    buscaMapa: 'Tempero da Neide, Joao Pessoa - PB',
  },
  {
    id: 'peixada-do-amor',
    nome: 'Peixada do Amor',
    especialidade: 'Peixada e frutos do mar a poucos metros do Aquário Paraíba e da Ponta do Seixas',
    onde: 'Praia do Seixas · João Pessoa',
    litoral: 'norte',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 35,
    pratos: ['Peixada', 'Frutos do mar'],
    dica: 'Encaixa bem no dia do Farol, do Aquário e da Ponta do Seixas.',
    buscaMapa: 'Peixada do Amor, Praia do Seixas, Joao Pessoa - PB',
  },
  {
    id: 'peixada-do-lobo',
    nome: 'Peixada do Lobo',
    especialidade: 'Outra peixada tradicional do Seixas, no mesmo trecho da Peixada do Amor',
    onde: 'Praia do Seixas · João Pessoa',
    litoral: 'norte',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 35,
    pratos: ['Peixada', 'Frutos do mar'],
    dica: 'Vale conferir qual das duas está menos cheia.',
    buscaMapa: 'Peixada do Lobo, Praia do Seixas, Joao Pessoa - PB',
  },
  {
    id: 'peixada-jacarape',
    nome: 'Restaurante e Peixada Jacarapé',
    especialidade: 'Peixada e frutos do mar na própria praia de Jacarapé',
    onde: 'Praia de Jacarapé · João Pessoa',
    litoral: 'norte',
    categoria: 'frutos-do-mar',
    minutosDeCarro: 22,
    pratos: ['Peixada', 'Frutos do mar'],
    dica: 'O almoço natural do dia em que se visita Jacarapé e a Praia do Sol.',
    buscaMapa: 'Restaurante e Peixada Jacarape, Joao Pessoa - PB',
  },
  {
    id: 'navarros-burger',
    nome: "Navarro's Burger",
    especialidade: 'Hambúrguer artesanal, um dos mais bem avaliados da cidade',
    onde: 'Brisamar · João Pessoa',
    litoral: 'norte',
    categoria: 'lanche',
    minutosDeCarro: 40,
    pratos: ['Hambúrguer artesanal'],
    dica: 'Boa pedida para a noite, depois da praia. Fica no Brisamar, perto da orla.',
    buscaMapa: "Navarro's Burger, Brisamar, Joao Pessoa - PB",
  },
  {
    id: 'sertao-generoso',
    nome: 'Sertão Generoso',
    especialidade: 'Restaurante temático com ambientação sertaneja e comida regional',
    onde: 'João Pessoa',
    litoral: 'norte',
    categoria: 'tematico',
    minutosDeCarro: 45,
    pratos: ['Comida regional', 'Ambientação sertaneja'],
    dica: 'Programa de jantar com a família — a ambientação é parte da experiência.',
    buscaMapa: 'Sertao Generoso, Joao Pessoa - PB',
  },
  {
    id: 'castelo-fascino',
    nome: 'Castelo Fascino',
    especialidade: 'Restaurante temático com ambientação medieval — programa diferente para uma noite da viagem',
    onde: 'João Pessoa',
    litoral: 'norte',
    categoria: 'tematico',
    minutosDeCarro: 45,
    pratos: ['Jantar temático', 'Ambientação medieval'],
    dica: 'Costuma exigir reserva: confirme antes de ir.',
    buscaMapa: 'Castelo Fascino, Joao Pessoa - PB',
  },
];

export const sabores: Sabor[] = [...litoralSul, ...litoralNorte];

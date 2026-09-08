import type { Destino } from '@/lib/links';

export type TipoPasseio = 'mirante' | 'experiencia';

export type Passeio = Destino & {
  id: string;
  nome: string;
  cidade: string;
  tipo: TipoPasseio;
  resumo: string;
  destaques: string[];
  minutosDeCarro: number;
  /** Melhor horário para ir — aparece como etiqueta no cartão. */
  melhorHorario?: string;
  dica?: string;
  /** Foto opcional, guardada em `public/fotos/lugares/`. */
  foto?: string;
};

/* =========================================================================
 * MIRANTES — as vistas do Litoral Sul
 * ======================================================================= */

export const mirantes: Passeio[] = [
  {
    id: 'mirante-do-amor',
    nome: 'Mirante do Amor',
    cidade: 'Jacumã · Conde',
    tipo: 'mirante',
    minutosDeCarro: 3,
    melhorHorario: 'Fim de tarde',
    resumo:
      'O mirante da nossa praia, logo acima da casa. Do alto da falésia, a enseada inteira se abre — e o pôr do sol faz o resto.',
    destaques: ['A 3 minutos da casa', 'Vista da enseada', 'Pôr do sol'],
    dica: 'É o passeio mais fácil da lista: dá para ir a pé ou de carro em poucos minutos.',
    buscaMapa: 'Mirante da Praia do Amor, Jacuma, Conde - PB',
  },
  {
    id: 'mirante-carapibus',
    nome: 'Mirante de Carapibus',
    cidade: 'Conde',
    tipo: 'mirante',
    minutosDeCarro: 6,
    melhorHorario: 'Manhã ou fim de tarde',
    resumo:
      'Uma sacada natural sobre o mar, com a faixa de falésias vermelhas se estendendo para os dois lados.',
    destaques: ['Vista panorâmica', 'Falésias vermelhas', 'Fácil acesso'],
    buscaMapa: 'Mirante de Carapibus, Conde - PB',
  },
  {
    id: 'mirante-vocoroca',
    nome: 'Mirante da Voçoroca',
    cidade: 'Tabatinga II · Conde',
    tipo: 'mirante',
    minutosDeCarro: 10,
    melhorHorario: 'Fim de tarde',
    resumo:
      'A voçoroca é a fenda esculpida pela chuva na falésia. O resultado é um relevo recortado, de terra alaranjada, com o mar ao fundo.',
    destaques: ['Formação de falésia', 'Terra alaranjada', 'Vista aberta do mar'],
    dica: 'Fique longe da borda: a falésia é de barro e cede com facilidade.',
    buscaMapa: 'Mirante da Vocoroca, Tabatinga II, Conde - PB',
  },
  {
    id: 'castelinho-da-princesa',
    nome: 'Castelinho da Princesa',
    cidade: 'Conde',
    tipo: 'mirante',
    minutosDeCarro: 12,
    melhorHorario: 'Tarde',
    resumo:
      'A construção mais fotografada da região, empoleirada na falésia com vista direta para o mar aberto.',
    destaques: ['Ponto de foto', 'Vista do alto', 'Arquitetura curiosa'],
    buscaMapa: 'Castelinho da Princesa, Conde - PB',
  },
  {
    id: 'dedo-de-deus',
    nome: 'Dedo de Deus',
    cidade: 'Coqueirinho · Conde',
    tipo: 'mirante',
    minutosDeCarro: 13,
    melhorHorario: 'Maré baixa',
    resumo:
      'Uma formação rochosa apontando para o céu, na ponta de Coqueirinho. Vira ilha na maré alta e se conecta à praia na maré baixa.',
    destaques: ['Formação rochosa', 'Caminhada pela praia', 'Depende da maré'],
    dica: 'Confira a tábua de marés: na maré alta o acesso pela areia desaparece.',
    buscaMapa: 'Dedo de Deus, Praia de Coqueirinho, Conde - PB',
  },
  {
    id: 'mirante-coqueirinho',
    nome: 'Mirante de Coqueirinho',
    cidade: 'Conde',
    tipo: 'mirante',
    minutosDeCarro: 12,
    melhorHorario: 'Manhã',
    resumo:
      'Do alto, a enseada de Coqueirinho revela a mistura de verde do coqueiral, vermelho da falésia e azul-esverdeado da água.',
    destaques: ['Enseada vista do alto', 'Coqueirais', 'Cores da falésia'],
    buscaMapa: 'Mirante de Coqueirinho, Conde - PB',
  },
  {
    id: 'mirante-tambaba',
    nome: 'Mirante de Tambaba',
    cidade: 'Conde',
    tipo: 'mirante',
    minutosDeCarro: 20,
    melhorHorario: 'Manhã',
    resumo:
      'Vista de cima da praia mais famosa do Conde, com a mata atlântica descendo a falésia até encontrar as pedras.',
    destaques: ['Mata atlântica', 'Vista da enseada', 'Trilhas'],
    buscaMapa: 'Mirante de Tambaba, Conde - PB',
  },
];

/* =========================================================================
 * EXPERIÊNCIAS — o que fazer além de sentar na areia
 * ======================================================================= */

export const experiencias: Passeio[] = [
  {
    id: 'guaiamum-gigante',
    nome: 'Guaiamum Gigante',
    cidade: 'Barra de Gramame · Conde',
    tipo: 'experiencia',
    minutosDeCarro: 15,
    melhorHorario: 'Sáb. e dom., a partir das 9h',
    resumo:
      'A apresentação do Guaiamum Gigante, no Bar do Mexicano: folclore, música e o caranguejo símbolo do mangue de Gramame.',
    destaques: ['Folclore local', 'Fins de semana', 'Bar do Mexicano'],
    dica: 'Chegue cedo e aproveite para almoçar num dos bares da beira do rio.',
    buscaMapa: 'Bar do Mexicano, Barra de Gramame, Conde - PB',
  },
  {
    id: 'encontro-rio-mar',
    nome: 'Encontro do Rio com o Mar',
    cidade: 'Rio Graú · Praia Bela',
    tipo: 'experiencia',
    minutosDeCarro: 30,
    melhorHorario: 'Maré baixa',
    resumo:
      'O rio Graú encontra o oceano formando uma piscina natural de água doce e morna ao lado das ondas. Passeio garantido com crianças.',
    destaques: ['Água doce e morna', 'Ideal para crianças', 'Estrutura no local'],
    buscaMapa: 'Rio Grau, Praia Bela, Pitimbu - PB',
  },
  {
    id: 'piscinas-naturais-pitimbu',
    nome: 'Piscinas Naturais de Pitimbu',
    cidade: 'Pitimbu',
    tipo: 'experiencia',
    minutosDeCarro: 40,
    melhorHorario: 'Maré baixa',
    resumo:
      'Quando a maré recua, os arrecifes viram piscinas de água transparente e quente, cheias de peixinhos.',
    destaques: ['Piscinas naturais', 'Snorkel', 'Só na maré baixa'],
    dica: 'Leve máscara e snorkel — a água fica cristalina.',
    buscaMapa: 'Piscinas Naturais de Pitimbu - PB',
  },
  {
    id: 'shopping-rural-tambaba',
    nome: 'Shopping Rural de Tambaba',
    cidade: 'Conde',
    tipo: 'experiencia',
    minutosDeCarro: 18,
    resumo:
      'Feira de artesanato, produtos da roça e comida regional no caminho de Tambaba. Boa parada para lembranças e para almoçar.',
    destaques: ['Artesanato', 'Produtos regionais', 'Comida típica'],
    buscaMapa: 'Shopping Rural de Tambaba, Conde - PB',
  },
  {
    id: 'menor-praia-do-brasil',
    nome: 'A menor praia do Brasil',
    cidade: 'Marcélia · Conde',
    tipo: 'experiencia',
    minutosDeCarro: 20,
    resumo:
      'A Praia de Marcélia, no trecho de Tambaba, é apontada como a menor praia do país — uma enseada minúscula entre dois paredões.',
    destaques: ['Curiosidade', 'Enseada minúscula', 'Boa foto'],
    buscaMapa: 'Praia de Marcelia, Tambaba, Conde - PB',
  },
  {
    id: 'barra-abiai-passeio',
    nome: 'Barra do Abiaí',
    cidade: 'Pitimbu',
    tipo: 'experiencia',
    minutosDeCarro: 35,
    melhorHorario: 'Maré baixa',
    resumo:
      'A foz do rio Abiaí, com bancos de areia, água rasa e passeios de barco pelos manguezais.',
    destaques: ['Passeio de barco', 'Manguezais', 'Bancos de areia'],
    buscaMapa: 'Barra do Abiai, Pitimbu - PB',
  },
];

export const passeios: Passeio[] = [...mirantes, ...experiencias];

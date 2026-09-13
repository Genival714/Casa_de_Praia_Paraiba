import type { Litoral } from '@/data/praias';
import type { Credito } from '@/lib/creditos';
import type { Destino } from '@/lib/links';

/**
 * No Litoral Sul, os passeios são os mirantes da falésia e as experiências
 * (o guaiamum, as piscinas, o encontro do rio com o mar). No Litoral Norte,
 * são os passeios de João Pessoa e Cabedelo e os bairros da orla.
 */
export type TipoPasseio = 'mirante' | 'experiencia' | 'passeio' | 'bairro';

export type Passeio = Destino & {
  id: string;
  nome: string;
  cidade: string;
  litoral: Litoral;
  tipo: TipoPasseio;
  resumo: string;
  destaques: string[];
  minutosDeCarro: number;
  /** Melhor horário para ir — aparece como etiqueta no cartão. */
  melhorHorario?: string;
  dica?: string;
  /**
   * Foto opcional, a partir de `public/fotos/`: `lugares/farol.jpg` para uma
   * foto própria do passeio, ou `praias/tambaba-02.jpg` para reaproveitar uma
   * foto de praia que já está no site.
   */
  foto?: string;
  /** Obrigatório quando a foto é de terceiros (Wikimedia Commons, banco de imagens). */
  credito?: Credito;
  /** Que parte da foto mostrar quando o corte aperta, como '50% 30%' (padrão: mais para baixo). */
  fotoPosicao?: string;
};

/* =========================================================================
 * LITORAL SUL — MIRANTES, as vistas de cima da falésia
 * ======================================================================= */

export const mirantes: Passeio[] = [
  {
    id: 'mirante-do-amor',
    nome: 'Mirante do Amor',
    cidade: 'Jacumã · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 3,
    melhorHorario: 'Fim de tarde',
    resumo:
      'O mirante da nossa praia, logo acima da casa. Do alto da falésia, a enseada inteira se abre — e o pôr do sol faz o resto.',
    destaques: ['A 3 minutos da casa', 'Vista da enseada', 'Pôr do sol'],
    dica: 'É o passeio mais fácil da lista: dá para ir a pé ou de carro em poucos minutos.',
    buscaMapa: 'Mirante da Praia do Amor, Jacuma, Conde - PB',
    foto: 'praias/praia-do-amor-09.jpg',
  },
  {
    id: 'mirante-carapibus',
    nome: 'Mirante de Carapibus',
    cidade: 'Carapibus · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 6,
    melhorHorario: 'Começo da manhã',
    resumo:
      'Uma sacada natural sobre a enseada e o coqueiral, com a faixa de falésias vermelhas se estendendo para os dois lados.',
    destaques: ['Vista panorâmica', 'Falésias vermelhas', 'Fácil acesso'],
    dica: 'Combine com a manhã de praia em Carapibus — a luz é melhor no começo do dia.',
    buscaMapa: 'Mirante de Carapibus, Conde - PB',
    foto: 'praias/carapibus-06.jpg',
  },
  {
    id: 'mirante-vocoroca',
    nome: 'Mirante da Voçoroca',
    cidade: 'Tabatinga II · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 10,
    melhorHorario: 'Fim de tarde',
    resumo:
      'A voçoroca é a erosão que a chuva esculpiu na falésia: um paredão em degraus, de terra alaranjada, com o mar aberto ao fundo.',
    destaques: ['Paredão em degraus', 'Terra alaranjada', 'Vista aberta do mar'],
    dica: 'Mantenha distância da borda: o terreno é solto e cede com facilidade. Fica ao lado dos restaurantes de Tabatinga II.',
    buscaMapa: 'Mirante da Vocoroca, Tabatinga II, Conde - PB',
    foto: 'praias/tabatinga-ii-05.jpg',
  },
  {
    id: 'castelinho-da-princesa',
    nome: 'Castelinho da Princesa',
    cidade: 'Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 12,
    melhorHorario: 'Tarde',
    resumo:
      'A construção mais fotografada da região, empoleirada na falésia com vista panorâmica da costa.',
    destaques: ['Ponto de foto', 'Vista do alto', 'Arquitetura curiosa'],
    dica: 'Ótimo para fotos em família. Fica no caminho entre Tabatinga e Coqueirinho.',
    buscaMapa: 'Castelinho da Princesa, Conde - PB',
    foto: 'lugares/castelinho-da-princesa.jpg',
    credito: { autor: 'Matheus Jampa da Silva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Mirante_castelo_da_princesinha_em_praia_de_coqueirinho_na_Paraiba.jpg' },
  },
  {
    id: 'dedo-de-deus',
    nome: 'Dedo de Deus',
    cidade: 'Coqueirinho · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 13,
    melhorHorario: 'Maré baixa · fim de tarde',
    resumo:
      'Uma formação rochosa apontando para o céu, na ponta de Coqueirinho — um dos símbolos do litoral. Vira ilha na maré alta e se conecta à praia na maré baixa.',
    destaques: ['Formação rochosa', 'Caminhada pela praia', 'Depende da maré'],
    dica: 'Visite com a maré baixa para chegar mais perto pela areia — na maré alta o acesso desaparece. Fim de tarde é o melhor horário.',
    buscaMapa: 'Dedo de Deus, Praia de Coqueirinho, Conde - PB',
  },
  {
    id: 'mirante-coqueirinho',
    nome: 'Mirante de Coqueirinho',
    cidade: 'Coqueirinho · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 12,
    melhorHorario: 'Manhã',
    resumo:
      'Do alto, a enseada de Coqueirinho revela a mistura de verde do coqueiral, vermelho da falésia e azul-esverdeado da água.',
    destaques: ['Enseada vista do alto', 'Coqueirais', 'Cores da falésia'],
    dica: 'Parada rápida antes ou depois da praia, com estacionamento na parte alta.',
    buscaMapa: 'Mirante de Coqueirinho, Conde - PB',
    foto: 'praias/coqueirinho-01.jpg',
  },
  {
    id: 'mirante-tambaba',
    nome: 'Mirante de Tambaba',
    cidade: 'Tambaba · Conde',
    litoral: 'sul',
    tipo: 'mirante',
    minutosDeCarro: 20,
    melhorHorario: 'Fim de tarde',
    resumo:
      'Vista da enseada de Tambaba entre os paredões de falésia, com a mata atlântica descendo até as pedras e o mar aberto à frente.',
    destaques: ['Mata atlântica', 'Vista da enseada', 'Pôr do sol'],
    dica: 'Combine com o almoço na Arca da Bilú e fique para o pôr do sol.',
    buscaMapa: 'Mirante de Tambaba, Conde - PB',
    foto: 'praias/tambaba-02.jpg',
  },
];

/* =========================================================================
 * LITORAL SUL — EXPERIÊNCIAS, o que fazer além de sentar na areia
 * ======================================================================= */

export const experiencias: Passeio[] = [
  {
    id: 'guaiamum-gigante',
    nome: 'Guaiamum Gigante',
    cidade: 'Barra de Gramame · Conde',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 15,
    melhorHorario: 'Sáb. e dom., a partir das 9h',
    resumo:
      'A apresentação do Guaiamum Gigante, no Bar do Mexicano: folclore, música e o caranguejo símbolo do mangue de Gramame.',
    destaques: ['Folclore local', 'Fins de semana', 'Bar do Mexicano'],
    dica: 'Chegue cedo, é concorrido — e aproveite para almoçar num dos bares da beira do rio.',
    buscaMapa: 'Bar do Mexicano, Barra de Gramame, Conde - PB',
    foto: 'praias/barra-de-gramame-05.jpg',
  },
  {
    id: 'encontro-rio-mar',
    nome: 'Encontro do Rio com o Mar',
    cidade: 'Rio Graú · Praia Bela',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 30,
    melhorHorario: 'Maré baixa',
    resumo:
      'O rio Graú encontra o oceano formando uma piscina natural de água doce e morna ao lado das ondas. Passeio garantido com crianças.',
    destaques: ['Água doce e morna', 'Ideal para crianças', 'Estrutura no local'],
    dica: 'O banho seguro é na parte do rio. A estrutura de bares fica do lado de Pitimbu — leve água e comida se for ficar o dia.',
    buscaMapa: 'Rio Grau, Praia Bela, Pitimbu - PB',
    foto: 'praias/rio-grau-01.jpg',
  },
  {
    id: 'piscinas-naturais-pitimbu',
    nome: 'Piscinas Naturais de Pitimbu',
    cidade: 'Pitimbu',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 40,
    melhorHorario: 'Maré baixa',
    resumo:
      'Quando a maré recua, os arrecifes viram piscinas de água transparente e quente, cheias de peixinhos. Há passeio de catamarã saindo de Pitimbu.',
    destaques: ['Piscinas naturais', 'Snorkel', 'Passeio de catamarã'],
    dica: 'Leve máscara e snorkel — a água fica cristalina. Combine com o almoço em Acaú, na Pontinha.',
    buscaMapa: 'Piscinas Naturais de Pitimbu - PB',
    foto: 'praias/piscinas-pitimbu-02.jpg',
  },
  {
    id: 'shopping-rural-tambaba',
    nome: 'Shopping Rural de Tambaba',
    cidade: 'Tambaba · Conde',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 18,
    melhorHorario: 'Fim da manhã',
    resumo:
      'Ponto de encontro com artesanato, produtos da região e comida regional no caminho de Tambaba. Boa parada para lembranças e para o almoço.',
    destaques: ['Artesanato', 'Produtos regionais', 'Comida típica'],
    dica: 'Dentro fica o self-service de comida regional — boa parada no fim da manhã, antes do almoço.',
    buscaMapa: 'Shopping Rural de Tambaba, Conde - PB',
    foto: 'lugares/shopping-rural-tambaba.jpg',
    credito: { autor: 'Eduardo Ribeiro de Paiva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Shopping_rural_do_assentamento_Tambaba.jpg' },
  },
  {
    id: 'menor-praia-do-brasil',
    nome: 'A menor praia do Brasil',
    cidade: 'Marcélia · Conde',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 20,
    resumo:
      'A Praia de Marcélia, no conjunto de Tambaba, é apontada por moradores como a menor praia do país — uma enseada minúscula entre dois paredões.',
    destaques: ['Curiosidade', 'Enseada minúscula', 'Boa foto'],
    dica: 'Visita-se na mesma parada de Tambaba, a pé pela areia, dependendo da maré. Combine com o Mirante de Tambaba no fim da tarde.',
    buscaMapa: 'Praia de Marcelia, Tambaba, Conde - PB',
    foto: 'praias/marcelia-03.jpg',
  },
  {
    id: 'barra-abiai-passeio',
    nome: 'Barra do Abiaí',
    cidade: 'Pitimbu',
    litoral: 'sul',
    tipo: 'experiencia',
    minutosDeCarro: 35,
    melhorHorario: 'Maré baixa',
    resumo:
      'A foz do rio Abiaí, com coqueiral fechado, clima de vilarejo, água rasa e morna e passeios de barco pelos manguezais.',
    destaques: ['Passeio de barco', 'Manguezais', 'Água rasa e morna'],
    dica: 'Fica no caminho entre Praia Bela e o centro de Pitimbu. Estrutura simples: leve dinheiro em espécie.',
    buscaMapa: 'Barra do Abiai, Pitimbu - PB',
    foto: 'praias/barra-abiai-02.jpg',
  },
];

/* =========================================================================
 * LITORAL NORTE — PASSEIOS de João Pessoa e Cabedelo
 * Bate-volta de um dia: a capital fica a uns 40 minutos pela PB-008.
 * ======================================================================= */

export const passeiosDoNorte: Passeio[] = [
  {
    id: 'farol-cabo-branco',
    nome: 'Farol do Cabo Branco',
    cidade: 'Ponta do Seixas · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 35,
    melhorHorario: 'Começo da manhã ou fim de tarde',
    resumo:
      'O farol sobre a falésia, no ponto mais oriental das Américas, com vista aberta para toda a orla de João Pessoa.',
    destaques: ['Ponto mais oriental das Américas', 'Vista da orla', 'Mirante e caminhada'],
    dica: 'Há mirante e área de caminhada no entorno. Combine com o Aquário Paraíba e o almoço nas peixadas do Seixas.',
    buscaMapa: 'Farol do Cabo Branco, Joao Pessoa - PB',
    foto: 'lugares/farol-cabo-branco.jpg',
    fotoPosicao: '50% 0%',
    credito: { autor: 'Ridiculopathy', licenca: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Apr2024._Cabo_Branco_Lighthouse_aka_Farol_do_Cabo_Branco,_Jo%C3%A3o_Pessoa,_state_of_Para%C3%ADba,_Brazil._02.jpg' },
  },
  {
    id: 'por-do-sol-jacare',
    nome: 'Pôr do sol na Praia do Jacaré',
    cidade: 'Cabedelo',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 55,
    melhorHorario: 'Chegue às 16h',
    resumo:
      'O Bolero de Ravel tocado ao saxofone sobre o rio Paraíba, no fim da tarde — tradição criada por Jurandy do Sax, que toca em uma canoa enquanto o sol se põe. Acontece todos os dias.',
    destaques: ['Bolero de Ravel', 'Jurandy do Sax', 'Beira-rio'],
    dica: 'Chegue por volta das 16h para garantir lugar: dá para assistir da orla, de um dos bares ou de dentro de um catamarã. A orla passou por reformulações nos últimos anos — confira a estrutura atual antes de ir.',
    buscaMapa: 'Praia do Jacare, Cabedelo - PB',
    foto: 'lugares/por-do-sol-jacare.jpg',
    credito: { autor: 'Henrique Martins de Oliveira', licenca: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Por_do_sol_Praia_do_Jacar%C3%A9_-_JP.jpg' },
  },
  {
    id: 'aquario-paraiba',
    nome: 'Aquário Paraíba',
    cidade: 'Praia do Seixas · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 35,
    resumo:
      'Aquário com espécies do litoral paraibano, vizinho à Ponta do Seixas. Programa de meio período, bom para dia de sol forte ou de chuva.',
    destaques: ['Espécies do litoral', 'Meio período', 'Bom com crianças'],
    dica: 'Combine com o Farol do Cabo Branco e o almoço na Peixada do Amor.',
    buscaMapa: 'Aquario Paraiba, Joao Pessoa - PB',
  },
  {
    id: 'bica',
    nome: 'Parque Zoobotânico Arruda Câmara (Bica)',
    cidade: 'Centro · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 45,
    resumo:
      'O zoológico da cidade, dentro de uma área de mata com nascentes — conhecido por todo mundo simplesmente como a Bica. Programa clássico com crianças, e barato.',
    destaques: ['Zoológico', 'Mata e nascentes', 'Programa com crianças'],
    dica: 'Confira o dia de fechamento semanal antes de ir.',
    buscaMapa: 'Parque Zoobotanico Arruda Camara, Joao Pessoa - PB',
  },
  {
    id: 'lagoa',
    nome: 'Parque Solón de Lucena (Lagoa)',
    cidade: 'Centro · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 45,
    melhorHorario: 'Fim de tarde ou noite',
    resumo:
      'A lagoa cercada de palmeiras imperiais, cartão-postal do centro da cidade, com caminhada, pista e feirinha no entorno.',
    destaques: ['Palmeiras imperiais', 'Caminhada', 'Feirinha'],
    dica: 'Bonito à noite, com a iluminação da lagoa.',
    buscaMapa: 'Parque Solon de Lucena, Joao Pessoa - PB',
    foto: 'lugares/lagoa.jpg',
    credito: { autor: 'Zelma Brito', licenca: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Lagoa_-_Parque_Solon_de_Lucena_-_Jo%C3%A3o_Pessoa_-_panoramio.jpg' },
  },
  {
    id: 'mercado-de-artesanato',
    nome: 'Mercado de Artesanato Paraibano',
    cidade: 'Tambaú · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 40,
    melhorHorario: 'Fim de tarde',
    resumo:
      'Artesanato, renda renascença, redes, doces e lembranças da Paraíba, na orla de Tambaú.',
    destaques: ['Renda renascença', 'Redes e doces', 'Lembranças'],
    dica: 'Fácil de encaixar no fim de tarde — bom lugar para comprar presentes de última hora.',
    buscaMapa: 'Mercado de Artesanato Paraibano, Tambau, Joao Pessoa - PB',
  },
  {
    id: 'boulevard-dos-ipes',
    nome: 'Boulevard dos Ipês',
    cidade: 'Polo Turístico Cabo Branco · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 35,
    resumo:
      'Avenida-parque do novo polo turístico da cidade — área nova, em consolidação junto com os empreendimentos do polo.',
    destaques: ['Área nova', 'Polo turístico', 'Passeio ao ar livre'],
    dica: 'Confira o que já está aberto antes de programar a visita.',
    buscaMapa: 'Boulevard dos Ipes, Joao Pessoa - PB',
  },
  {
    id: 'acquai-park',
    nome: 'Acquaí Park',
    cidade: 'Polo Turístico Cabo Branco · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 35,
    resumo:
      'Parque aquático anunciado como um dos maiores do Brasil. Atenção: a inauguração já foi remarcada várias vezes e, até a última atualização deste guia, o parque não havia aberto ao público.',
    destaques: ['Parque aquático', 'Abertura por fases', 'Confirme antes'],
    dica: 'A previsão mais recente falava em abertura por fases, começando por quem comprou passaporte. Confirme se já está em operação antes de incluir no roteiro.',
    buscaMapa: 'Acquai Park, Joao Pessoa - PB',
  },
  {
    id: 'shopping-manaira',
    nome: 'Shopping Manaíra',
    cidade: 'Manaíra · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 45,
    resumo:
      'O shopping da orla, com cinema, praça de alimentação e vista para o mar.',
    destaques: ['Cinema', 'Vista para o mar', 'Dia de chuva'],
    dica: 'Boa alternativa para dia de chuva ou para o fim da noite.',
    buscaMapa: 'Shopping Manaira, Joao Pessoa - PB',
  },
  {
    id: 'shopping-mangabeira',
    nome: 'Shopping Mangabeira',
    cidade: 'Mangabeira · João Pessoa',
    litoral: 'norte',
    tipo: 'passeio',
    minutosDeCarro: 30,
    resumo: 'O shopping da zona sul, grande e completo — o mais perto de quem vem do Conde.',
    destaques: ['Zona sul', 'Grande e completo', 'Perto do Bar do Cabeça'],
    dica: 'Combine com o almoço no Bar do Cabeça, no mesmo bairro.',
    buscaMapa: 'Shopping Mangabeira, Joao Pessoa - PB',
  },
];

/* =========================================================================
 * LITORAL NORTE — BAIRROS da orla, para escolher a praia do dia
 * ======================================================================= */

export const bairros: Passeio[] = [
  {
    id: 'cabo-branco',
    nome: 'Cabo Branco',
    cidade: 'Orla de João Pessoa',
    litoral: 'norte',
    tipo: 'bairro',
    minutosDeCarro: 40,
    melhorHorario: 'Fim de tarde',
    resumo:
      'A orla mais larga da cidade, com calçadão, quiosques e a Nevada do Val — parada obrigatória no fim da tarde.',
    destaques: ['Calçadão', 'Nevada do Val', 'Perto do Farol'],
    dica: 'O calçadão é bom para caminhada e bicicleta. Daqui se chega rápido ao Farol e à Ponta do Seixas.',
    buscaMapa: 'Orla de Cabo Branco, Joao Pessoa - PB',
    foto: 'lugares/cabo-branco.jpg',
    fotoPosicao: '50% 0%',
    credito: { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Trecho_final_da_Avenida_Cabo_Branco,_Jo%C3%A3o_Pessoa_(PB).jpg' },
  },
  {
    id: 'tambau',
    nome: 'Tambaú',
    cidade: 'Orla de João Pessoa',
    litoral: 'norte',
    tipo: 'bairro',
    minutosDeCarro: 40,
    melhorHorario: 'Noite',
    resumo:
      'O coração turístico da cidade: hotéis, bares, restaurantes e o Mercado de Artesanato. Mais movimentado à noite.',
    destaques: ['Bares e restaurantes', 'Mercado de Artesanato', 'Vida noturna'],
    dica: 'Boa base para quem quer tudo a pé.',
    buscaMapa: 'Praia de Tambau, Joao Pessoa - PB',
    foto: 'lugares/tambau.jpg',
    fotoPosicao: '50% 45%',
    credito: { autor: 'Rosanetur', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Orla_da_praia_de_Tamba%C3%BA,_Jo%C3%A3o_Pessoa_(PB).jpg' },
  },
  {
    id: 'manaira',
    nome: 'Manaíra',
    cidade: 'Orla de João Pessoa',
    litoral: 'norte',
    tipo: 'bairro',
    minutosDeCarro: 45,
    melhorHorario: 'Noite',
    resumo:
      'Bairro de orla com vida noturna, restaurantes e a Sorveteria Bona, o clássico do bairro.',
    destaques: ['Sorveteria Bona', 'Vida noturna', 'Shopping Manaíra'],
    dica: 'A Sorveteria Bona é a parada de sobremesa; fica ao lado do Shopping Manaíra.',
    buscaMapa: 'Praia de Manaira, Joao Pessoa - PB',
    foto: 'lugares/manaira.jpg',
    credito: { autor: 'Zelma Brito', licenca: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Bairro_de_Mana%C3%ADra_-_panoramio.jpg' },
  },
  {
    id: 'bessa',
    nome: 'Bessa',
    cidade: 'Orla norte de João Pessoa',
    litoral: 'norte',
    tipo: 'bairro',
    minutosDeCarro: 45,
    resumo:
      'A orla mais tranquila, com bons beach clubs e menos movimento que Tambaú. Piscinas rasas na maré baixa em alguns pontos.',
    destaques: ['Beach clubs', 'Menos movimento', 'Piscinas rasas'],
    dica: 'Boa opção para fugir do trecho mais turístico.',
    buscaMapa: 'Praia do Bessa, Joao Pessoa - PB',
    foto: 'lugares/bessa.jpg',
    fotoPosicao: '50% 90%',
    credito: { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Praia_do_Bessa,_Jo%C3%A3o_Pessoa_(PB).jpg' },
  },
  {
    id: 'cabedelo-historico',
    nome: 'Cabedelo: Dique, Farol e Forte',
    cidade: 'Cabedelo',
    litoral: 'norte',
    tipo: 'bairro',
    minutosDeCarro: 60,
    melhorHorario: 'Fim de tarde',
    resumo:
      'O conjunto histórico da região: o Forte Santa Catarina, do século XVI, na foz do rio Paraíba, o farol e a Prainha do dique.',
    destaques: ['Forte Santa Catarina', 'Farol de Cabedelo', 'Prainha do Dique'],
    dica: 'Combine a visita com a Prainha e o fim de tarde no Jacaré.',
    buscaMapa: 'Forte Santa Catarina, Cabedelo - PB',
  },
];

export const passeios: Passeio[] = [...mirantes, ...experiencias, ...passeiosDoNorte, ...bairros];

export type GrupoDePasseios = {
  tipo: TipoPasseio;
  litoral: Litoral;
  titulo: string;
  descricao: string;
  itens: Passeio[];
};

export const gruposDePasseios: GrupoDePasseios[] = [
  {
    tipo: 'mirante',
    litoral: 'sul',
    titulo: 'Mirantes',
    descricao: `${mirantes.length} vistas do alto, do Mirante do Amor — logo ali — até Tambaba.`,
    itens: mirantes,
  },
  {
    tipo: 'experiencia',
    litoral: 'sul',
    titulo: 'Experiências',
    descricao: `${experiencias.length} programas para preencher os dias entre um mergulho e outro.`,
    itens: experiencias,
  },
  {
    tipo: 'passeio',
    litoral: 'norte',
    titulo: 'Passeios',
    descricao: `${passeiosDoNorte.length} programas em João Pessoa e Cabedelo, do farol ao pôr do sol no Jacaré.`,
    itens: passeiosDoNorte,
  },
  {
    tipo: 'bairro',
    litoral: 'norte',
    titulo: 'Bairros da orla',
    descricao: `${bairros.length} trechos de orla para escolher a praia do dia — e onde comer e passear depois.`,
    itens: bairros,
  },
];

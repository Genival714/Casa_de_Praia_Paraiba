import type { Passo } from '@/components/documento/Passos';
import type { LinhaDaTabela } from '@/components/documento/Tabela';

/* -------------------------------------------------------------------------
 * MANUAL DO POÇO ARTESIANO
 *
 * Documento operacional, para quem já está hospedado. O texto veio do manual
 * impresso — ao alterar, altere nos dois lugares, para que a placa na parede
 * e o site nunca digam coisas diferentes.
 *
 * Os telefones NÃO ficam aqui: vêm de src/data/casa.ts, pelo rodapé.
 * ----------------------------------------------------------------------- */

export const poco = {
  selo: 'Guia rápido do hóspede',
  titulo: 'Poço artesiano',
  subtitulo: 'Como usar e como cuidar. Leva um minuto para ler e evita ficar sem água.',

  introducao:
    'A água desta casa vem de um poço próprio, e não da rede pública. Uma bomba puxa a água do poço e enche a caixa d’água, que abastece torneiras, chuveiros, cozinha e área externa.',

  fluxo: ['Poço', 'Bomba', 'Caixa d’água', 'Torneiras da casa'],

  depoisDoFluxo:
    'Por isso a quantidade de água disponível a qualquer momento é a que está dentro da caixa. Quando ela esvazia, é preciso ligar a bomba e aguardar o reabastecimento.',

  foto: {
    arquivo: 'poco-quadro-de-comando.jpg',
    legenda:
      'Quadro de comando, na parede da área externa. É o único ponto que o hóspede precisa acionar.',
  },

  passos: [
    {
      titulo: 'Mãos e chão secos',
      detalhe: 'Nunca opere o quadro com água no piso ou com as mãos molhadas.',
    },
    { titulo: 'Abra a tampa do quadro', detalhe: 'Com cuidado, sem forçar.' },
    {
      titulo: 'Gire a chave preta para LIGADO',
      detalhe: 'É a chave giratória, no alto do quadro.',
    },
    {
      titulo: 'Feche a tampa',
      detalhe: 'Ela deve ficar sempre fechada, por causa da chuva e da maresia.',
    },
    {
      titulo: 'Confira a água na torneira',
      detalhe: 'Aguarde o tempo de enchimento da caixa.',
    },
  ] satisfies Passo[],

  comoDesligar:
    'Para desligar, gire a chave para a posição de DESLIGADO e feche a tampa.',

  aviso:
    'Espere pelo menos 5 minutos antes de ligar de novo. Ligar e desligar em sequência é a causa mais comum de queima de bomba.',

  sempre: [
    'Tampa do quadro fechada.',
    'Mãos secas para operar.',
    'Feche a torneira externa e enrole a mangueira.',
    'Banho curto: a água é do poço.',
    'Avise ao primeiro sinal de problema.',
  ],

  nunca: [
    'Não mexa em fios, disjuntores ou peças internas.',
    'Não fique ligando e desligando a bomba.',
    'Não jogue água na direção do quadro.',
    'Não deixe a mangueira aberta e esquecida.',
    'Não encha a piscina sem falar com a gente.',
  ],

  problemas: [
    {
      situacao: 'Não sai água nas torneiras',
      acao: 'Confira se a chave está em LIGADO e aguarde encher. Se não resolver, ligue para a gente.',
    },
    {
      situacao: 'A bomba não liga',
      acao: 'Confira a posição da chave. Não abra o quadro por dentro. Ligue para a gente.',
    },
    {
      situacao: 'Barulho forte ou cheiro de queimado',
      acao: 'Desligue a chave, afaste as pessoas e ligue imediatamente. Não toque em fios.',
    },
    {
      situacao: 'O disjuntor desarmou',
      acao: 'Ligue para a gente. Não religue repetidamente: ele desarma para proteger.',
    },
    {
      situacao: 'Água turva, com areia ou cheiro forte',
      acao: 'Feche as torneiras, não use para beber ou cozinhar e ligue para a gente.',
    },
    {
      situacao: 'Poça d’água perto do quadro',
      acao: 'Não se aproxime e ligue imediatamente. Nunca opere o quadro com água no chão.',
    },
  ] satisfies LinhaDaTabela[],

  aguaParaBeber:
    'A água do poço abastece a casa para banho, limpeza e uso geral. Para beber e cozinhar, use o purificador da cozinha ou água mineral.',

  antesDeIrEmbora:
    'Feche todas as torneiras, inclusive a externa. Enrole a mangueira e deixe-a onde a encontrou. Deixe a chave do quadro na posição indicada na chegada, com a tampa fechada. E avise qualquer problema observado, mesmo que já resolvido.',

  mensagemWhatsApp:
    'Olá! Estou hospedado na casa da Praia do Amor e tenho uma dúvida sobre o poço artesiano.',

  chamadaDoRodape: 'Dúvidas sobre o poço, a bomba ou falta de água:',
} as const;

import type { Destaque } from '@/components/documento/Destaques';
import type { ItemDeRegra } from '@/components/documento/GradeDeRegras';
import type { FonteOficial, Lei } from '@/components/documento/BlocoLegal';

/* -------------------------------------------------------------------------
 * REGRAS DA CASA
 *
 * Documento contratual. As regras abaixo integram o Anexo II do contrato de
 * locação — o texto aqui precisa bater com o do contrato, palavra por
 * palavra. Não reescreva para "ficar mais bonito".
 *
 * Os telefones NÃO ficam aqui: vêm de src/data/casa.ts, pelo rodapé.
 * ----------------------------------------------------------------------- */

export const regras = {
  selo: 'Para uma estadia tranquila',
  titulo: 'Regras da Casa',
  subtitulo: 'Casa na Praia do Amor · Loteamento Village · Jacumã · Conde/PB',

  destaques: [
    {
      numero: '8',
      unidade: 'pessoas',
      rotulo: 'Lotação máxima',
      texto:
        'Incluídas crianças de qualquer idade. O limite decorre da estrutura hidráulica e sanitária da casa e não é flexível.',
      tom: 'falesia',
    },
    {
      numero: '22h',
      unidade: 'às 7h',
      rotulo: 'Silêncio obrigatório',
      texto:
        'Som que perturbe a vizinhança é proibido em qualquer horário, inclusive durante o dia.',
      tom: 'mar',
    },
  ] satisfies Destaque[],

  itens: [
    {
      termo: 'Festas e eventos',
      definicao: 'Proibidos. A casa é para hospedagem, não para eventos.',
    },
    { termo: 'Fumo', definicao: 'Proibido em ambientes internos.' },
    {
      termo: 'Visitantes',
      definicao:
        'Não pernoitam e só entram com autorização, sempre dentro do limite de 8 pessoas.',
    },
    { termo: 'Animais', definicao: 'Somente com autorização prévia e escrita.' },
    {
      termo: 'Piscina',
      definicao:
        'Sem salva-vidas. Crianças só com adulto ao lado. Nada de vidro na área molhada. Uso até 22h.',
    },
    {
      termo: 'Mobília',
      definicao: 'Nada sai do lugar nem da casa. Devolver como recebeu.',
    },
    {
      termo: 'Churrasqueira',
      definicao: 'Sempre com adulto responsável. Nunca acender com álcool líquido.',
    },
    {
      termo: 'Lixo e louça',
      definicao: 'Louça lavada e lixo ensacado antes da saída.',
    },
    {
      termo: 'Água',
      definicao:
        'Vem de poço próprio. Banho curto e torneira fechada. Piscina só com autorização.',
    },
    {
      termo: 'Menores',
      definicao:
        'Não é permitida hospedagem de menor desacompanhado ou sem autorização dos pais.',
    },
    {
      termo: 'Sublocação',
      definicao: 'Proibido sublocar, ceder, emprestar ou anunciar a casa.',
    },
    {
      termo: 'Segurança',
      definicao:
        'Portões e janelas trancados quando a casa estiver vazia. Câmeras apenas nas áreas externas.',
    },
  ] satisfies ItemDeRegra[],

  lei: {
    titulo: 'Silêncio não é só educação. É lei.',
    chamada:
      'Perturbar o sossego pode gerar responsabilização penal, ambiental e administrativa, além das multas previstas no contrato de locação.',
    itens: [
      {
        nome: 'Decreto-Lei nº 3.688/1941, art. 42',
        pena: 'Contravenção penal de perturbação do trabalho ou do sossego alheios: prisão simples de 15 dias a 3 meses, ou multa.',
      },
      {
        nome: 'Lei nº 9.605/1998, art. 54',
        pena: 'Crime de poluição, quando o ruído atingir níveis que resultem ou possam resultar em danos à saúde humana: reclusão de 1 a 4 anos e multa. Na forma culposa (§ 1º), detenção de 6 meses a 1 ano e multa.',
      },
      {
        nome: 'Decreto nº 6.514/2008, art. 61',
        pena: 'Infração administrativa ambiental: multa de R$ 5.000,00 a R$ 50.000.000,00, aplicada após laudo técnico do órgão ambiental competente, conforme a dimensão do dano e a gradação do impacto.',
      },
      {
        nome: 'Lei Municipal do Conde/PB nº 1.026/2019',
        pena: 'Código Municipal do Meio Ambiente. A fiscalização e a aplicação das penalidades competem à Secretaria Municipal de Meio Ambiente (SEMAM), sem prejuízo das competências federal e estadual.',
      },
      {
        nome: 'Resolução CONAMA nº 001/1990 e ABNT NBR 10151',
        pena: 'Critérios e limites de emissão de ruído em atividades sociais e recreativas.',
      },
    ] satisfies Lei[],
    fontes: [
      {
        rotulo: 'Lei 9.605/1998',
        url: 'https://www.planalto.gov.br/ccivil_03/leis/l9605.htm',
      },
      {
        rotulo: 'Decreto 6.514/2008',
        url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6514.htm',
      },
      {
        rotulo: 'Lei Municipal 1.026/2019',
        url: 'https://conde.pb.gov.br/wp-content/uploads/2023/03/LEI-No-01026.2019-Sistema-Municipal-do-Meio-Ambiente-os-instrumentos-da-Politica-Municipal-do-Meio-Ambiente-e-a-Politica-Municipal-de-Residuos-Solidos..pdf',
      },
    ] satisfies FonteOficial[],
  },

  descumprimento: {
    titulo: 'O que acontece se a regra não for cumprida',
    texto:
      'As regras acima integram o contrato de locação, no Anexo II. O descumprimento sujeita o hóspede às multas específicas da Cláusula Décima Segunda e, nos casos graves — festa, excesso de lotação, sublocação ou atividade ilícita —, à rescisão imediata, com desocupação em até 2 horas e sem restituição de valores.',
  },

  mensagemWhatsApp:
    'Olá! Estou hospedado na casa da Praia do Amor e tenho uma dúvida sobre as regras da casa.',

  chamadaDoRodape: 'Dúvidas sobre as regras, a reserva ou a casa:',
} as const;

/**
 * GERADO por scripts/fotos-das-praias.py — não edite à mão.
 *
 * Fotos de cada praia, na ordem em que aparecem; a primeira é a capa.
 * Os arquivos ficam em public/fotos/praias/ (e as miniaturas em
 * public/fotos/praias/miniaturas/, com o mesmo nome).
 */
import type { Credito } from '@/lib/creditos';

export const fotosDasPraias: Record<string, readonly string[]> = {
  'areia-vermelha': [
    'areia-vermelha-01.jpg',
    'areia-vermelha-02.jpg',
    'areia-vermelha-03.jpg',
    'areia-vermelha-04.jpg',
  ],
  'barra-abiai': [
    'barra-abiai-01.jpg',
    'barra-abiai-02.jpg',
  ],
  'barra-de-gramame': [
    'barra-de-gramame-01.jpg',
    'barra-de-gramame-02.jpg',
    'barra-de-gramame-03.jpg',
    'barra-de-gramame-04.jpg',
    'barra-de-gramame-05.jpg',
    'barra-de-gramame-06.jpg',
    'barra-de-gramame-07.jpg',
  ],
  'camboinha': [
    'camboinha-01.jpg',
    'camboinha-02.jpg',
  ],
  'carapibus': [
    'carapibus-01.jpg',
    'carapibus-02.jpg',
    'carapibus-03.jpg',
    'carapibus-04.jpg',
    'carapibus-05.jpg',
    'carapibus-06.jpg',
  ],
  'coqueirinho': [
    'coqueirinho-01.jpg',
    'coqueirinho-02.jpg',
    'coqueirinho-03.jpg',
    'coqueirinho-04.jpg',
  ],
  'jacarape': [
    'jacarape-01.jpg',
    'jacarape-02.jpg',
  ],
  'jacuma': [
    'jacuma-01.jpg',
    'jacuma-02.jpg',
  ],
  'marcelia': [
    'marcelia-01.jpg',
    'marcelia-02.jpg',
    'marcelia-03.jpg',
  ],
  'piscinas-da-penha': [
    'piscinas-da-penha-01.jpg',
    'piscinas-da-penha-02.jpg',
  ],
  'piscinas-pitimbu': [
    'piscinas-pitimbu-01.jpg',
    'piscinas-pitimbu-02.jpg',
    'piscinas-pitimbu-03.jpg',
  ],
  'ponta-do-seixas': [
    'ponta-do-seixas-01.jpg',
    'ponta-do-seixas-02.jpg',
    'ponta-do-seixas-03.jpg',
    'ponta-do-seixas-04.jpg',
  ],
  'praia-bela': [
    'praia-bela-01.jpg',
    'praia-bela-02.jpg',
    'praia-bela-03.jpg',
    'praia-bela-04.jpg',
    'praia-bela-05.jpg',
  ],
  'praia-da-penha': [
    'praia-da-penha-01.jpg',
    'praia-da-penha-02.jpg',
    'praia-da-penha-03.jpg',
  ],
  'praia-do-amor': [
    'praia-do-amor-01.jpg',
    'praia-do-amor-02.jpg',
    'praia-do-amor-03.jpg',
    'praia-do-amor-04.jpg',
    'praia-do-amor-05.jpg',
    'praia-do-amor-06.jpg',
    'praia-do-amor-07.jpg',
    'praia-do-amor-08.jpg',
    'praia-do-amor-09.jpg',
  ],
  'praia-formosa': [
    'praia-formosa-01.jpg',
  ],
  'rio-grau': [
    'rio-grau-01.jpg',
    'rio-grau-02.jpg',
    'rio-grau-03.jpg',
    'rio-grau-04.jpg',
  ],
  'tabatinga-ii': [
    'tabatinga-ii-01.jpg',
    'tabatinga-ii-02.jpg',
    'tabatinga-ii-03.jpg',
    'tabatinga-ii-04.jpg',
    'tabatinga-ii-05.jpg',
    'tabatinga-ii-06.jpg',
  ],
  'tambaba': [
    'tambaba-01.jpg',
    'tambaba-02.jpg',
    'tambaba-03.jpg',
    'tambaba-04.jpg',
    'tambaba-05.jpg',
    'tambaba-06.jpg',
    'tambaba-07.jpg',
  ],
};

/** Crédito das fotos de terceiros (as suas não precisam), pelo nome do arquivo gerado. */
export const creditosDasFotos: Record<string, Credito> = {
  'areia-vermelha-01.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Areia_Vermelha,_Cabedelo_(PB).jpg' },
  'areia-vermelha-02.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Areia_Vermelha_-_Cabedelo_(PB).jpg' },
  'areia-vermelha-03.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Parque_Estadual_Marinho_de_Areia_Vermelha_-_Cabedelo_(PB).jpg' },
  'areia-vermelha-04.jpg': { autor: 'CleideIsabel2', licenca: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Parque_estadual_marinho_de_areia_vermelha_03.JPG' },
  'camboinha-01.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:CacioMurilo_PraiaCamboinha_Cabedelo_PB_(26016554527).jpg' },
  'camboinha-02.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:CacioMurilo_01_PraiaCamboinha_Cabedelo_PB_(41537823182).jpg' },
  'jacarape-01.jpg': { autor: 'Matheus Jampa da Silva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Praia_de_Jacarap%C3%AA_em_Jo%C3%A3o_Pessoa.jpg' },
  'jacarape-02.jpg': { autor: 'Matheus Jampa da Silva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Rio_Jacarap%C3%AA_na_Praia_de_Jacarap%C3%AA_em_Jo%C3%A3o_Pessoa,_Para%C3%ADba.jpg' },
  'piscinas-da-penha-01.jpg': { autor: 'Matheus Jampa da Silva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Praia_da_Penha,_em_Jo%C3%A3o_Pessoa,_na_Para%C3%ADba.jpg' },
  'piscinas-da-penha-02.jpg': { autor: 'Matheus Jampa da Silva', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Vista_Panor%C3%A2mica_da_Praia_da_Penha,_em_Jo%C3%A3o_Pessoa,_na_Para%C3%ADba.jpg' },
  'ponta-do-seixas-01.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Fal%C3%A9sia_do_Cabo_Branco,_Jo%C3%A3o_Pessoa_(PB).jpg' },
  'ponta-do-seixas-02.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Piscinas_naturais_do_Seixas,_Jo%C3%A3o_Pessoa_(PB).jpg' },
  'ponta-do-seixas-03.jpg': { autor: 'Marinelson Almeida', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Ponta_do_Seixas_._Parte_mais_Oriental_das_Americas._-_Brasil._Ponta_do_Seixas_in_Para%C3%ADba_is_the_portion_of_land_of_the_three_American_continents_that_advances_most_in_the_Atlantic_Ocean._(31147608160).jpg' },
  'ponta-do-seixas-04.jpg': { autor: 'Marinelson Almeida', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Praia_da_Ponta_do_Seixas_e_Esta%C3%A7%C3%A3o_Cabo_Branco,_Jo%C3%A3o_Pessoa.jpg' },
  'praia-da-penha-01.jpg': { autor: 'Miltextos', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Igreja_da_Penha_-_Escadaria.jpg' },
  'praia-da-penha-02.jpg': { autor: 'A. Júnior', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Praia_da_Penha_-_Jo%C3%A3o_Pessoa,_Para%C3%ADba,_Brasil.jpg' },
  'praia-da-penha-03.jpg': { autor: 'Abdias Jr', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Escadaria_da_Praia_da_Penha_-_Jo%C3%A3o_Pessoa,_Para%C3%ADba,_Brasil_(13761462164).jpg' },
  'praia-formosa-01.jpg': { autor: 'Cacio Murilo/MTur', licenca: 'Domínio público', url: 'https://commons.wikimedia.org/wiki/File:Praia_de_Intermares_-_Cabedelo_(PB).jpg' },
};

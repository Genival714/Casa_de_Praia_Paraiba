"""
Fotos das praias: da pasta de originais para o site.

Como usar
---------
1. Jogue as fotos em `Imagens das Praias/`, na raiz do projeto, com o nome da
   praia no arquivo — "Praia Bela.jpg", "Praia Bela (2).jpg", "Praia Bela (3).jpg"…
   A numeração do Windows já serve.
2. Rode, na raiz do projeto:

       python scripts/fotos-das-praias.py

3. Rode `npm run github-pages` e publique.

O que ele faz
-------------
- Reduz cada foto para no máximo 1600 px no lado maior (é o que o visor em
  tela cheia usa) e grava em `public/fotos/praias/<id>-<n>.jpg`.
- Faz uma miniatura de 480 px para os cartões e chips, em
  `public/fotos/praias/miniaturas/`. Com miniatura, a lista de praias carrega
  uns 30 KB por foto em vez de 150.
- Tira tarjas pretas de foto "letterbox".
- Escreve `src/data/fotosDasPraias.ts` — a lista de fotos de cada praia, que
  o cadastro em `src/data/praias.ts` lê sozinho. Não edite esse arquivo à
  mão: ele é regravado a cada rodada.

Para escolher a capa de uma praia (a primeira foto), acrescente o nome do
arquivo em CAPAS aqui embaixo. Sem escolha, vale a ordem dos nomes.

Foto que não é sua (Wikimedia Commons, banco de imagens) precisa de crédito:
acrescente o arquivo em CREDITOS, com autor, licença e endereço da fonte. O
site mostra "Foto: autor · licença" em cima da foto, com link para a fonte —
é o que as licenças Creative Commons pedem.

Precisa do Python 3 com a biblioteca Pillow (`pip install pillow`).
"""

from __future__ import annotations

import re
import shutil
import sys
import unicodedata
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:  # pragma: no cover
    sys.exit("Falta a biblioteca Pillow. Instale com:  pip install pillow")

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAIS = RAIZ / "Imagens das Praias"
DESTINO = RAIZ / "public" / "fotos" / "praias"
MINIATURAS = DESTINO / "miniaturas"
DADOS = RAIZ / "src" / "data" / "fotosDasPraias.ts"

LADO_MAIOR = 1600
LADO_MINIATURA = 480
QUALIDADE = 80
QUALIDADE_MINIATURA = 74

# Como o nome do arquivo (sem número, sem acento, minúsculo) vira o `id` de
# src/data/praias.ts. Praia nova? Acrescente uma linha.
PRAIAS = {
    "barra de gramame": "barra-de-gramame",
    "barra do abiai": "barra-abiai",
    "coqueirinho": "coqueirinho",
    "piscinas naturais de pitimbu": "piscinas-pitimbu",
    "praia bela": "praia-bela",
    "praia de carapibus": "carapibus",
    "praia de jacuma": "jacuma",
    "praia de marcelia": "marcelia",
    "praia de tambaba": "tambaba",
    "praia do amor": "praia-do-amor",
    "rio grau": "rio-grau",
    "tabatinga": "tabatinga-ii",
    "tabatinga i": "tabatinga-i",
    "maceiozinho": "maceiozinho",
    # Litoral Norte
    "praia de jacarape": "jacarape",
    "praia da penha": "praia-da-penha",
    "ponta do seixas": "ponta-do-seixas",
    "piscinas da penha": "piscinas-da-penha",
    "areia vermelha": "areia-vermelha",
    "praia formosa": "praia-formosa",
    "camboinha": "camboinha",
    "praia do sol": "praia-do-sol",
    "ponta de campina": "ponta-de-campina",
    "praia do poco": "praia-do-poco",
    "dique de cabedelo": "dique-de-cabedelo",
}

# A capa de cada praia — a foto que aparece grande no cartão e no chip.
CAPAS = {
    "barra-de-gramame": "Barra de Gramame (7).jpg",
    "barra-abiai": "Barra do abiai (2).jpg",
    "coqueirinho": "Coqueirinho.jpg",
    "piscinas-pitimbu": "Piscinas Naturais de Pitimbu (2).jpg",
    "praia-bela": "Praia Bela (3).jpg",
    "carapibus": "Praia de Carapibus (6).jpg",
    "jacuma": "Praia de Jacumã (2).jpg",
    "marcelia": "Praia de Marcelia.jpg",
    "tambaba": "Praia de Tambaba (5).jpg",
    "praia-do-amor": "Praia do Amor (8).jpg",
    "rio-grau": "Rio Graú (4).jpg",
    "tabatinga-ii": "tabatinga 2.jpg",
}

# Fotos pequenas demais para o visor em tela cheia (ficariam borradas).
EXCLUIR = {
    "Piscinas Naturais de Pitimbu (3).jpg",  # 300 × 300
    "Praia de Jacumã.jpg",  # 335 × 597
}

# Acima disso, um JPEG que já está no tamanho é recomprimido mesmo assim.
LEVE_O_BASTANTE = 450_000

# Fotos de terceiros: nome do arquivo em `Imagens das Praias/` → (autor,
# licença, endereço da fonte). As fotos do Ministério do Turismo são de
# domínio público com crédito obrigatório ao fotógrafo.
CREDITOS = {
    "Areia Vermelha.jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Areia_Vermelha,_Cabedelo_(PB).jpg"),
    "Areia Vermelha (2).jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Areia_Vermelha_-_Cabedelo_(PB).jpg"),
    "Areia Vermelha (3).jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Parque_Estadual_Marinho_de_Areia_Vermelha_-_Cabedelo_(PB).jpg"),
    "Areia Vermelha (4).jpg": ("CleideIsabel2", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Parque_estadual_marinho_de_areia_vermelha_03.JPG"),
    "Camboinha.jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:CacioMurilo_PraiaCamboinha_Cabedelo_PB_(26016554527).jpg"),
    "Camboinha (2).jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:CacioMurilo_01_PraiaCamboinha_Cabedelo_PB_(41537823182).jpg"),
    "Praia de Jacarapé.jpg": ("Matheus Jampa da Silva", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Praia_de_Jacarap%C3%AA_em_Jo%C3%A3o_Pessoa.jpg"),
    "Praia de Jacarapé (2).jpg": ("Matheus Jampa da Silva", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Rio_Jacarap%C3%AA_na_Praia_de_Jacarap%C3%AA_em_Jo%C3%A3o_Pessoa,_Para%C3%ADba.jpg"),
    "Piscinas da Penha.jpg": ("Matheus Jampa da Silva", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Praia_da_Penha,_em_Jo%C3%A3o_Pessoa,_na_Para%C3%ADba.jpg"),
    "Piscinas da Penha (2).jpg": ("Matheus Jampa da Silva", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Vista_Panor%C3%A2mica_da_Praia_da_Penha,_em_Jo%C3%A3o_Pessoa,_na_Para%C3%ADba.jpg"),
    "Ponta do Seixas.jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Fal%C3%A9sia_do_Cabo_Branco,_Jo%C3%A3o_Pessoa_(PB).jpg"),
    "Ponta do Seixas (2).jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Piscinas_naturais_do_Seixas,_Jo%C3%A3o_Pessoa_(PB).jpg"),
    "Ponta do Seixas (3).jpg": ("Marinelson Almeida", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Ponta_do_Seixas_._Parte_mais_Oriental_das_Americas._-_Brasil._Ponta_do_Seixas_in_Para%C3%ADba_is_the_portion_of_land_of_the_three_American_continents_that_advances_most_in_the_Atlantic_Ocean._(31147608160).jpg"),
    "Ponta do Seixas (4).jpg": ("Marinelson Almeida", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Praia_da_Ponta_do_Seixas_e_Esta%C3%A7%C3%A3o_Cabo_Branco,_Jo%C3%A3o_Pessoa.jpg"),
    "Praia da Penha.jpg": ("Miltextos", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Igreja_da_Penha_-_Escadaria.jpg"),
    "Praia da Penha (2).jpg": ("A. Júnior", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Praia_da_Penha_-_Jo%C3%A3o_Pessoa,_Para%C3%ADba,_Brasil.jpg"),
    "Praia da Penha (3).jpg": ("Abdias Jr", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Escadaria_da_Praia_da_Penha_-_Jo%C3%A3o_Pessoa,_Para%C3%ADba,_Brasil_(13761462164).jpg"),
    "Praia Formosa.jpg": ("Cacio Murilo/MTur", "Domínio público", "https://commons.wikimedia.org/wiki/File:Praia_de_Intermares_-_Cabedelo_(PB).jpg"),
}


def sem_acento(texto: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", texto) if not unicodedata.combining(c))


def nome_da_praia(arquivo: Path) -> str:
    """'Praia de Tambaba (3).jpg' → 'praia de tambaba'; 'tabatinga 2.jpg' → 'tabatinga'."""
    nome = sem_acento(arquivo.stem).lower().strip()
    nome = re.sub(r"\s*\(\d+\)\s*$", "", nome)
    nome = re.sub(r"\s+\d+$", "", nome)
    return re.sub(r"\s+", " ", nome)


def numero_no_nome(arquivo: Path) -> int:
    """Para ordenar: 'Foto.jpg' é a 1, 'Foto (2).jpg' é a 2, 'foto 2.jpg' também."""
    m = re.search(r"\((\d+)\)\s*$", arquivo.stem) or re.search(r"\s(\d+)$", arquivo.stem)
    return int(m.group(1)) if m else 1


def sem_tarjas(imagem: Image.Image) -> Image.Image:
    """Corta tarjas pretas nas quatro bordas (foto tirada de vídeo, por exemplo)."""
    cinza = imagem.convert("L")
    largura, altura = cinza.size
    pixels = cinza.load()

    def linha_escura(y: int) -> bool:
        return sum(pixels[x, y] for x in range(0, largura, 4)) / (largura / 4) < 18

    def coluna_escura(x: int) -> bool:
        return sum(pixels[x, y] for y in range(0, altura, 4)) / (altura / 4) < 18

    topo, base, esquerda, direita = 0, altura, 0, largura
    while topo < altura // 3 and linha_escura(topo):
        topo += 1
    while base > altura * 2 // 3 and linha_escura(base - 1):
        base -= 1
    while esquerda < largura // 3 and coluna_escura(esquerda):
        esquerda += 1
    while direita > largura * 2 // 3 and coluna_escura(direita - 1):
        direita -= 1
    if (topo, base, esquerda, direita) == (0, altura, 0, largura):
        return imagem
    return imagem.crop((esquerda, topo, direita, base))


def ts(texto: str) -> str:
    """Texto entre aspas simples, do jeito que o TypeScript espera."""
    return "'" + texto.replace("\\", "\\\\").replace("'", "\\'") + "'"


def reduzir(imagem: Image.Image, lado: int) -> Image.Image:
    copia = imagem.copy()
    copia.thumbnail((lado, lado), Image.LANCZOS)
    return copia


def main() -> None:
    if not ORIGINAIS.is_dir():
        sys.exit(f"Não achei a pasta de originais: {ORIGINAIS}")

    arquivos = sorted(
        (a for a in ORIGINAIS.iterdir() if a.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}),
        key=lambda a: (nome_da_praia(a), numero_no_nome(a)),
    )

    por_praia: dict[str, list[Path]] = {}
    ignorados: list[str] = []
    for arquivo in arquivos:
        if arquivo.name in EXCLUIR:
            continue
        praia = PRAIAS.get(nome_da_praia(arquivo))
        if not praia:
            ignorados.append(arquivo.name)
            continue
        por_praia.setdefault(praia, []).append(arquivo)

    # A capa vai para a frente.
    for praia, lista in por_praia.items():
        capa = CAPAS.get(praia)
        if capa:
            lista.sort(key=lambda a: 0 if a.name == capa else 1)

    # Recomeça do zero, para a numeração não acumular restos de rodadas antigas.
    if DESTINO.exists():
        shutil.rmtree(DESTINO)
    MINIATURAS.mkdir(parents=True)

    gerado: dict[str, list[str]] = {}
    creditos: dict[str, tuple[str, str, str]] = {}
    total_kb = 0
    for praia, lista in sorted(por_praia.items()):
        nomes: list[str] = []
        for indice, origem in enumerate(lista, start=1):
            with Image.open(origem) as im:
                im = ImageOps.exif_transpose(im).convert("RGB")
                cortada = sem_tarjas(im)
                nome = f"{praia}-{indice:02d}.jpg"
                ja_esta_leve = origem.stat().st_size <= LEVE_O_BASTANTE
                if cortada is im and origem.suffix.lower() in {".jpg", ".jpeg"} and max(im.size) <= LADO_MAIOR and ja_esta_leve:
                    # Já está no tamanho e leve: copia intacto, sem recomprimir JPEG em cima de JPEG.
                    shutil.copyfile(origem, DESTINO / nome)
                else:
                    reduzir(cortada, LADO_MAIOR).save(DESTINO / nome, "JPEG", quality=QUALIDADE, optimize=True, progressive=True)
                reduzir(cortada, LADO_MINIATURA).save(MINIATURAS / nome, "JPEG", quality=QUALIDADE_MINIATURA, optimize=True)
                total_kb += (DESTINO / nome).stat().st_size // 1024
                nomes.append(nome)
                if origem.name in CREDITOS:
                    creditos[nome] = CREDITOS[origem.name]
        gerado[praia] = nomes
        print(f"{praia:20s} {len(nomes):2d} fotos  (capa: {lista[0].name})")

    linhas = [
        "/**",
        " * GERADO por scripts/fotos-das-praias.py — não edite à mão.",
        " *",
        " * Fotos de cada praia, na ordem em que aparecem; a primeira é a capa.",
        " * Os arquivos ficam em public/fotos/praias/ (e as miniaturas em",
        " * public/fotos/praias/miniaturas/, com o mesmo nome).",
        " */",
        "import type { Credito } from '@/lib/creditos';",
        "",
        "export const fotosDasPraias: Record<string, readonly string[]> = {",
    ]
    for praia, nomes in gerado.items():
        linhas.append(f"  '{praia}': [")
        for nome in nomes:
            linhas.append(f"    '{nome}',")
        linhas.append("  ],")
    linhas.append("};")
    linhas.append("")
    linhas.append("/** Crédito das fotos de terceiros (as suas não precisam), pelo nome do arquivo gerado. */")
    linhas.append("export const creditosDasFotos: Record<string, Credito> = {")
    for nome, (autor, licenca, url) in creditos.items():
        linhas.append(f"  '{nome}': {{ autor: {ts(autor)}, licenca: {ts(licenca)}, url: {ts(url)} }},")
    linhas.append("};")
    linhas.append("")
    DADOS.write_text("\n".join(linhas), encoding="utf-8", newline="\n")

    print(f"\n{sum(len(n) for n in gerado.values())} fotos, {total_kb / 1024:.1f} MB em tamanho grande.")
    print(f"Lista gravada em {DADOS.relative_to(RAIZ)}")
    if ignorados:
        print("\nNão reconheci a praia destes arquivos (acrescente em PRAIAS):")
        for nome in ignorados:
            print("  -", nome)


if __name__ == "__main__":
    main()

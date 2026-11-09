import type { Step } from '../types';
import { k, narr, nac, pepa, pek } from './dsl';

/** Úvod: kancelář, volba, cesta autem. Končí vstupem do průzkumu na náměstí. */
export const intro: Step[] = [
  { bg: 'office' },
  narr(
    'Okresní služebna, rok 1999. Za oknem prší, na stole stojí drátový telefon a v koutě dosychá kytka, kterou nikdo nezalil od revoluce.',
  ),
  nac('Patriku, sedněte si. Omlouvám se, ale nemám z čeho platit policajty.'),
  k('Šéfe, já myslel, že mi konečně přidáte.'),
  nac('Přidám vám, až nám přibude rozpočet. A abych byl upřímný, vy děláte doslova úplný nic.'),
  k('To není pravda. Minulý týden jsem posunul tu kytku blíž k oknu.'),
  nac('Ta kytka je mrtvá, Patriku. Už od úterý.'),
  narr('RIIIIING! Drátový telefon se rozcinká tak hlasitě, že se z lustru snese prach.', {
    say: 'Drátový telefon se rozcinká tak hlasitě, že se z lustru snese prach.',
    sfx: 'ring',
  }),
  nac('Haló? … Cože? … Ano. … Hm.'),
  { who: 'telefon', text: 'Pane náčelníku, v Brdýmově někdo ukradl obří železný rohlík! Říká se, že je v něm zlato a diamanty!' },
  nac('Mhm… no… jo… (zamumlá cosi a položí sluchátko)', { say: 'Mhm… no… jo…' }),
  nac('Tak. Další policajty nemám. A tohle je vaše poslední šance, Patriku.'),
  nac('Tak co? Pojedete tam?'),
  {
    choice: [
      {
        label: 'Asi ne, díky.',
        steps: [
          nac('Dobře. Tak mi zbývá jediné. Máte padáka.', { sfx: 'sad' }),
          { bg: 'trash' },
          narr(
            'Skončil jsi v koši. Ale s pohovkou, televizí a kýblem sody. Žiješ si tam super život až do konce. Brdýmov se nikdy nedozví, co se stalo s rohlíkem. A náčelník taky ne, protože do koše nechodí pošta.',
          ),
          { end: 'bad' },
        ],
      },
      {
        label: 'No… stejně nemám na výběr.',
        steps: [
          nac('To jsem rád. Auto je před služebnou. Nezapomeňte natankovat. Nebo ne, na to taky nemám.'),
          k('A kolik v něm je benzínu?'),
          nac('Tak na půl cesty. Tam, nebo zpátky, to si vyberte sám.'),
          { bg: 'car' },
          narr(
            'Jedeš tři hodiny služebním autem. Smrdí v něm uzeninou, protože si tam minulý týden někdo zapomněl řízky. Za okny se střídají louky, pole a billboardy na pivo.',
          ),
          k('Jestli ještě jednou ucítím tu uzeninu, vystoupím za jízdy.'),
          narr(
            'Rádio hraje už dvě hodiny tu samou polku. Patrik pomalu přestává rozlišovat, jestli ji slyší, nebo si ji jen pamatuje.',
          ),
          { bg: 'square' },
          narr(
            'Brdýmov. Na náměstí stojí prázdný betonový podstavec a okolo něj se tlačí zvědavci. Mezi nimi stařenka, která tvrdí, že všechno viděla, ale neví co.',
            { sfx: 'chime' },
          ),
          k('No nazdar. Teď se uvidí, jestli jsem tak k ničemu, jak říkal šéf.'),
          narr(
            'Od teď se po městě pohybuješ sám. Dole vyber, co chceš dělat: Prohlédnout, Mluvit nebo Použít, a klikej na věci ve scéně. Předměty z kapsy vybereš kliknutím a použiješ je kliknutím na věc.',
            { silent: true },
          ),
          { go: 'square' },
        ],
      },
    ],
  },
];

/** Stažení plachty a přiznání Pepy. */
export const reveal: Step[] = [
  narr('Stáhneš plachtu. Pod ní se leskne obří železný rohlík, v měřítku jedna ku jedné.', { sfx: 'chime' }),
  { set: 'rohlik_nalezen' },
  { go: 'zbrojnice' },
  k('Mám tě. Tak tady ses schovával.'),
  narr('Za zády zaskřípou vrata. Dovnitř vejde Pepa a v ruce nese sáček s rohlíky. Obyčejnými, naštěstí.'),
  pepa('Patriku… vy jste ho našel.'),
  k('Pepo. Vysvětlete mi to.'),
  pepa('Já ho nechtěl ukrást. Já ho chtěl zachránit.'),
  pepa('Na poště jsem zaslechl, jak starosta volá do šrotu. Prodá ho! Za dvanáct tisíc! Rohlík, který stavěl můj děda s pekařem!'),
  pepa('V noci jsem vyjel s Tatrou a odvezl ho. Dvě hodiny jsem couval do vrat. Dvakrát jsem se zasekl o hydrant.'),
  k('A nikomu jste to neřekl?'),
  pepa('Komu? Starosta by mi ho zabavil a šrot by ho rozřezal na kolejnice. A policie… policie v Brdýmově nikdy nebyla. Až dneska.'),
  k('Existuju i v pondělí.'),
  pepa('Jestli mě chcete zatknout, tak ať. Jen ten rohlík nenechte skončit v pile.'),
  { set: 'pepa_priznal' },
  narr('Pepa si sedne na hasičskou helmu a mlčí. Rohlík se leskne. Na jeho spodku je plechový poklopec s nýty.'),
];

/** Závěrečná volba: vrátit rohlík, nebo zatknout Pepu. */
export const finale: Step[] = [
  k('Rozhodnutí je na mně.'),
  {
    choice: [
      {
        label: 'Pepo, vrátíme ho na podstavec a nikdo se nic nedozví.',
        steps: [
          { bg: 'square' },
          narr(
            'Příští ráno stojí rohlík zpátky na podstavci. Nikdo neví, jak se tam dostal. Starosta zbledne, když si přečte dopis, a od šrotu odstoupí.',
          ),
          narr(
            'Pekárna se znovu otevře a Brdýmov začne prodávat Zlatý rohlík podle receptu z dopisu. Za tři měsíce zaplatí všechny upomínky a koupí si i novou ceduli u vjezdu.',
          ),
          { bg: 'office' },
          nac('Patriku! Slyšel jsem, že se v Brdýmově něco stalo s rohlíkem.'),
          k('Nic se nestalo, šéfe. Vlastně se všechno vyřešilo.'),
          nac('Nic se nestalo! To je přesně ten typ policejní práce, který chci! Máte přidáno. Dvacet korun.'),
          k('Měsíčně?'),
          nac('Jednorázově. Ale s láskou.'),
          { end: 'mercy' },
        ],
      },
      {
        label: 'Pepo, musím vás zatknout.',
        steps: [
          { bg: 'square' },
          narr(
            'Pepa odejde do cely bez odporu, jen smutně a se sáčkem rohlíků. Rohlík mezitím skončí stejně ve šrotu, protože starosta se ho vydá prodat podruhé.',
          ),
          narr('Brdýmov se na tebe zlobí. Nikdo ti neprodá rohlík, pivo ani lístek na vlak.'),
          { bg: 'office' },
          nac('Vyřešeno! Výborně, Patriku! Máte přidáno. Vlastně ne, to jsem si spletl s někým jiným.'),
          k('Aspoň jsem případ vyřešil.'),
          nac('To je pravda. A jen kvůli tomu vás nevyhodím. Tentokrát.'),
          { end: 'arrest' },
        ],
      },
    ],
  },
];

/** Otevření poklopce průkazem, čtení dopisu a závěrečná volba. */
export const capsule: Step[] = [
  narr('Služební průkaz zajede do škvíry. Cvak. Poklopec povolí.'),
  k('Konečně jsem ho k něčemu použil. Tedy průkaz.'),
  { give: 'dopis' },
  narr('Uvnitř leží plechová krabička a v ní požloutlý dopis. Patrik ho nahlas přečte.'),
  pek('Milí Brdýmovští. Pokud tohle čtete, někdo rohlík otevřel. Doufám, že ne pilou.'),
  pek('Pověst o zlatu a diamantech jsem vymyslel já, abyste na rohlík dávali pozor. Poklad je jinde.'),
  pek(
    'Poklad je v těstě. Přikládám recept na brdýmovský rohlík, kvůli kterému k nám jezdili lidé z celého kraje, než zavřeli pekárnu.',
  ),
  pek('Jen nedávejte do těsta margarín. Margarín je zrada. Váš Ladislav Brdýmovský, pekař.'),
  pek('P. S. Kdyby nás někdo chtěl dát do šrotu, ať se nejdřív vyspí.'),
  pepa('Poklad je těsto. Můj děda to věděl. Celý život mlčel.'),
  k('Takže zlato a diamanty…'),
  pepa('Jsou v mouce.'),
  ...finale,
];

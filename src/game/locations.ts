import type { Location } from '../types';
import { reveal, capsule, finale } from './story';
import { k, narr, pepa, say, stam, loj, flag, noflag, has, hasnt, allOf } from './dsl';

/**
 * Souřadnice hotspotů jsou ve scéně 640 x 360. Kreslené scény (src/bg/*.ts a
 * square2 v backgrounds.ts) musí odpovídající objekty kreslit v těchto obdélnících.
 */

const back = (go: string, name: string, rect: [number, number, number, number] = [580, 110, 60, 210]) => ({ id: `vychod_${go}`, name, rect, go });

export const locations: Record<string, Location> = {
  /* ---------------------------------------------------------------- */
  square: {
    id: 'square',
    name: 'Náměstí',
    bg: 'square2',
    enter: [
      pepa('Dobrý den! Vy budete ten z okresu? Já jsem Pepa. Školník, pošťák a dobrovolný hasič. V Brdýmově je lidí málo, tak jsme všichni všechno.'),
      k('Patrik. Detektiv. Hledám rohlík.'),
      pepa('Chacha, ten hledáme všichni. Ukážu vám to tu. Kdybyste něco potřeboval, ptejte se mě.'),
    ],
    hotspots: [
      {
        id: 'podstavec',
        name: 'Podstavec',
        rect: [238, 198, 164, 76],
        look: [
          k('Prázdný betonový podstavec. Na něm „ROHLÍK 1957“, kolem policejní páska a rozmrzelí čumilové.'),
          { when: noflag('utrzek_nalezen'), then: [k('Pod podstavcem něco vykukuje.')] },
        ],
        use: [
          {
            when: noflag('utrzek_nalezen'),
            then: [
              k('Prohledám okolí podstavce.'),
              { give: 'utrzek' },
              { set: 'utrzek_nalezen' },
              k('Zmačkaný lístek. „Kovošrot Brdýmov, odvoz v 5:00, podpis: P.“'),
              k('Šrot? Někdo chtěl rohlík prodat do šrotu.'),
            ],
            else: [k('Už jsem tu hledal. Víc než prach tu není.')],
          },
        ],
        talk: [k('Podstavec mi na nic neodpoví. Zkoušel jsem to už dřív u jiných lidí a bylo to stejné.')],
      },
      {
        id: 'kostel',
        name: 'Kostel',
        rect: [296, 8, 48, 150],
        look: [k('Kostel s věží a hodinami, které ukazují špatný čas. Správný čas ukazují dvakrát denně a stejně jim nikdo nevěří.')],
        use: [k('Na věž lézt nebudu. Mám strach z výšek a z kněží, kteří se ptají, proč jsem tam nebyl v neděli.')],
      },
      {
        id: 'starenka',
        name: 'Stařenka',
        rect: [96, 200, 52, 138],
        look: [k('Stařenka v šátku. Tváří se, že ví víc než policie.')],
        talk: [{ talk: 'starenka' }],
        use: [k('Na důchodkyně nesahám. Jsou rychlejší, než vypadají.')],
      },
      {
        id: 'kluk',
        name: 'Kluk',
        rect: [146, 232, 36, 96],
        look: [k('Kluk v kšiltovce. Zírá na mě, jako bych byl ufon v kabátě.')],
        talk: [
          say('kluk', 'Pane, vy jste policajt?'),
          k('Jo.'),
          say('kluk', 'A chytíte ho?'),
          k('Koho?'),
          say('kluk', 'Rohlíka.'),
        ],
        use: [k('Kluka neberu. Jemu je osm a mně pětatřicet.')],
      },
      {
        id: 'pepa',
        name: 'Pepa',
        rect: [224, 198, 58, 156],
        look: [k('Pepa. Zadýchaný, usměvavý, v modrém plášti a s pošťáckou čepicí. Vypadá jako někdo, kdo ví o všem a nikdy neřekne špatné slovo.')],
        talk: [{ talk: 'pepa' }],
        use: [pepa('Hej, to je moje rameno! Ale díky, že jste si ho všiml.')],
      },
      {
        id: 'statkar',
        name: 'Statkář',
        rect: [466, 200, 70, 140],
        look: [k('Statkář se slamákem a plnovousem. Plnovous má větší než slamák.')],
        talk: [
          say('statkar', 'Já nic. Já krávy.'),
          k('Vás jsem se ještě na nic neptal.'),
          say('statkar', 'Tak ať to tak zůstane.'),
        ],
        use: [k('Statkáře radši ne. Má ruce jako lopaty a pravděpodobně i lopatu.')],
      },
      {
        id: 'zena',
        name: 'Paní s dlouhými vlasy',
        rect: [580, 204, 56, 138],
        look: [k('Paní s dlouhými vlasy a smutným výrazem. Možná zrovna mluvila o rohlíku, možná o manželovi.')],
        talk: [
          say('zena', 'V noci jsem slyšela, jak něco cinká. Jako řetězy.'),
          k('Cinká?'),
          say('zena', 'Jako když někdo vozí v noci nábytek. Nebo kombajn.'),
        ],
        use: [k('Radši ne. Má vlasy až k pasu a já jsem v práci.')],
      },
      {
        id: 'cedule',
        name: 'Cesta ke sběrateli',
        rect: [6, 258, 40, 80],
        go: 'dvur',
        look: [k('Ukazatel: „Ctibor Kocour – sběratel →“. Pod tím někdo nasprejoval: „Pozor, pes.“')],
      },
      {
        id: 'door_hospoda',
        name: 'Hospoda U Rohlíku',
        rect: [50, 210, 36, 52],
        go: 'hospoda',
      },
      {
        id: 'door_trafika',
        name: 'Trafika',
        rect: [192, 210, 36, 52],
        go: 'trafika',
      },
      {
        id: 'door_zbrojnice',
        name: 'Hasičská zbrojnice',
        rect: [414, 210, 36, 52],
        go: 'zbrojnice',
        gate: {
          ok: has('klic'),
          fail: [
            k('Zamčeno. Na vratech visí cedulka „HASIČI – NEPŮJČOVAT“. Klíč nemám.'),
            { when: flag('zna_mesto'), then: [k('Pepa říkal, že tam stejně nic zajímavého není.')] },
          ],
        },
      },
      {
        id: 'door_urad',
        name: 'Obecní úřad',
        rect: [549, 210, 36, 52],
        go: 'urad',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  hospoda: {
    id: 'hospoda',
    name: 'Hospoda U Rohlíku',
    bg: 'hospoda',
    enter: [narr('Hospoda U Rohlíku. Nad barem visí cedule: „Rohlíky u nás nemáme od roku 1957.“')],
    hotspots: [
      {
        id: 'stamgasti',
        name: 'Štamgasti',
        rect: [50, 150, 200, 180],
        look: [k('Tři štamgasti: Franta, Standa a pán, jehož jméno nikdo nezná, ani on sám.')],
        talk: [
          {
            when: flag('svedci'),
            then: [stam('Už jsme vám řekli všechno. Nechte nás, ať se můžeme zase zapomenout.')],
            else: [
              stam('Bylo to červený auto.'),
              stam('Ne, zelený!'),
              stam('Já myslel, že to bylo prase.'),
              k('Takhle to nepůjde. Potřebuju je nějak probrat.'),
            ],
          },
        ],
        use: [k('Štamgasty nebudu třást. Mohla by ze mě být pěna.')],
        item: {
          kava: [
            k('Pánové, černá káva. Pěkně horká.'),
            stam('Co to je?'),
            k('Něco jako pivo, jenom tmavší a bez pěny.'),
            { take: 'kava' },
            stam('Aha… ono to nebylo prase.'),
            stam('Bylo to velký auto. S modrým majáčkem a se žebříkem, co cinkal.'),
            stam('A smrdělo to kouřem. A pivem. Ale to bylo asi z nás.'),
            k('Modrý majáček a žebřík. Hasičské auto?'),
            stam('Může být. Nebo kombajn.'),
            { set: 'svedci' },
            k('Už jsou střízliví. Škoda, že jim to vydrží tak do oběda.'),
          ],
        },
      },
      {
        id: 'hospodsky',
        name: 'Hospodský Lojza',
        rect: [270, 120, 110, 170],
        look: [k('Hospodský Lojza. Tlustý, plešatý a v bílé zástěře, kterou už dávno nikdo nepral.')],
        talk: [{ talk: 'lojza' }],
        use: [loj('Pokud chcete pivo, tak řekněte, ne se mě dotýkejte.')],
      },
      {
        id: 'tabule',
        name: 'Tabule s jídelním lístkem',
        rect: [440, 50, 130, 100],
        look: [k('Pivo 9 Kč. Párek 7 Kč. Řízek: dnes ne. Rohlík: zadarmo, přeškrtnuto.')],
        use: [k('Křídu na tabuli nepřepisuju. Ještě bych tam napsal něco pravdivého.')],
      },
      {
        id: 'pipy',
        name: 'Výčep',
        rect: [390, 170, 90, 80],
        look: [k('Výčep. Z jednoho kohoutku kape pivo, z druhého pivo a ze třetího něco, co už pivem snad ani není.')],
        use: [loj('Pivo ve službě? Tak to bych nedoporučoval. Ani mně.')],
      },
      back('square', 'Ven na náměstí'),
    ],
  },

  /* ---------------------------------------------------------------- */
  trafika: {
    id: 'trafika',
    name: 'Trafika',
    bg: 'trafika',
    enter: [narr('Trafika paní Dvořáčkové. Noviny, bonbóny a pochybné informace.')],
    hotspots: [
      {
        id: 'pani',
        name: 'Paní Dvořáčková',
        rect: [250, 110, 130, 180],
        look: [k('Paní Dvořáčková. Brýle, drdol a výraz člověka, který právě něco zaslechl a už to nemůže nikomu neříct.')],
        talk: [{ talk: 'pani' }],
        use: [say('pani', 'No dovolte! Tohle si nechte pro své kolegy.')],
      },
      {
        id: 'kavovar',
        name: 'Kávovar',
        rect: [460, 150, 100, 120],
        look: [k('Starý kávovar. Cedulka: „KÁVA 20 Kč. PRO ŠTAMGASTY I STAROSTU.“')],
        use: [
          {
            when: has('kava'),
            then: [k('Jednu kávu už mám. Víc bych si nemohl dovolit.')],
            else: [k('Bez dvacky ani cinknutí.')],
          },
        ],
        item: {
          koruna: [
            k('Kávu za dvacku. Aspoň někdo mi dá víc než šéf.'),
            { take: 'koruna' },
            { give: 'kava' },
            narr('Kávovar zachrčí, zakašle a vyplivne hustou černou tekutinu.', { silent: true }),
          ],
        },
      },
      {
        id: 'noviny',
        name: 'Stojan s novinami',
        rect: [40, 60, 170, 200],
        look: [k('Titulky: „ROHLÍK PRYČ – ZLATO V RUKOU ZLODĚJE?“ a „Jezevec ukousl starostovi kalhoty (nepotvrzeno).“')],
        use: [k('Noviny nekupuju. Jsem v nich dost.')],
      },
      {
        id: 'lizatka',
        name: 'Lízátka',
        rect: [400, 70, 70, 60],
        look: [k('Sklenice s lízátky. Jedno chybí. Podezřívám paní Dvořáčkovou.')],
        use: [k('Ne. Nechci být detektiv s lízátkem. To je až v seriálech.')],
      },
      back('square', 'Ven na náměstí'),
    ],
  },

  /* ---------------------------------------------------------------- */
  urad: {
    id: 'urad',
    name: 'Obecní úřad',
    bg: 'urad',
    enter: [narr('Obecní úřad. Na stěně visí portrét prezidenta a vedle něj plíseň, která se mu podobá.')],
    hotspots: [
      {
        id: 'starosta',
        name: 'Starosta Pelikán',
        rect: [270, 100, 120, 190],
        look: [k('Starosta Pelikán. Hubený, hladce učesaný a zpocený, i když tu je chladno. To mi nepřijde dobré znamení.')],
        talk: [{ talk: 'starosta' }],
        use: [say('starosta', 'Neděláme tu žádné neformální kontakty. Napište žádost.')],
      },
      {
        id: 'upominky',
        name: 'Hromada upomínek',
        rect: [160, 200, 100, 50],
        look: [k('Upomínky. Voda, elektřina, plyn a „poslední upomínka před exekucí“ z roku 1997.')],
        use: [k('Cizí poštu nečtu. Ale zrovna tahle se neskrývá.')],
      },
      {
        id: 'model',
        name: 'Model města',
        rect: [40, 60, 170, 130],
        look: [k('Model Brdýmova budoucnosti. Zlatý bagr na zelené louce. Pod ním cedulka: „Zde bude cukrárna.“')],
        use: [k('Bagr si nevezmu. A kdybych ho vzal, tak mi řeknou, že je to modelářství.')],
      },
      back('square', 'Ven na náměstí'),
    ],
  },

  /* ---------------------------------------------------------------- */
  dvur: {
    id: 'dvur',
    name: 'Dvůr sběratele',
    bg: 'dvur',
    hotspots: [
      {
        id: 'pes',
        name: 'Hlídací pes',
        rect: [70, 220, 130, 110],
        look: [
          {
            when: flag('pes_ok'),
            then: [k('Pes spokojeně žvýká řízek a mrská ocasem. Nejlepší kamarád, jakého jsem za dnešek získal.')],
            else: [k('Hlídací pes. Zuby jako truhlář. Ale oči… dobrý kluk, kdyby měl důvod.')],
          },
        ],
        talk: [k('Pse, pojď sem. Ne. Ne, nepojď sem.')],
        use: [{ when: flag('pes_ok'), then: [k('Pohladím ho. Nechá se. Řízek umí dělat divy.')], else: [k('Radši ne. Mám jen dvě ruce a obě potřebuju.')] }],
        item: {
          rizek: [
            k('Hodný pejsek. Podívej, co tu mám. Řízek z okresního auta, jen trochu… vyzrálý.'),
            { take: 'rizek' },
            { set: 'pes_ok' },
            narr('Pes se vrhne na řízek a od té chvíle je Patrik jeho nejlepší kamarád. Nebo aspoň dodavatel řízků.'),
          ],
        },
      },
      {
        id: 'dvere',
        name: 'Domek sběratele',
        rect: [400, 130, 100, 170],
        go: 'sbirka',
        gate: {
          ok: flag('pes_ok'),
          fail: [k('Pes po mně vyjel hned, jak jsem udělal krok. Bez nějakého důvodu se k domu nedostanu.')],
        },
      },
      {
        id: 'schranka',
        name: 'Poštovní schránka',
        rect: [560, 190, 50, 80],
        look: [k('„NEVHAZOVAT REKLAMU. NEVHAZOVAT NIC.“ Ve schránce sedí pavouk.')],
        use: [k('Pavouk se tváří, že je úřední. Nechám ho být.')],
      },
      {
        id: 'hromada',
        name: 'Hromada železa',
        rect: [230, 210, 140, 100],
        look: [k('Hromada rezavého železa. Uprostřed zahradní trpaslík s přivařenou čepicí.')],
        use: [k('Nic z toho nepotřebuju. Kromě trpaslíka. Ne, ani toho.')],
      },
      back('square', 'Zpátky do města', [0, 140, 50, 200]),
    ],
  },

  /* ---------------------------------------------------------------- */
  sbirka: {
    id: 'sbirka',
    name: 'Sbírka',
    bg: 'sbirka',
    enter: [
      narr('Dům sběratele. Všude jsou kliky, klíče a zámky. Člověk má pocit, že vstoupil do zlodějova snu.'),
      say('sberatel', 'Policie! Vy jste první živá duše, co nepřišla jen pro klíč od kůlny!'),
    ],
    hotspots: [
      {
        id: 'sberatel',
        name: 'Ctibor Kocour',
        rect: [270, 90, 120, 230],
        look: [k('Ctibor Kocour. Vysoký, hubený a rozcuchaný. Drží klíku, jako by to bylo miminko.')],
        talk: [{ talk: 'ctibor' }],
        use: [say('sberatel', 'Opatrně! To je třistadvanáctka. Ruce pryč.')],
      },
      {
        id: 'klicky',
        name: 'Sbírka dveřních klik',
        rect: [40, 50, 210, 190],
        look: [k('Vitríny plné klik, klíčů a podkov. Popisky: „klika 1923“, „klika, kterou držel jakýsi pan Novák“.')],
        use: [say('sberatel', 'Nesahat! Každá z nich má svůj příběh. A některé i vlastní jméno.')],
      },
      {
        id: 'stul',
        name: 'Pracovní stůl',
        rect: [440, 190, 120, 80],
        look: [k('Stůl plný dopisů, lupy a razítek. Na jednom papíru je hlavička obce.')],
        use: [
          {
            when: flag('odpoved_ziskana'),
            then: [k('Dopis od starosty už mám.')],
            else: [k('Cizí poštu číst nebudu. Zeptám se raději majitele.')],
          },
        ],
      },
      back('dvur', 'Ven na dvůr'),
    ],
  },

  /* ---------------------------------------------------------------- */
  zbrojnice: {
    id: 'zbrojnice',
    name: 'Zbrojnice',
    bg: (g) => (g.flag('rohlik_nalezen') ? 'zbrojnice2' : 'zbrojnice'),
    enter: [narr('Hasičská zbrojnice. Voní olejem, hadicemi a dobrovolným hasičstvím.')],
    hotspots: [
      {
        id: 'plachta',
        name: 'Zakrytý předmět',
        rect: [60, 70, 300, 190],
        look: [
          {
            when: flag('poklop_otevren'),
            then: [k('Čtyřmetrový železný rohlík. Poklopec na spodku je otevřený. Poklad je teď v mé kapse.')],
            else: [
              {
                when: flag('pepa_priznal'),
                then: [k('Železný rohlík. Na spodku malý poklopec s nýty. Že by tam byl poklad?')],
                else: [
                  {
                    when: flag('rohlik_nalezen'),
                    then: [k('Rohlík.')],
                    else: [k('Pod zelenou plachtou je cosi velkého, zakřiveného a železného. Moc se to nepodobá hadici.')],
                  },
                ],
              },
            ],
          },
        ],
        use: [
          {
            when: noflag('rohlik_nalezen'),
            then: reveal,
            else: [
              {
                when: noflag('poklop_otevren'),
                then: [k('Poklopec je zavřený nýty. Něco malého a plochého by se mi hodilo.')],
                else: finale,
              },
            ],
          },
        ],
        item: {
          prukaz: [
            {
              when: flag('pepa_priznal'),
              then: [{ when: noflag('poklop_otevren'), then: [{ set: 'poklop_otevren' }, ...capsule], else: [k('Poklopec už je otevřený.')] }],
              else: [k('Nejdřív bych měl vědět, co to vlastně je.')],
            },
          ],
        },
      },
      {
        id: 'auto',
        name: 'Hasičská Tatra',
        rect: [400, 130, 200, 170],
        look: [k('Hasičská Tatra z roku 1974. Na žebříku zbytky železného prachu a na nárazníku otisk velkého oblouku. Tak tohle bych si zapamatoval.')],
        use: [k('Ať ji nechám stát. Já jsem policista, ne hasič, a nemám ani papíry na tak velké auto.')],
      },
      {
        id: 'hadice',
        name: 'Hadice a helmy',
        rect: [20, 235, 110, 70],
        look: [k('Srolované hadice, vědra a helmy na stojanu. Nic, co by mělo být tajné. Nebo je to dobře schované.')],
        use: [k('Hadice mi nic nenapoví. Ale v zimě by se mi hodila.')],
      },
      back('square', 'Ven na náměstí'),
    ],
  },
};

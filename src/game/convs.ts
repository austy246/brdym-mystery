import type { Conversation } from '../types';
import { k, pepa, sta, loj, pani, ctib, say, flag, noflag, has, allOf } from './dsl';

export const convs: Record<string, Conversation> = {
  pepa: {
    topics: [
      {
        label: 'Kdo tu vlastně bydlí?',
        once: true,
        steps: [
          pepa('Hospodský Lojza a jeho štamgasti. Ti vědí všechno, hlavně o sobě.'),
          pepa('Paní Dvořáčková z trafiky. Drby k ní chodí dřív než noviny.'),
          pepa('Starosta Pelikán na úřadě. A pak pan Kocour, sběratel. Podivín. Pes mu ukousl kus kalhot, a to jsem mu jen nesl poštu.'),
          k('Poznamenám si to.'),
          pepa('Hlavně si poznamenejte, že máme výbornou kapelu. Jenže je v ní jen bubeník.'),
          { set: 'zna_mesto' },
        ],
      },
      {
        label: 'Co se stalo s rohlíkem?',
        once: true,
        steps: [
          pepa('Ve čtvrtek večer ještě stál. V pátek ráno nic. Ani šroub. Já spal jako dudek, celou noc, bez přerušení.'),
          k('Na noc jsem se vás neptal.'),
          pepa('No jen aby to bylo jasné! Jsem poctivý člověk, poštu roznáším i v neděli.'),
        ],
      },
      {
        label: 'Je v tom rohlíku opravdu zlato?',
        once: true,
        steps: [
          pepa('Říká se. Za socialismu nechal pekař Brdýmovský postavit železný rohlík a prý je v něm poklad.'),
          pepa('Nikdo to ale nikdy nepotvrdil, protože nikdo nemá pilu na čtyři metry železa.'),
          k('Teď asi někdo má.'),
        ],
      },
      {
        label: 'Co je támhle za budova s vraty?',
        once: true,
        steps: [
          pepa('To je zbrojnice. Samé hadice, helmy a tma. Nic zajímavého, věřte mi.'),
          k('Vy jste tam velitel, že?'),
          pepa('Dobrovolný! Hlavně dobrovolný. Nikdo mi neplatí a já se stejně nesu.'),
        ],
      },
      {
        label: 'Nevím, kudy dál.',
        steps: [
          {
            when: noflag('svedci'),
            then: [
              pepa('Zkuste hospodu. Štamgasti viděli v noci všechno. Škoda, že jsou po ránu jako pytel brambor.'),
              pepa('Nějaká černá káva z trafiky by je probrala. Automat bere dvacku.'),
            ],
            else: [
              {
                when: noflag('odpoved_ziskana'),
                then: [
                  pepa('Pan Kocour bydlí za městem. Má psa, který miluje jedinou věc: smradlavé maso.'),
                  pepa('Taky prý sbírá všechno železné. A rád o tom mluví.'),
                ],
                else: [
                  {
                    when: noflag('starosta_volal'),
                    then: [
                      pepa('Paní Dvořáčková něco ví, ale drby dává jen za drby. Musíte jí nějaký přinést.'),
                    ],
                    else: [
                      {
                        when: noflag('starosta_priznal'),
                        then: [pepa('Myslím, že už máte všechno. Zajděte za starostou. Já budu támhle, kdyby něco.')],
                        else: [
                          pepa('Tak jo. Starosta vám dal klíč, že? Ke zbrojnici? No… uvidíme.'),
                          pepa('Hlavně aby tam nebyly myši.'),
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  lojza: {
    topics: [
      {
        label: 'Viděl jste v noci něco podezřelého?',
        once: true,
        steps: [
          loj('V noci spím. Nad hospodou. Jako zabitý.'),
          loj('Zavřel jsem v deset, protože v deset už je všem jedno, kdo platí.'),
        ],
      },
      {
        label: 'Dám si pivo.',
        steps: [
          loj('Pivo je za devět.'),
          k('Ve službě nepiju.'),
          loj('To je škoda. Jste první, kdo tu nepije. Na chvíli jsem si myslel, že jste inspekce.'),
        ],
      },
      {
        label: 'Dluží vám starosta?',
        once: true,
        steps: [
          loj('Dva roky. Prý mi to proplatí, až bude rozpočet.'),
          loj('Jenže rozpočet je tu jako yetti. Všichni o něm slyšeli, nikdo ho neviděl.'),
        ],
      },
    ],
  },

  pani: {
    topics: [
      {
        label: 'Co se v Brdýmově povídá?',
        once: true,
        steps: [
          pani('Ale pane, co by se povídalo! Lojzovi se hroutí hospoda, starosta nespí a v pátek se u pošty smál jeden holub.'),
          pani('A já bych vám řekla víc, jenže já dávám jen něco za něco. Vy mi řeknete něco, co jsem ještě neslyšela, a já vám řeknu, co vím.'),
          { set: 'pani_chce_drb' },
        ],
      },
      {
        label: 'Slyšel jsem, že pan Kocour má čtyři sta dveřních klik.',
        once: true,
        if: flag('drb'),
        steps: [
          pani('Čtyři sta?! A manželka od něj odešla kvůli dvanácti! To je skandál! Počkejte, ale vy jste byl poctivý, tak já taky.'),
          pani('V pátek večer starosta telefonoval do Kovošrotu. Slyšela jsem to přes zeď, mýt okna se musí i večer. Ptal se, kolik dají za čtyři metry železa.'),
          k('Starosta prodal rohlík do šrotu?'),
          pani('Já nic neříkám. Já jen tady stojím a poslouchám.'),
          { set: 'starosta_volal' },
        ],
      },
      {
        label: 'Co říkáte na Pepu?',
        once: true,
        steps: [
          pani('Pepa je poklad! Roznáší poštu, učí děti, hasí požáry. A vždycky je u nich první, jako by je tušil.'),
          k('Skoro jako by je dělal.'),
          pani('No to už je přehnané, pane.'),
        ],
      },
    ],
  },

  starosta: {
    topics: [
      {
        label: 'Co víte o zmizelém rohlíku?',
        once: true,
        steps: [
          sta('Hrozná ztráta pro město. Vyšetřujte, ale prosím tiše. A hlavně nikde nezmiňujte žádné finance.'),
          k('Finance?'),
          sta('Ne. Nic. Já nic neřekl.'),
        ],
      },
      {
        label: 'Nemáte nějaký problém?',
        once: true,
        steps: [
          sta('Problémy? Já? Starosta nemá problémy. Starosta má priority.'),
          sta('(přisune si hromadu upomínek na druhou stranu stolu)'),
        ],
      },
      {
        label: 'Vím, že jste ho prodal do šrotu.',
        if: noflag('starosta_priznal'),
        steps: [
          {
            when: allOf(has('utrzek'), has('odpoved'), flag('starosta_volal'), flag('svedci')),
            then: [
              k('Pane starosto. Mám útržek z podstavce, dopis, co jste odepsal sběrateli, svědectví z trafiky a svědky z hospody. Prodal jste rohlík do šrotu.'),
              sta('…'),
              sta('No dobře. Prodal. Za dvanáct tisíc. Město nemá na vodu, na světlo ani na novou nálepku na ceduli u vjezdu.'),
              sta('Ale když pro něj v pět ráno přijeli, byl podstavec prázdný! Někdo mi ho ukradl dřív, než jsem ho stihl prodat!'),
              k('Svědci viděli velké auto s modrým majáčkem a žebříkem.'),
              sta('Hasičská Tatra. To je jediné, co v Brdýmově utáhne čtyři metry železa. Tady je klíč od zbrojnice.'),
              sta('A nikomu ani muk.'),
              k('Ani muk. Jen se to dozví polovina města od paní Dvořáčkové.'),
              sta('To je přesně můj problém.'),
              { give: 'klic' },
              { set: 'starosta_priznal' },
            ],
            else: [
              k('Slyšel jsem, že jste ho prodal do šrotu.'),
              sta('To je velmi vážné obvinění. A máte nějaký důkaz?'),
              k('Zatím ne.'),
              sta('Tak ať se mi to ani nezdá.'),
            ],
          },
        ],
      },
    ],
  },

  ctibor: {
    topics: [
      {
        label: 'Máte krásnou sbírku.',
        once: true,
        steps: [
          ctib('Že? Čtyři sta dveřních klik! A ke každé znám příběh. Tahle třistadvanáctka visela na kadeřnictví. Tahle zase u pána, co mi nikdy nezavolal.'),
          ctib('Manželka mi odešla kvůli dvanácti. Ale řekla, že jsem to s nimi přehnal už u tří.'),
          k('Čtyři sta kliček. To si zapamatuju.'),
          { set: 'drb' },
        ],
      },
      {
        label: 'Víte něco o rohlíku?',
        once: true,
        steps: [
          ctib('Rohlík! Chtěl jsem ho koupit! Nabídl jsem starostovi pět tisíc. To je polovina mých klíčů!'),
          ctib('Odpověděl mi dopisem. Tady, vezměte si to, mně se v něm vysmívá.'),
          { give: 'odpoved' },
          { set: 'odpoved_ziskana' },
          k('„Rohlík není na prodej. Již prodán.“ Prodal ho někomu jinému?'),
          ctib('To nevím. A pokud ano, tak ať ho nevyhazuje.'),
        ],
      },
      {
        label: 'Kde jste byl v noci?',
        once: true,
        steps: [
          ctib('Doma. U sbírky. Spím s ní ve stejné místnosti. Všichni mi to zazlívají.'),
          k('To zní… jako alibi.'),
        ],
      },
    ],
  },

  /** Drobné postavy s jednou větou. */
  starenka: {
    topics: [
      {
        label: 'Co jste viděla?',
        steps: [
          say('starenka', 'Já to viděla!'),
          k('Co jste viděla?'),
          say('starenka', 'To nevím. Ale viděla.'),
          k('To je velmi důležité svědectví.'),
          say('starenka', 'Taky myslím.'),
        ],
      },
    ],
  },
};

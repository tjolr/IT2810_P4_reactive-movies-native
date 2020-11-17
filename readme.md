## Webutvikling - Prosjekt 4

Vi har valgt alternativ A som er å lage en applikasjon i React Native. Vi bruker database og server som vi laget i prosjekt 3, og den kjører på VM.

# Velkommen til Movie Database

Movie Database gir deg muligheten til å søke gjennom en stor filmdatabase på rundt 4800 filmer utgitt fra 1916 til 2017. Du har mulighet til å filtrere søkeresultatet på årstall eller gjennomsnittlig poengscore filmene har fått av tidligere anmeldere, og du kan sortere søkeresultatet slik du vil. Om du vil vite mer om en film kan du trykke på den, få litt mer info, og til og med skrive en anmeldelse. Kanskje er du ikke så glad i å skrive anmeldelser, og da kan du nøye deg med å lese hva andre har skrevet om denne filmen.

# Installasjon

Enkel lokal installasjon med:

```terminal
> git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-58/reactive-movies-native.git
> cd reactive-movies-native
> npm install
```

Prosjektet er opprettet med `expo-cli`, og man trenger det for å kjøre prosjektet.
Dersom du ikke allerede har innstallert `expo-cli` kan det installeres ved

```terminal
> npm install expo-cli
```

Når `expo-cli` er installert kan du starte prosjektet ved å kjøre kommandoen

```terminal
> expo-start
```

# Dokumentasjon

Vi kom fort frem til at vi ville implementere søk i en film-database, og fant et passende [datasett på Kaggle](https://www.kaggle.com/tmdb/tmdb-movie-metadata).

Her kommer en diskusjon av de viktigste valgene rundt valg av teknologi og løsninger for prosjektet.

## Frontend

### React Native

Prosjektet bruker React Native med Typescript i frontend. Vi har bare brukt funksjonelle komponenter og med stor bruk av React Hooks. Vi har laget noen filer som ender på `.models.tsx` hvor interfaces og viktige konstanter er lagret for å kunne importeres i flere andre filer.

### Packages

#### React Native Elements

React Native Elements er et cross platform UI toolkit for React Native. Vi valgte å bruke React Native Elements fordi de hadde et stort utvalg av komponenter gode mulighetere for å tilpasse til ønsket design. Noen viktie komponenter vi har brukt:

- **SearchBar**: brukes for å la bruker skrive inn ønsket søketekst for filmer. Nyttige properties ved denne komponenten er `onChangeText` som vi bruker til å oppdatere state med søkeverdi, og `showLoading` som viser en subtil loading-spinner.
- **Button**: button komponenten har vi brukt flere steder i appen for å sikre kontinuitet i design. Vi brukte `disabled` propertien for å deaktivere knappen og endre farger. I likhet med SearchBar har Button en innebygget `loading` for å vise en spinner i knappen der det er passende. Button komponenten har og default fin style for å tone ned fargene når knappen er holdt inne, og det gir realistisk og god brukerinteraksjon.
- **Icon**: React Native Elements bruker React Native Vector Icons for å bruke ikoner. Icon komponenten har vi brukt inni de fleste knapper og brukertilbakemeldinger, men og som individuelle knapper ved å sette propertien `reverse` til true.
- **Text**: Vi har brukt tekst komponenten til React Native Elemnts i hele applikasjonen.

For å sette et globalt theme i appliasjonen har vi brukt `ThemeProvider` fra React Native Elements, og overskrevet deler av default theme-objektet for å lage vår egen styling på applikasjonen.

#### React Native Animated Spinkit

Bibliotek med animasjoner som vi har brukt for å gi tilbakemelding til bruker om at siden laster inn. Komponenter vi har brukt er `<Bounce>` og `<Swing>`.

#### React Native Extended Stylesheet

React Native sitt originale stylesheet har begrenset funksjonalitet, og derfor har vi noen steder brukt Extended Stylesheet for å kunne gjøre flere avanserte CSS operasjoner. Blant annet var det nødvendig å bruke Extended Stylesheet for å bruke pseudo-klassene `:nth-child-even` og `:nth-child-odd` for å sette ulik bakgrunnsfarge på like og odde filmresultat i filmlisten.

#### React Native Modal

React Native Modal har vi brukt for å vise filter og sorteringsmuligheter, og vise innfyllingsfelt når man legger til et nytt review. Propertien `onBackdropPress` har vi brukt for å lukke modal dersom bruker trykker utenfor modal. Brukeren kan og lukke modalen ved å swipe den ned, og det løste vi ved å bruke propertien `onSwipeComplete`.

#### Use Debounce

Vi brukte pakken Use Debounce for å hindre unødvendig mange requests til backend ved søk etter filmtittel. Når man skriver inn tekst i SearchBar komponenten, så vil det etter 200ms (0.2 sekunder) bli sendt request til backend for å søke etter gitte søketekst. Når man vil søke etter en film så er det naturlig at man vil skrive deler av filmtittelen, for å se om man finner filmen uten å måtte skrive hele tittelen. Vi synes derfor at 200ms var en fin debounce tid for å få skrevet nok før man søker, og heller ikke for lenge før et søk blir gjort.

#### React Native Fade

Bruker React Native Fade for å legge på en gradvis fade i Reviews.

### State management med Redux

Vi valgte å bruke Redux som state manager siden det er et veletablert rammeverk med god dokumentasjon. I hovedsak har vi brukt Redux for å håndtere query-variabler som brukes til GraphQL kallet. Dette viste seg å være en god løsning siden når f.eks man søker etter en film og endrer state for søkestreng, så ønsker man også å se de beste resultatene ved søket først. Det løste vi ved å dispatche en action fra en annen action.

For å vise loading animation i både searchbar og movieList mens man søker etter en filmtittel brukte vi en redux state for å sjekke om loading animation skulle vises. Komponentene er langt borte fra hverandre i komponenttreet, og det var derfor nyttig å bruke redux her.

Vi brukte `useSelector` hooken fra `react-redux` til å hente ut data fra store, og `useDispatch` hooken til å starte actions.

### Apollo GraphQL

Vi har brukt GraphQL for kommunikasjon med databasen, og valgte [Apollo](https://www.apollographql.com/docs/react/) som klient for GraphQL i frontend. En av de virkelig fine funksjonene til Apollo er funksjonen `InMemoryCache` som lagrer tidligere søk i cache. Når bruker velger å gå til neste side av et søkeresultat, og deretter tilbake til forrige side så vil Apollo i stedet for å hente ny data fra database, heller bare hente ut data fra cache. Dette sikrer god ytelse på siden og hindrer unødvendige kall til databasen.

I tillegg brukte vi `useQuery` og `useMutation` som er to Hooks for å gjøre GrahpQL queries (read) og mutations (create, update, delete). Disse returner blant annet loading og error variabler som man kan enkelt bruke for å gi visuell feedback til bruker om at siden laster inn ny data, eller om noe har gått galt.

## Backend

Vi har brukt samme backend som prosjekt 3, så dokumentasjon rundt backend kan leses om [her](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-58/reacting-movies):

## Testing

Vi har gjort manuell testing med ulike enheter og simulatorer for å sjekke forventet oppførsel.

Forventet oppførsel som har vært testet er:

- Når bruker skriver i søkefelt så vises loading-animasjon i søkefelt og i liste over resultatsettet. Dersom noen filmer matcher søket vises disse i listen, eller tilbakemelding til bruker om at ingen filmer matchet søket eller en feilmelding dersom GraphQL ikke klarte å hente data riktig.
- Ved trykk på filter-knappen åpner filter-modal seg fra bunnen av skjerm. Når man slipper en av multisliderne for Release year eller Rating så oppdateres resultatsettet med filter.
- Når man trykker en sorteringsknapp en gang skal den sortere lista i stigenede rekkefølge. Ved trykk på samme knapp andre gang skal den sortere lista i synkende rekkefølge. Ved trykk på samme knapp tredje gang skal den skru av sortering på den knappen.
- Når man trykker på en sorteringsknapp, og deretter på en annen sorteringsknapp skal den først valgte sorteringsknappen tilbakestilles til default sorteringstilstand (av/ "null"). Dette testes f.eks ved å trykke på sorteringsknappen Rating, og deretter Year, og så tilbake til Rating som nå skal vise sortering i stigende rekkefølge (viser ikonet pil oppover).
- Dersom man trykker utenfor modalen, eller swiper den nedover så lukkes modalen.
- Når en bruker trykker på "neste-side" knappen vises loading-animasjon og deretter resultatsett på side 2. Dersom bruker trykker på "forrige-side" knappen så vises resultatsettet fra side 1 øyeblikkelig for at GraphQL henter data fra cache i stedet for å gjøre et nytt kall for å hente data den tidligere i sesjonen har lest.
- Knapp for forrige side er deaktivert når man er på side 1. Knapp for neste side er deaktivert dersom man er på siste side av resultatsettet.
- Når man trykker inn på en film fra resultatsettet blir man vist flere detaljer om filmen på ny side.
- Under detaljer om siden vises reviews av filmen, og tilbakemelding om ingen reviews, eller feil ved innlasting dersom kall til database ikke var vellykket.
- Ved trykk på "Add Review" knappen vises en modal hvor man kan skrive inn navn på forfatter og tekst for anmeldelse. Når forfatter og tekst er skrevet inn skal "Submit" knappen gå fra å være deaktivert til aktivert. Når bruker trykker på "Submit" så blir knappen deaktivert og en loading spinner vises i knappen. Dersom lagring av anmeldelse var vellykket vises en tilbakemelding til bruker om dette i 0.8 sekunder før modalen lukkes og anmeldelsen viser øverst blant alle anmeldelser. Dersom lagring av anmeldelse var mislykket vises en tilbakemelding om dette til bruker, og modalen lukkes ikke.

For å sjekke at alt funksjonalitet som beskrevet over virker på ulike operativsystemer har vi testet på flere ulike enheter.

**iOS:**

- iPhone SE (Xcode iOS simulator). Dette er den minste skjermstørrelsen blant iPhonene, og det er derfor viktig å sjekke om alt skalerer riktig og for plass til å vise alt her.
- iPhone 7 (Fysisk enhet, testet med Expo-appen).
- iPhone 12 Pro Max (Xcode iOS simulator). Dette er den største skjermstørrelsen blant iPhonene, og derfor også viktig å sjekke skalering.
- iPad Pro 12.9" (Xcode iOS simulator). Dette er et nettbrett som vi ikke har optimalisert skalering for, så her kunne det vært forbedringer.

**Android:**

- Huawei Mate 10 Pro (Fysisk enhet, testet med Expo-appen)

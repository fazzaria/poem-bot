const makeQuote = (quote: string, author: string, work?: string) => {
  return `${quote}\n\n- ${author}, "${work}"`;
};

/* const quantumPoemLines = [
  "In the ancient glade\n",
  "Across old bark\n",
  "The quiet shade\n",
  `It's always dark\n'`,
];

const getQuantumPoem = () =>
  makeQuote(
    quantumPoemLines[Math.floor(Math.random() * quantumPoemLines.length)],
    "Gabbo"
  ); */

const reMonarching = makeQuote(
  `Butterflies overwinter
in the milkweed
along storm drains.`,
  "Christian Gullette",
  "Re-Monarching"
);

const winterRainDeepens = makeQuote(
  `Winter rain deepens
lichened letters on the grave
and my old sadness`,
  "Roka"
);

const bermanSnow = makeQuote(
  `When it's snowing, the outdoors seem like a room.\n
Today I traded hellos with my neighbor.
Our voices hung close in the new acoustics.
A room with the walls blasted to shreds and falling.`,
  "David Berman",
  "Snow"
);

const stillLife = makeQuote(
  `He still found breath, and yet
It was an obscure knack.`,
  "Thom Gunn",
  "Still Life"
);

const landlady = makeQuote(
  `and when I dream images
of daring escapes through the snow
I find myself walking
always over a vast face
which is the land-
lady's, and wake up shouting.`,
  "Margaret Atwood",
  "The Landlady"
);

const suicideNote = makeQuote(
  `The calm,
Cool face of the river
Asked me for a kiss.`,
  "Langston Hughes",
  "Suicide Note"
);

const capybaraHotsprings1 = makeQuote(
  `There exists nothing human that can scratch even the lowest sky`,
  "Yaxkin Melchy Ramos",
  "The Capybara Hot Springs"
);

const howl1 = makeQuote(
  `angelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night`,
  "Allen Ginsberg",
  "Howl"
);

const eggTooth = makeQuote(
  `Ears are the eyes on the sides of your head.
Memory lives here, between these apostrophes.
As if to predict music, the ear contains a drum.`,
  "Benjamin Garcia",
  "Egg Tooth"
);

const keepingThingsWhole = makeQuote(
  `In a field
I am the absence
of field.`,
  "Mark Strand",
  "Keeping Things Whole"
);

const somberBull = makeQuote(
  `I welcome terror, that somber bull,
I fight for your name held in his jaws.`,
  "Andrea Cote",
  "Somber Bull"
);

const theRoom = makeQuote(
  `The house turns slowly round its one closed room.`,
  "Kevin Hart",
  "The Room"
);

const illWin = makeQuote(
  `I'll win the way
I always do
by being gone
when they come.`,
  "Robert Creely",
  `I'll Win`
);

const kingfishers1 = makeQuote(
  `As kingfishers catch fire, dragonflies draw flame`,
  "Gerard Manley Hopkins",
  "As Kingfishers Catch Fire"
);

const frenchNovel = makeQuote(
  `With boots we trekked through slush for a bottle of red wine\
we weren't allowed to buy, our shirts unbuttoned
under our winter coats.`,
  "Richie Hofmann",
  "French Novel"
);

const iHaveSlept = makeQuote(
  `[...]on an amber throne of cockroach casings, on a carpet of needles from a cemetery pine[...]`,
  "Diane Seuss",
  "I have slept in many places, for years on mattresses that entered"
);

const toMakeAPrarie = makeQuote(
  `To make a prairie it takes a clover and one bee,
One clover, and a bee.
And revery.
The revery alone will do,
If bees are few.`,
  "Emily Dickinson",
  "To make a prairie"
);

const blackbird1 = makeQuote(
  `I was of three minds,
Like a tree
In which there are three blackbirds.`,
  "Wallace Stevens",
  "Thirteen Ways of Looking at a Blackbird"
);

const emergency1 = makeQuote(
  `Hasn't the goal all along been
to make an unforgettable sound?`,
  "Dobby Gibson",
  "This Is a Test of the Federal Emergency Management Agency Wireless Warning System"
);

const stationOfMetro = makeQuote(
  `The apparition of these faces in the crowd;
Petals on a wet, black bough.`,
  "Ezra Pound",
  "In a Station of the Metro"
);

export const inspoRepo = [
  reMonarching,
  winterRainDeepens,
  bermanSnow,
  stillLife,
  landlady,
  suicideNote,
  capybaraHotsprings1,
  howl1,
  eggTooth,
  keepingThingsWhole,
  somberBull,
  theRoom,
  illWin,
  kingfishers1,
  frenchNovel,
  iHaveSlept,
  toMakeAPrarie,
  blackbird1,
  emergency1,
  stationOfMetro,
];

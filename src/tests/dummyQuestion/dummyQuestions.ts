import type {
  ABCansewers,
  BasicQuestion,
  SpecializedQuestion,
} from "../../types/globalTypes";

export const basic = {
  id: 6301,
  content:
    "Czy postąpisz właściwie umieszczając ostrzegawczy trójkąt odblaskowy w odległości 30-50 m za pojazdem, który uległ awarii na drodze ekspresowej?",
  correctAnsewer: false,
  media: "question.jpg",
  type: "basic",
  value: 1,
} satisfies BasicQuestion;

export const anseweredBasic = { ...basic, chosenAnsewer: true };

export const basicWithVideo = {
  ...anseweredBasic,
  id: 6245,
  media: "question.mp4",
};

export const specialized = {
  id: 10060,
  content:
    "Poruszasz się autostradą i zamierzasz ją opuścić. W którym miejscu rozpoczniesz hamowanie przed zjazdem z autostrady?",
  correctAnsewer: "B",
  media: "question.jpg",
  type: "specialized",
  value: 3,
  ansewers: {
    A: "Przed wjazdem na pas wyłączenia (zjazdu).",
    B: "Po wjeździe na początek pasa wyłączenia (zjazdu). Po wjeździe na początek pasa wyłączenia (zjazdu) Po wjeździe na początek pasa wyłączenia (zjazdu)",
    C: "W dowolnym miejscu na autostradzie.",
  },
} satisfies SpecializedQuestion;

export const anseweredSpecialized = {
  ...specialized,
  chosenAnsewer: "A" as const,
};

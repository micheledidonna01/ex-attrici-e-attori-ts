



type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person &
{
  most_famous_movies: [string, string, string],
  awards: string,
  nationality:
  | "American"
  | "British"
  | "Australian"
  | "Israeli - American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const result: unknown = await response.json();

    if (!response.ok) {
      throw new Error("Problemi con il server");
    }

    if (!isActress(result)) {
      throw new Error("errore");
    }
    console.log(result);
    return result


  } catch (errore) {
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return null;
  }
}


function isActress(result: unknown): result is Actress {
  if (
    typeof result === "object" &&
    result !== null &&
    "id" in result &&
    typeof result.id === "number" &&
    "name" in result &&
    typeof result.name === "string" &&
    "birth_year" in result &&
    typeof result.birth_year === "number" &&
    (!("death_year" in result) || typeof (result as any).death_year === "number") &&
    "biography" in result &&
    typeof result.biography === "string" &&
    "image" in result &&
    typeof result.image === "string" &&
    "most_famous_movies" in result &&
    Array.isArray(result.most_famous_movies) &&
    result.most_famous_movies.length === 3 &&
    result.most_famous_movies.every(m => typeof m === 'string') &&
    "awards" in result &&
    typeof result.awards === "string" &&
    "nationality" in result &&
    typeof result.nationality === "string"
  ) {
    return true;
  }

  return false;
}


async function getAllActresses(): Promise<Actress[]> {
  try {

    const response = await fetch(`http://localhost:3333/actresses`);
    if (!response.ok) {
      throw new Error("Problemi con il server" + response.status + response.statusText);
    }

    const obj: unknown = await response.json();

    if (!(obj instanceof Array)) {
      throw new Error("Formato dati non valido")
    }

    const objValid = obj.filter(isActress)
    console.log(obj);
    return objValid;


  } catch (errore) {
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return [];
  }
}

getAllActresses();



(async () => {

  const ids: number[] = [1, 2, 3, 4, 5];
  const promises: Promise<Actress | null>[] = [];

  ids.forEach((id) => {
    const res: Promise<Actress | null> = getActress(id)
    promises.push(res)
  })

  const allResult: unknown = await Promise.all(promises);
  console.log("Risultati: ", allResult);

})();


//CORREZIONE
// async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
//   try{
//     const promises = ids.map(id => getActress(id))
//     const actresses = await Promise.all(promises);
//     return actresses;
//   }catch(errore){
//     if (errore instanceof Error) {
//       console.error(errore.message);
//     } else {
//       console.error('Erorre sconosciuto', errore);
//     }
//     return [];
//   }
// }

// getActresses([1,2,3,4])



function generaID(): number {
  return Math.floor(Math.random() * (100 - 40)) + 41;
}


function createActress(dati: Omit<Actress, "id">): Actress {
  return {
    id: generaID(),
    ...dati
  }
}


// function updateActress(actress: Actress, updates: Partial<Actress>): Actress{
//   return{
//     ...actress,
//     ...updates,
//     id: actress.id,
//     name: actress.name
//   }
// }

//SOLUZIONE ALTERNATIVA
function updateActress(actress: Actress, updates: Partial<Omit<Actress, "id" | "name">>): Actress {
  return {
    ...actress,
    ...updates,
  }
}

type Actor = Person &
{
  known_for: [string, string, string]
  awards: [string, string?] | [string]
  nationality:
  | "American"
  | "British"
  | "Australian"
  | "Israeli - American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"
  | "Scottish"
  | "New Zealand"
  | "Hong Kong"
  | "German"
  | "Canadian"
  | "Irish"

}


function isActor(dati: unknown): dati is Actor {
  if (
    typeof dati === "object" &&
    dati !== null &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    (!("death_year" in dati) || typeof (dati as any).death_year === "number") &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "known_for" in dati &&
    Array.isArray(dati.known_for) &&
    dati.known_for.length === 3 &&
    dati.known_for.every((m: unknown) => typeof m === "string") &&
    "awards" in dati &&
    Array.isArray(dati.awards) && dati.awards.length > 0 && dati.awards.length <= 2 &&
    dati.awards.every((a: unknown) => typeof a === "string") &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  ) {
    return true;
  }
  return false;
}

async function getActor(id: number): Promise<Actor | null> {

  try {
    const promise = await fetch(`http://localhost:3333/actors/${id}`);

    if (!promise.ok) {
      throw new Error(promise.status + promise.statusText);
    }

    const obj:unknown = await promise.json();

    if (!isActor(obj)) {
      throw new Error('Errore dal controllo dell\'oggetto');
    }
    console.log("Actor", obj)
    return obj;

  } catch (errore) {
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return null;
  }
}

getActor(2);


async function getActorAll(): Promise<Actor[]> {

  try {
    const promise = await fetch(`http://localhost:3333/actors`);

    if (!promise.ok) {
      throw new Error(promise.status + promise.statusText);
    }

    const arrObj: unknown = await promise.json();
    console.log(arrObj)

    if (!(arrObj instanceof Array)) {
      throw new Error('Formato dati non valido');
    }


    const arrObjValid: Actor[] = arrObj.filter(isActor);
    console.log(isActor(arrObj[0]));
    console.log("Attori: ", arrObjValid);
    return arrObjValid;

  } catch (errore) {
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return [];
  }
}

getActorAll();


async function getActors(ids: number[]): Promise<(Actor | null)[]>{

  try{
    const promise = ids.map(id => getActor(id));
    const array = await Promise.all(promise);

    console.log(array);
    return array;

  }catch(errore){
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return [];
  }
}

getActors([1,2,3,4])



function createActor(dati: Omit<Actor, "id">): Actor{
  return{
    id:generaID(),
    ...dati
  }
}

function updateActor(actor: Actor, updates: Partial<Omit<Actor, "id" | "name">>): Actor{
  return{
    ...actor,
    ...updates
  }
}


